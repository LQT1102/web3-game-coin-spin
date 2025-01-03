/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace CoinTossGame {
  export type GameStruct = {
    gameId: BigNumberish;
    player1: AddressLike;
    player2: AddressLike;
    betAmount: BigNumberish;
    status: BigNumberish;
    player1Choice: boolean;
    isWinnerPlayer1: boolean;
    claimed: boolean;
    feePercentAtCreateTime: BigNumberish;
  };

  export type GameStructOutput = [
    gameId: bigint,
    player1: string,
    player2: string,
    betAmount: bigint,
    status: bigint,
    player1Choice: boolean,
    isWinnerPlayer1: boolean,
    claimed: boolean,
    feePercentAtCreateTime: bigint
  ] & {
    gameId: bigint;
    player1: string;
    player2: string;
    betAmount: bigint;
    status: bigint;
    player1Choice: boolean;
    isWinnerPlayer1: boolean;
    claimed: boolean;
    feePercentAtCreateTime: bigint;
  };
}

export interface MainContractAbiInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "cancelGame"
      | "claimReward"
      | "createGame"
      | "feePercent"
      | "games"
      | "getGameById"
      | "getOwnerBalance"
      | "getWaitingGames"
      | "joinGame"
      | "nextGameId"
      | "owner"
      | "setFeePercent"
      | "waitingGameIds"
      | "waitingGames"
      | "withdrawOwnerBalance"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Claimed"
      | "FeePercentChanged"
      | "GameCanceled"
      | "GameCreated"
      | "GameFinished"
      | "GameJoined"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "cancelGame",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "createGame", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "feePercent",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "games", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "getGameById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOwnerBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWaitingGames",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "joinGame",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nextGameId",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setFeePercent",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "waitingGameIds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "waitingGames",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawOwnerBalance",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "cancelGame", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feePercent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "games", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getGameById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOwnerBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWaitingGames",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "joinGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nextGameId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeePercent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "waitingGameIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "waitingGames",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawOwnerBalance",
    data: BytesLike
  ): Result;
}

