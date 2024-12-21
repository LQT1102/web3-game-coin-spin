// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimplifiedEvenOddGame {
    address public owner;
    uint256 public feePercent = 5; // feePercent toàn cục
    uint256 public ownerBalance;

    bool private _reentrant = false;

    modifier nonReentrant() {
        require(!_reentrant, "ReentrancyGuard: reentrant call");
        _reentrant = true;
        _;
        _reentrant = false;
    }

    enum GameStatus {
        Waiting,
        Finished,
        Canceled
    }

    struct Game {
        address player1;
        address player2;
        uint256 betAmount;
        GameStatus status;
        bool player1Choice; // true: Chẵn, false: Lẻ
        bool isWinnerPlayer1; // true: player1 thắng, false: player2 thắng
        bool claimed;
        uint256 feePercentAtCreateTime; // Lưu trữ feePercent tại thời điểm tạo game
    }

    // Thay thế mảng bằng mapping
    mapping(uint256 => Game) public games;
    uint256 public nextGameId = 1;

    // Dùng mapping để lưu gameId của những phòng đang chờ
    mapping(uint256 => bool) public waitingGames;
    uint256[] public waitingGameIds;

    event GameCreated(
        uint256 indexed gameId,
        address indexed player1,
        uint256 betAmount,
        bool player1Choice,
        uint256 feePercent
    );
    event GameJoined(uint256 indexed gameId, address indexed player2);
    event GameFinished(
        uint256 indexed gameId,
        address indexed winner,
        uint256 winningAmount
    );
    event GameCanceled(uint256 indexed gameId, address indexed player1);
    event Claimed(
        uint256 indexed gameId,
        address indexed winner,
        uint256 amount
    );
    event FeePercentChanged(uint256 newFeePercent);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createGame(bool _choice) external payable {
        require(msg.value > 0, "Bet amount must be greater than 0");

        uint256 gameId = nextGameId;
        nextGameId++;

        games[gameId] = Game({
            player1: msg.sender,
            player2: address(0),
            betAmount: msg.value,
            status: GameStatus.Waiting,
            player1Choice: _choice,
            isWinnerPlayer1: false,
            claimed: false,
            feePercentAtCreateTime: feePercent // Lấy feePercent tại thời điểm tạo game
        });

        waitingGames[gameId] = true;
        waitingGameIds.push(gameId);

        emit GameCreated(gameId, msg.sender, msg.value, _choice, feePercent);
    }

    function joinGame(uint256 _gameId) external payable nonReentrant {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Waiting, "Game is not waiting");
        require(msg.value == game.betAmount, "Bet amount must match");
        require(game.player2 == address(0), "Game is already full");
        require(msg.sender != game.player1, "Player 1 cannot join their own game");

        game.player2 = msg.sender;
        game.status = GameStatus.Finished;

        // Xác định người chiến thắng
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
        ) % 2;
        bool winnerIsEven = (randomNumber == 0);

        game.isWinnerPlayer1 = winnerIsEven == game.player1Choice;

        // Sử dụng feePercentAtCreateTime để tính toán
        uint256 fee = (game.betAmount * game.feePercentAtCreateTime) / 100;
        ownerBalance += fee;

        // Tính toán số tiền thắng
        uint256 winningAmount = game.betAmount + (game.betAmount - fee);

        // Xóa game khỏi danh sách chờ
        for (uint i = 0; i < waitingGameIds.length; i++) {
            if (waitingGameIds[i] == _gameId) {
                waitingGameIds[i] = waitingGameIds[waitingGameIds.length - 1];
                waitingGameIds.pop();
                break;
            }
            unchecked {
                i++;
            }
        }
        waitingGames[_gameId] = false;

        emit GameJoined(_gameId, msg.sender);
        emit GameFinished(_gameId, game.isWinnerPlayer1 ? game.player1 : game.player2, winningAmount);
    }

    function cancelGame(uint256 _gameId) external nonReentrant {
        Game storage game = games[_gameId];
        require(msg.sender == game.player1, "Only player1 can cancel");
        require(game.status == GameStatus.Waiting, "Game cannot be canceled");

        game.status = GameStatus.Canceled;

        // Xóa game khỏi danh sách chờ
        for (uint i = 0; i < waitingGameIds.length; i++) {
            if (waitingGameIds[i] == _gameId) {
                waitingGameIds[i] = waitingGameIds[waitingGameIds.length - 1];
                waitingGameIds.pop();
                break;
            }
            unchecked {
                i++;
            }
        }
        waitingGames[_gameId] = false;

        payable(game.player1).transfer(game.betAmount);
        emit GameCanceled(_gameId, msg.sender);
    }

    function claimReward(uint256 _gameId) external nonReentrant {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Finished, "Game is not finished");
        require(!game.claimed, "Reward already claimed");
        require((game.isWinnerPlayer1 && msg.sender == game.player1) || (!game.isWinnerPlayer1 && msg.sender == game.player2), "Not the winner");

        game.claimed = true;
        // Tính toán tiền thưởng dựa trên feePercentAtCreateTime
        uint256 winningAmount = (game.betAmount * (100 - game.feePercentAtCreateTime)) / 100;

        payable(msg.sender).transfer(game.betAmount + winningAmount);

        emit Claimed(_gameId, msg.sender, game.betAmount + winningAmount);
    }

    function getWaitingGames() external view returns (uint256[] memory) {
        return waitingGameIds;
    }

    function setFeePercent(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= 100, "Fee percent cannot exceed 100");
        feePercent = _newFeePercent;
        emit FeePercentChanged(feePercent);
    }

    function withdrawOwnerBalance() external onlyOwner nonReentrant {
        uint256 amount = ownerBalance;
        ownerBalance = 0;
        payable(owner).transfer(amount);
    }

    function getGameById(uint256 _gameId) public view returns (Game memory) {
        require(games[_gameId].betAmount > 0, "Game does not exist");
        return games[_gameId];
    }
}