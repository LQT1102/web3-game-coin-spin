// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimplifiedEvenOddGame {
    address public owner;
    uint256 public feePercent = 5; // feePercent toàn cục
    uint256 public ownerBalance;

    enum GameStatus { Waiting, Finished, Canceled }

    struct Game {
        address player1;
        address player2;
        uint256 betAmount;
        GameStatus status;
        bool player1Choice; // true: Chẵn, false: Lẻ
        address winner;
        bool claimed;
        uint256 feePercentAtCreateTime; // Lưu trữ feePercent tại thời điểm tạo game
    }

    // Thay thế mảng bằng mapping
    mapping(uint256 => Game) public games;
    uint256 public nextGameId = 1;

    // Dùng mapping để lưu gameId của những phòng đang chờ
    mapping(uint256 => bool) public waitingGames;
    uint256[] public waitingGameIds;

    event GameCreated(uint256 indexed gameId, address indexed player1, uint256 betAmount, bool player1Choice, uint256 feePercent);
    event GameJoined(uint256 indexed gameId, address indexed player2);
    event GameFinished(uint256 indexed gameId, address indexed winner, uint256 winningAmount);
    event GameCanceled(uint256 indexed gameId, address indexed player1);
    event Claimed(uint256 indexed gameId, address indexed winner, uint256 amount);
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
            winner: address(0),
            claimed: false,
            feePercentAtCreateTime: feePercent // Lấy feePercent tại thời điểm tạo game
        });

        waitingGames[gameId] = true;
        waitingGameIds.push(gameId);

        emit GameCreated(gameId, msg.sender, msg.value, _choice, feePercent);
    }

    function joinGame(uint256 _gameId) external payable {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Waiting, "Game is not waiting");
        require(msg.value == game.betAmount, "Bet amount must match");
        require(game.player2 == address(0), "Game is already full");

        game.player2 = msg.sender;
        game.status = GameStatus.Finished;

        // Xóa game khỏi danh sách chờ
        removeFromWaitingGames(_gameId);

        // Xác định người chiến thắng
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % 2;
        bool winnerIsEven = (randomNumber == 0);

        game.winner = (winnerIsEven == game.player1Choice) ? game.player1 : game.player2;

        // Sử dụng feePercentAtCreateTime để tính toán
        uint256 fee = (game.betAmount * game.feePercentAtCreateTime) / 100;
        ownerBalance += fee;

        // Tính toán số tiền thắng
        uint256 winningAmount = game.betAmount + (game.betAmount - fee);

        emit GameJoined(_gameId, msg.sender);
        emit GameFinished(_gameId, game.winner, winningAmount);
    }

    function cancelGame(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(msg.sender == game.player1, "Only player1 can cancel");
        require(game.status == GameStatus.Waiting, "Game cannot be canceled");

        game.status = GameStatus.Canceled;

        // Xóa game khỏi danh sách chờ
        removeFromWaitingGames(_gameId);

        payable(game.player1).transfer(game.betAmount);
        emit GameCanceled(_gameId, msg.sender);
    }

    function claimReward(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.Finished, "Game is not finished");
        require(game.winner != address(0), "Winner not determined");
        require(msg.sender == game.winner, "Not the winner");
        require(!game.claimed, "Reward already claimed");

        game.claimed = true;
        // Tính toán tiền thưởng dựa trên feePercentAtCreateTime
        uint256 winningAmount = (game.betAmount * (100 - game.feePercentAtCreateTime)) / 100;

        payable(game.winner).transfer(game.betAmount + winningAmount);

        emit Claimed(_gameId, game.winner, game.betAmount + winningAmount);
    }

    function removeFromWaitingGames(uint256 _gameId) private {
        for (uint i = 0; i < waitingGameIds.length; i++) {
            if (waitingGameIds[i] == _gameId) {
                waitingGameIds[i] = waitingGameIds[waitingGameIds.length - 1];
                waitingGameIds.pop();
                break;
            }
        }
        waitingGames[_gameId] = false;
    }

    function getWaitingGames() external view returns (uint256[] memory) {
        return waitingGameIds;
    }

    function getFeePercent() public view returns (uint256) {
        return feePercent;
    }

    function setFeePercent(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= 100, "Fee percent cannot exceed 100");
        feePercent = _newFeePercent;
        emit FeePercentChanged(feePercent);
    }

    function withdrawOwnerBalance() external onlyOwner {
        uint256 amount = ownerBalance;
        ownerBalance = 0;
        payable(owner).transfer(amount);
    }
}