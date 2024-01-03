import { createContext } from "react";

type WalletCtxType = {
  walletAddress: string;
  txHash: string;
  isLoaded: boolean;
  connectWallet?: () => void;
  getTokenHandler?: () => void;
};

export const WalletCtx = createContext<WalletCtxType>({
  walletAddress: "",
  txHash: "",
  isLoaded: false,
  connectWallet: () => null,
  getTokenHandler: () => null,
});
