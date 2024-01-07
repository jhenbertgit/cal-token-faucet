import { Outlet } from "react-router-dom";
import { MainNav, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = () => {
  return (
    <>
      <MainNav />
      <div className="flex flex-col min-h-screen">
        <Outlet />
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default RootLayout;
