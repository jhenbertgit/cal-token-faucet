import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useCalToken } from "./hooks/use-cal-token";
import { WalletCtx } from "./context/wallet-ctx";
import RootLayout from "./layout/Root";
import LandingPage from "./pages/LandingPage";
import ThemeProvider from "./layout/ThemeProvider";

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
  const { connectWallet, getTokenHandler, walletAddress, txHash, isLoaded } =
    useCalToken();

  const value = {
    connectWallet,
    getTokenHandler,
    walletAddress,
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
