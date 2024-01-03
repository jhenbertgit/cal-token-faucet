import { useContext } from "react";
import { Link } from "react-router-dom";
import { truncateAddress } from "@/lib/utils";
import { WalletCtx } from "@/context/wallet-ctx";
import { Button } from "./ui/button";
import Container from "./ui/Container";
import ModeToggle from "./ui/ModeToggle";

const MainNav = () => {
  const { walletAddress, connectWallet } = useContext(WalletCtx);

  return (
    <header>
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between mt-5">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-xl font-bold">CAL</h1>
            </Link>
          </div>
          <div className="flex space-x-3 items-center">
            <Button
              onClick={connectWallet}
              className="text-nowrap"
              disabled={!!walletAddress}
            >
              {!walletAddress
                ? "Connect Wallet"
                : truncateAddress(walletAddress)}
            </Button>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default MainNav;
