export interface WindowWithEthereum extends Window {
  ethereum?: any;
}

export interface FaucetError extends Error {
  reason: string;
}
