import { useContext } from "react";
import { WalletCtx } from "@/context/wallet-ctx";

const TxHash = () => {
  const { txHash } = useContext(WalletCtx);
  
  return (
    <>
      {txHash && (
        <p className="text-center mt-3">
          <a href={`https://testnet.bscscan.com/tx/${txHash}`} target="_blank">
            View Transaction in Explorer
          </a>
        </p>
      )}
    </>
  );
};

export default TxHash;
