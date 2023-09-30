import "./App.css";
import '@rainbow-me/rainbowkit/styles.css';

import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import SuperfluidWidget, {
  EventListeners,
  PaymentOption,
} from "@superfluid-finance/widget";
import superTokenList from "@superfluid-finance/widget/tokenlist";
import { useCallback, useMemo, useState } from "react";
import { WagmiConfig } from "wagmi";

import paymentDetails from "./paymentDetails";
import { ProductDetails } from "@superfluid-finance/widget";
import { chains, wagmiConfig } from "./wagmi";

export default function App() {
  const [initialChainId, setInitialChainId] = useState<number | undefined>();
  const onPaymentOptionUpdate = useCallback<
    Required<EventListeners>["onPaymentOptionUpdate"]
  >(
    (paymentOption?: PaymentOption) =>
      setInitialChainId(paymentOption?.chainId),
    [setInitialChainId],
  );
  const eventListeners = useMemo<EventListeners>(
    () => ({ onPaymentOptionUpdate }),
    [onPaymentOptionUpdate],
  );
  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  var url = new URL(window.location.href);
  console.log({urlParams}, queryString, url);

  const data = urlParams.get('name') && urlParams.get('description') && urlParams.get('imageURI') ? {
    name: urlParams.get('name'),
    description: urlParams.get('description'),
    imageURI: urlParams.get('imageURI'),
  } : {
    name: "Superfluid Funscription",
    description:
      "Superfluid Funscription is a subscription-based service for continuous & perpetual fun.",
      imageURI: "https://pbs.twimg.com/profile_images/1683249222534025216/-AksKsna_400x400.jpg",
  };
  // const data = {
  //   // name: "Superfluid Funscription",
  //   // description:
  //   //   "Superfluid Funscription is a subscription-based service for continuous & perpetual fun.",
  //   //   imageURI: "",
  //   name: urlParams.get('name'),
  //   description: urlParams.get('description'),
  //   imageURI: urlParams.get('imageURI'),
  // };

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} initialChain={initialChainId}>
          <ConnectButton.Custom>
            {({ openConnectModal, connectModalOpen }) => {
              const walletManager = {
                open: async () => openConnectModal(),
                isOpen: connectModalOpen,
              };
              return (
                <>
                  {data && (<SuperfluidWidget
                    productDetails={data as ProductDetails}
                    paymentDetails={paymentDetails}
                    tokenList={superTokenList}
                    type="dialog"
                    walletManager={walletManager}
                    eventListeners={eventListeners}
                  >
                    {({ openModal , }) => {
                      setTimeout(() => {
                        openModal();
                      }
                      , 100);
                      return <div></div>
                    // return  <button onClick={() => openModal()}>Support</button>
                    }
                    }
                  </SuperfluidWidget>)}
                </>
              );
            }}
          </ConnectButton.Custom>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
