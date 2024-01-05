import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FaucetError, WindowWithEthereum } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { requestAccount } from "@/lib/utils";
import faucetContract from "@/lib/faucet";

export const useCalToken = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [txHash, setTxHash] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { toast } = useToast();

  const connectWallet = async () => {
    // Check if Metamask is installed and available
    if (
      typeof window !== "undefined" &&
      (window as WindowWithEthereum).ethereum
    ) {
      try {
        // Get the provider using Metamask's Ethereum object
        const provider = new ethers.BrowserProvider(
          (window as WindowWithEthereum).ethereum
        );

        // Request the user's accounts using a custom function
        const accounts = await requestAccount();

        // Narrow down the type to avoid potential issues
        if (!accounts) return;

        // Get the signer using the provider
        setSigner(await provider.getSigner());

        // Set local contract instance with a provided function (faucetContract)
        setContract(faucetContract(provider));

        // Set the active wallet address; if using a provider to get accounts, it must be accounts[0]
        setWalletAddress(accounts);
      } catch (error) {
        // Log and handle errors during the process
        console.error((error as Error).message);
      }
    } else {
      // Display a message if Metamask is not installed
      toast({
        variant: "destructive",
        title: "Uh oh! Metamask is not installed",
        description: "Please install Metamask to interact with this Web3 app",
      });
    }
  };

  const getCurrentWalletConnected = async () => {
    // Check if Metamask is installed and available
    if (
      typeof window !== "undefined" &&
      (window as WindowWithEthereum).ethereum
    ) {
      try {
        // Check if the user is logged in to Metamask
        if ((window as WindowWithEthereum).ethereum._metamask.isUnlocked()) {
          // Get the provider using Metamask's Ethereum object
          const provider = new ethers.BrowserProvider(
            (window as WindowWithEthereum).ethereum
          );

          // Request the user's accounts using a custom function
          const accounts = await requestAccount();

          // Narrow down the type to avoid potential issues
          if (!accounts) return;

          // Check if at least one account is available
          if (accounts.length > 0) {
            // Get the signer using the provider
            setSigner(await provider.getSigner());

            // Set local contract instance with a provided function (faucetContract)
            setContract(faucetContract(provider));

            /**
             * Set the active wallet address.
             * Note: If using a provider to get accounts, it must be accounts[0].
             */
            setWalletAddress(accounts);
          } else {
            // Display a warning if no accounts are available
            toast({
              variant: "destructive",
              title: "Caution!",
              description: "Connect to Metamask using a connect button",
            });
          }
        }
      } catch (error) {
        // Log and handle errors during the process
        console.error((error as Error).message);
      }
    } else {
      // Display a message if Metamask is not installed
      toast({
        variant: "destructive",
        title: "Uh oh! Metamask is not installed",
        description: "Please install Metamask to interact with this Web3 app",
      });
    }
  };

  const addWalletListener = async () => {
    // Check if Metamask is installed and available
    if (
      typeof window !== "undefined" &&
      (window as WindowWithEthereum).ethereum
    ) {
      // Add event listener for Metamask account changes
      (window as WindowWithEthereum).ethereum.on(
        "accountsChanged",
        // Update wallet address if the user changes the wallet address in Metamask
        (accounts: string) => {
          setWalletAddress(accounts[0]);
        }
      );
    } else {
      /** Metamask is not installed
       * Set the wallet address to an empty string
       */
      setWalletAddress("");

      // Display an error message to the user
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
        //wait until transaction is completed in the blockchain
        const tx = await response.wait();
        //showing toast component upon completion of transaction
        toast({
          title: "Transaction Completed",
          description:
            "Successfully claim CAL Token. Wait for the cooldown to claim again. Thank you!",
        });
        setTxHash(tx.hash);
      } else {
        toast({
          variant: "destructive",
          title: "Caution!",
          description: "Contract or signer is undefined.",
        });
      }
    } catch (error) {
      console.error(error as FaucetError);
      toast({
        variant: "destructive",
        title: "Error!",
        description: (error as FaucetError).reason,
      });
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

    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  return { walletAddress, connectWallet, getTokenHandler, txHash, isLoaded };
};
