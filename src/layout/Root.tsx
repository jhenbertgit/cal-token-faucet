import { Outlet } from "react-router-dom";
import { MainNav, Footer } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import Container from "@/components/ui/Container";

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
