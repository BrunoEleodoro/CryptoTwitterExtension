import '@rainbow-me/rainbowkit/styles.css';
import "./App.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import SuperfluidWidget from "@superfluid-finance/widget";
import superTokenList from "@superfluid-finance/widget/tokenlist";

import { ProductDetails } from "@superfluid-finance/widget";
import paymentDetails from "./paymentDetails";

export default function App() {


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  var url = new URL(window.location.href);
  console.log({urlParams}, queryString, url);

  const data = urlParams.get('name')&& urlParams.get('receiverAddress') && urlParams.get('description') && urlParams.get('imageURI') ? {
    name: urlParams.get('name'),
    description: urlParams.get('description'),
    imageURI: urlParams.get('imageURI'),
    receiverAddress: urlParams.get('receiverAddress')
  } : {
    name: "Superfluid Funscription",
    description:
      "Superfluid Funscription is a subscription-based service for continuous & perpetual fun.",
      imageURI: "https://pbs.twimg.com/profile_images/1670614648863727617/JLHVnDUO_400x400.jpg",
      receiverAddress: '0xdd6d37e29294a985e49ff301acc80877fc24997f'
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
    </>
  );
}
