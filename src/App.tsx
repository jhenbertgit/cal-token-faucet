import ThemeProvider from "./layout/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/Root";
import LandingPage from "./components/LandingPage";
import { useCallback, useEffect, useState } from "react";
import { WalletCtx } from "./context/wallet-ctx";
import { WindowWithEthereum } from "./types";
import { ethers } from "ethers";
import faucetContract from "./lib/faucet";
import { useToast } from "./components/ui/use-toast";
import { requestAccount } from "./lib/utils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
]);

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [txHash, setTxHash] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { toast } = useToast();

  const connectWallet = async () => {
    if ((window as WindowWithEthereum).ethereum) {
      try {
        //get provider
        const provider = new ethers.BrowserProvider(
          (window as WindowWithEthereum).ethereum
        );
        //get accounts
        // const accounts = await provider.send("eth_requestAccounts", []);
        const accounts = await requestAccount();
        if (!accounts) return;

        //get signer
        setSigner(await provider.getSigner());

        //set local contract instance
        setContract(faucetContract(provider));

        //if using provider to get accounts, must be accounts[0]
        setWalletAddress(accounts);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask to use this Web3 app.");
    }
  };

  const getCurrentWalletConnected = useCallback(async () => {
    if ((window as WindowWithEthereum).ethereum) {
      try {
        //get provider
        const provider = new ethers.BrowserProvider(
          (window as WindowWithEthereum).ethereum
        );

        //get accounts
        const accounts = await requestAccount();
        if (!accounts) return;

        //get signer
        setSigner(await provider.getSigner());

        //set local contract instance
        setContract(faucetContract(provider));

        //set active wallet address
        //if using provider to get accounts, must be accounts[0]
        setWalletAddress(accounts);
      } catch (error) {
        console.error((error as Error).message);
      }
    }
  }, []);

  const getTokenHandler = async () => {
    try {
      if (contract && signer) {
        const contractWithSigner = contract.connect(signer);
        const response = await contractWithSigner.requestTokens();

        setIsLoaded(true);

        const tx = await response.wait();
        //showing toast component upon completion of transaction
        toast({
          title: "Transaction Completed",
          description:
            "Successfully claim CAL Token. Wait for the cooldown to claim again. Thank you!",
        });
        setTxHash(tx.hash);
      } else {
        console.log("Contract or signer is undefined.");
      }
    } catch (error) {
      console.error((error as Error).message);
    }
    setIsLoaded(false);
  };

  useEffect(() => {
    // const getBal = async () => {
    //   if (contract) {
    //     const response = await contract.getBalance();
    //     console.log(`res: ${await response}`);
    //   }
    // };
    // getBal();
    getCurrentWalletConnected();
  }, [walletAddress]);

  const value = {
    walletAddress,
    connectWallet,
    getTokenHandler,
    txHash,
    isLoaded,
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="CalToken">
      <WalletCtx.Provider value={value}>
        <RouterProvider router={router} />
      </WalletCtx.Provider>
    </ThemeProvider>
  );
}

export default App;
