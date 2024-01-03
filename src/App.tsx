import ThemeProvider from "./layout/ThemeProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/Root";
import LandingPage from "./components/LandingPage";
import { useEffect, useState } from "react";
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
      toast({
        variant: "destructive",
        title: "Uh oh! Metamask is not installed",
        description: "Please install Metamask to interact with this Web3 app",
      });
    }
  };

  //Disabled for the meantime until bug is fix
  // const getCurrentWalletConnected = async () => {
  //   if ((window as WindowWithEthereum).ethereum) {
  //     try {
  //       //Check if there's already request in progess
  //       if ((window as WindowWithEthereum).ethereum._metamask.isUnlocked()) {
  //         //get accounts
  //         // const accounts = await provider.send("eth_requestAccounts", []);
  //         const accounts = await requestAccount();
  //         if (!accounts) return;

  //         //get provider
  //         const provider = new ethers.BrowserProvider(
  //           (window as WindowWithEthereum).ethereum
  //         );

  //         //get signer
  //         setSigner(await provider.getSigner());

  //         //set local contract instance
  //         setContract(faucetContract(provider));

  //         //set active wallet address
  //         //if using provider to get accounts, must be accounts[0]
  //         setWalletAddress(accounts);
  //       } else {
  //         toast({
  //           variant: "destructive",
  //           title: "Caution!",
  //           description: "Request in progress. Please wait.",
  //         });
  //       }
  //     } catch (error) {
  //       console.error((error as Error).message);
  //     }
  //   } else {
  //     toast({
  //       variant: "destructive",
  //       title: "Uh oh! Metamask is not installed",
  //       description: "Please install Metamask to interact with this Web3 app",
  //     });
  //   }
  // };

  const addWalletListener = async () => {
    //Check if Metamask is installed
    if ((window as WindowWithEthereum).ethereum) {
      (window as WindowWithEthereum).ethereum.on(
        "accountsChanged",
        //Update wallet address if user changes wallet address in Metamask
        (accounts: any) => {
          setWalletAddress(accounts[0]);
        }
      );
    } else {
      /**Metamask is not installed
       * set the wallet address to empty string
       */
      setWalletAddress("");

      //Display error message to user
      toast({
        variant: "destructive",
        title: "Uh oh! Metamask is not installed",
        description: "Please install Metamask to interact with this Web3 app",
      });
    }
  };

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
    //For update soon
    // const getBal = async () => {
    //   if (contract) {
    //     const response = await contract.getBalance();
    //     console.log(`res: ${await response}`);
    //   }
    // };
    // getBal();
    
    // getCurrentWalletConnected();
    addWalletListener();
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
