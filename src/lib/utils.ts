import { WindowWithEthereum } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Connect Wallet
export const requestAccount = async (): Promise<string | null> => {
  if ((window as WindowWithEthereum).ethereum) {
    try {
      const accounts = await (window as WindowWithEthereum).ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    alert("Please install MetaMask to use this Web3 app.");
    return null;
  }
};

//Truncate Address
export const truncateAddress = (address: string) => {
  return address.slice(0, 7) + "..." + address.slice(-4);
};
