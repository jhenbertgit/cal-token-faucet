import { toast } from "@/components/ui/use-toast";
import { FaucetError, WindowWithEthereum } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Request account to connect the wallet
export const requestAccount = async (): Promise<string | null> => {
  // Check if Metamask is installed and available
  if (
    typeof window !== "undefined" &&
    (window as WindowWithEthereum).ethereum
  ) {
    try {
      // Request user accounts using Metamask's method
      const accounts = await (window as WindowWithEthereum).ethereum.request({
        method: "eth_requestAccounts",
      });

      // Return the first account if available
      return accounts[0];
    } catch (error) {
      // Log and handle errors during the account request
      console.error((error as FaucetError).message);

      return null;
    }
  } else {
    // Display a warning if Metamask is not installed
    toast({
      variant: "destructive",
      title: "Warning!",
      description: "Please install Metamask to interact with this Web3 app",
    });

    return null;
  }
};

//Truncate Address
export const truncateAddress = (address: string) => {
  return address.slice(0, 7) + "..." + address.slice(-4);
};
