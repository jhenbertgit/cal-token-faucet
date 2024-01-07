import { CardFaucet, Footer, TextFaucet, TxHash } from "@/components";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center">
        <div className="w-full max-w-screen-lg mx-auto p-4">
          <TextFaucet />
          <CardFaucet />
          <TxHash />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