export namespace ClaimedEvent {
  export type InputTuple = [
    gameId: BigNumberish,
    winner: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [gameId: bigint, winner: string, amount: bigint];
  export interface OutputObject {
    gameId: bigint;
    winner: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FeePercentChangedEvent {
  export type InputTuple = [newFeePercent: BigNumberish];
  export type OutputTuple = [newFeePercent: bigint];
  export interface OutputObject {
    newFeePercent: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameCanceledEvent {
  export type InputTuple = [gameId: BigNumberish, player1: AddressLike];
  export type OutputTuple = [gameId: bigint, player1: string];
  export interface OutputObject {
    gameId: bigint;
    player1: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameCreatedEvent {
  export type InputTuple = [
    gameId: BigNumberish,
    player1: AddressLike,
    betAmount: BigNumberish,
    player1Choice: boolean,
    feePercent: BigNumberish
  ];
  export type OutputTuple = [
    gameId: bigint,
    player1: string,
    betAmount: bigint,
    player1Choice: boolean,
    feePercent: bigint
  ];
  export interface OutputObject {
    gameId: bigint;
    player1: string;
    betAmount: bigint;
    player1Choice: boolean;
    feePercent: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameFinishedEvent {
  export type InputTuple = [
    gameId: BigNumberish,
    winner: AddressLike,
    winningAmount: BigNumberish
  ];
  export type OutputTuple = [
    gameId: bigint,
    winner: string,
    winningAmount: bigint
  ];
  export interface OutputObject {
    gameId: bigint;
    winner: string;
    winningAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameJoinedEvent {
  export type InputTuple = [gameId: BigNumberish, player: AddressLike];
  export type OutputTuple = [gameId: bigint, player: string];
  export interface OutputObject {
    gameId: bigint;
    player: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface MainContractAbi extends BaseContract {
  connect(runner?: ContractRunner | null): MainContractAbi;
  waitForDeployment(): Promise<this>;

  interface: MainContractAbiInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  cancelGame: TypedContractMethod<
    [_gameId: BigNumberish],
    [void],
    "nonpayable"
  >;

  claimReward: TypedContractMethod<
    [_gameId: BigNumberish],
    [void],
    "nonpayable"
  >;

  createGame: TypedContractMethod<[_choice: boolean], [bigint], "payable">;

  feePercent: TypedContractMethod<[], [bigint], "view">;

  games: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        bigint,
        bigint,
        boolean,
        boolean,
        boolean,
        bigint
      ] & {
        gameId: bigint;
        player1: string;
        player2: string;
        betAmount: bigint;
        status: bigint;
        player1Choice: boolean;
        isWinnerPlayer1: boolean;
        claimed: boolean;
        feePercentAtCreateTime: bigint;
      }
    ],
    "view"
  >;

  getGameById: TypedContractMethod<
    [_gameId: BigNumberish],
    [CoinTossGame.GameStructOutput],
    "view"
  >;

  getOwnerBalance: TypedContractMethod<[], [bigint], "view">;

  getWaitingGames: TypedContractMethod<[], [bigint[]], "view">;

  joinGame: TypedContractMethod<[_gameId: BigNumberish], [void], "payable">;

  nextGameId: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  setFeePercent: TypedContractMethod<
    [_newFeePercent: BigNumberish],
    [void],
    "nonpayable"
  >;

  waitingGameIds: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  waitingGames: TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;

  withdrawOwnerBalance: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "cancelGame"
  ): TypedContractMethod<[_gameId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "claimReward"
  ): TypedContractMethod<[_gameId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createGame"
  ): TypedContractMethod<[_choice: boolean], [bigint], "payable">;
  getFunction(
    nameOrSignature: "feePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "games"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        string,
        string,
        bigint,
        bigint,
        boolean,
        boolean,
        boolean,
        bigint
      ] & {
        gameId: bigint;
        player1: string;
        player2: string;
        betAmount: bigint;
        status: bigint;
        player1Choice: boolean;
        isWinnerPlayer1: boolean;
        claimed: boolean;
        feePercentAtCreateTime: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getGameById"
  ): TypedContractMethod<
    [_gameId: BigNumberish],
    [CoinTossGame.GameStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getOwnerBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getWaitingGames"
  ): TypedContractMethod<[], [bigint[]], "view">;
  getFunction(
    nameOrSignature: "joinGame"
  ): TypedContractMethod<[_gameId: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "nextGameId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "setFeePercent"
  ): TypedContractMethod<[_newFeePercent: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "waitingGameIds"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "waitingGames"
  ): TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "withdrawOwnerBalance"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "Claimed"
  ): TypedContractEvent<
    ClaimedEvent.InputTuple,
    ClaimedEvent.OutputTuple,
    ClaimedEvent.OutputObject
  >;
  getEvent(
    key: "FeePercentChanged"
  ): TypedContractEvent<
    FeePercentChangedEvent.InputTuple,
    FeePercentChangedEvent.OutputTuple,
    FeePercentChangedEvent.OutputObject
  >;
  getEvent(
    key: "GameCanceled"
  ): TypedContractEvent<
    GameCanceledEvent.InputTuple,
    GameCanceledEvent.OutputTuple,
    GameCanceledEvent.OutputObject
  >;
  getEvent(
    key: "GameCreated"
  ): TypedContractEvent<
    GameCreatedEvent.InputTuple,
    GameCreatedEvent.OutputTuple,
    GameCreatedEvent.OutputObject
  >;
  getEvent(
    key: "GameFinished"
  ): TypedContractEvent<
    GameFinishedEvent.InputTuple,
    GameFinishedEvent.OutputTuple,
    GameFinishedEvent.OutputObject
  >;
  getEvent(
    key: "GameJoined"
  ): TypedContractEvent<
    GameJoinedEvent.InputTuple,
    GameJoinedEvent.OutputTuple,
    GameJoinedEvent.OutputObject
  >;

  filters: {
    "Claimed(uint256,address,uint256)": TypedContractEvent<
      ClaimedEvent.InputTuple,
      ClaimedEvent.OutputTuple,
      ClaimedEvent.OutputObject
    >;
    Claimed: TypedContractEvent<
      ClaimedEvent.InputTuple,
      ClaimedEvent.OutputTuple,
      ClaimedEvent.OutputObject
    >;

    "FeePercentChanged(uint256)": TypedContractEvent<
      FeePercentChangedEvent.InputTuple,
      FeePercentChangedEvent.OutputTuple,
      FeePercentChangedEvent.OutputObject
    >;
    FeePercentChanged: TypedContractEvent<
      FeePercentChangedEvent.InputTuple,
      FeePercentChangedEvent.OutputTuple,
      FeePercentChangedEvent.OutputObject
    >;

    "GameCanceled(uint256,address)": TypedContractEvent<
      GameCanceledEvent.InputTuple,
      GameCanceledEvent.OutputTuple,
      GameCanceledEvent.OutputObject
    >;
    GameCanceled: TypedContractEvent<
      GameCanceledEvent.InputTuple,
      GameCanceledEvent.OutputTuple,
      GameCanceledEvent.OutputObject
    >;

    "GameCreated(uint256,address,uint256,bool,uint256)": TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;
    GameCreated: TypedContractEvent<
      GameCreatedEvent.InputTuple,
      GameCreatedEvent.OutputTuple,
      GameCreatedEvent.OutputObject
    >;

    "GameFinished(uint256,address,uint256)": TypedContractEvent<
      GameFinishedEvent.InputTuple,
      GameFinishedEvent.OutputTuple,
      GameFinishedEvent.OutputObject
    >;
    GameFinished: TypedContractEvent<
      GameFinishedEvent.InputTuple,
      GameFinishedEvent.OutputTuple,
      GameFinishedEvent.OutputObject
    >;

    "GameJoined(uint256,address)": TypedContractEvent<
      GameJoinedEvent.InputTuple,
      GameJoinedEvent.OutputTuple,
      GameJoinedEvent.OutputObject
    >;
    GameJoined: TypedContractEvent<
      GameJoinedEvent.InputTuple,
      GameJoinedEvent.OutputTuple,
      GameJoinedEvent.OutputObject
    >;
  };
}
