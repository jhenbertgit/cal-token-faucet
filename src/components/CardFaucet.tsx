import { useContext } from "react";
import { WalletCtx } from "@/context/wallet-ctx";
import { ClipLoader } from "react-spinners";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const CardFaucet = () => {
  const { walletAddress, isLoaded, getTokenHandler } = useContext(WalletCtx);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-md dark:shadow-secondary">
        <CardContent className="flex flex-col md:flex-row gap-3 items-center m-auto pt-6">
          <Input
            type="text"
            placeholder="Enter your wallet address (0x...)"
            defaultValue={walletAddress}
          />
          <Button onClick={getTokenHandler}>
            {!isLoaded ? (
              "Get 50 CAL Token"
            ) : (
              <>
                <ClipLoader
                  color="bg-foreground"
                  loading={isLoaded}
                  size={20}
                  aria-label="Loading Spinner"
                  data-test-id="loader"
                />
                {"  Getting your token..."}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardFaucet;
