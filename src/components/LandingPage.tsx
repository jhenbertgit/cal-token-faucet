import { useContext } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { WalletCtx } from "@/context/wallet-ctx";
import { ClipLoader } from "react-spinners";

const LandingPage = () => {
  const { walletAddress, txHash, isLoaded, getTokenHandler } =
    useContext(WalletCtx);

  return (
    <>
      <div className="text-center mb-5 mt-44">
        <h1 className="text-4xl font-bold">CAL Token Faucet</h1>
        <p className="text-sm text-muted-foreground italic font-medium mt-3">
          Claim your 50 CAL Token per minute
        </p>
        <p className="text-md mt-5">
          For now, CAL token is in BSC Testnet Network purposely to test this
          site. <br /> Manually connect your Metamask by clicking add BSC
          Testnet Network button found in lower left portion of{" "}
          <span>
            <a href="https://testnet.bscscan.com/" className="underline">
              BSC Testnet website.
            </a>
          </span>{" "}
        </p>
        <p className="text-sm text-muted-foreground mt-3">
          Import CAL Token to your Metamask wallet with this address:
          0x267FBee32bF853ff224b85C96E0Da6FF84f987BB
        </p>
      </div>
      <div className="flex w-full max-w-2xl items-center space-x-2 m-auto">
        <Input
          type="text"
          placeholder="Enter your wallet address (0x...)"
          defaultValue={walletAddress}
        />
        <Button onClick={getTokenHandler} disabled={!walletAddress}>
          {!isLoaded ? (
            "Get 50 CAL Token"
          ) : (
            <>
              <ClipLoader
                loading={isLoaded}
                size={20}
                aria-label="Loading Spinner"
                data-test-id="loader"
              />
              {"  Getting your token..."}
            </>
          )}
        </Button>
      </div>
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

export default LandingPage;
