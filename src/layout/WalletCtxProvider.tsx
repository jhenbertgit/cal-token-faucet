import { WalletCtx } from "@/context/wallet-ctx";
import { useCalToken } from "@/hooks/use-cal-token";

type WalletCtxProviderProps = {
  children: React.ReactNode;
};

const WalletCtxProvider = ({ children }: WalletCtxProviderProps) => {
  const { connectWallet, getTokenHandler, walletAddress, txHash, isLoaded } =
    useCalToken();

  const value = {
    connectWallet,
    getTokenHandler,
    walletAddress,
    txHash,
    isLoaded,
  };
  
  return <WalletCtx.Provider value={value}>{children}</WalletCtx.Provider>;
};

export default WalletCtxProvider;
