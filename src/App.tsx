import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/Root";
import LandingPage from "./pages/LandingPage";
import ThemeProvider from "./layout/ThemeProvider";
import WalletCtxProvider from "./layout/WalletCtxProvider";

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
  return (
    <ThemeProvider defaultTheme="dark" storageKey="CalToken">
      <WalletCtxProvider>
        <RouterProvider router={router} />
      </WalletCtxProvider>
    </ThemeProvider>
  );
}

export default App;
