const TextFaucet = () => {
  return (
    <div className="flex flex-col items-center mb-5">
      <h1 className="text-4xl font-bold">CAL Token Faucet</h1>
      <p className="text-sm text-muted-foreground italic font-medium mt-3">
        Claim your 50 CAL Token per minute
      </p>
      <p className="text-md text-center mt-5">
        For now, CAL token is in BSC Testnet Network purposely to test this
        site. Manually connect your Metamask by clicking add BSC Testnet Network
        button found in lower left portion of{" "}
        <span>
          <a
            href="https://testnet.bscscan.com/"
            target="_blank"
            className="underline"
          >
            BSC Testnet website.
          </a>
        </span>{" "}
      </p>
      <p className="text-sm text-muted-foreground text-center mt-3">
        Import CAL Token to your Metamask wallet using this address:
        0x267FBee32bF853ff224b85C96E0Da6FF84f987BB
      </p>
    </div>
  );
};

export default TextFaucet;
