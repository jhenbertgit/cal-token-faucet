import { Outlet } from "react-router-dom";
import MainNav from "@/components/MainNav";
import Container from "@/components/ui/Container";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <>
      <MainNav />
      <Container>
        <Outlet />
      </Container>
      <Footer />
      <Toaster />
    </>
  );
};

export default RootLayout;
