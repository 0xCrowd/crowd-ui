import React, { PropsWithChildren, ReactElement, useState } from "react";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";
import { useHistory, useLocation } from "react-router-dom";
import { useMetaMask } from "metamask-react";

import Navbar from "@components/navbar/index";
import ErrorComponent from "@components/error-component/index";
import PartyForm from "@app/pages/main-page/components/party-form";
import NftPreview from "@app/pages/main-page/components/nft-preview";
import Modal from "@app/components/modal";
import MobileError from "@app/mobile-components/error-component";
import { MobileNavbar } from "@app/mobile-components/navbar";
import { MobileFooter } from "@app/mobile-components/footer/footer";

import crowdStore from "@stores/crowdStore";
import chainStore from "@stores/chainStore";

import { StateEnum } from "@enums/state-enum/index";
import { notify } from "../../utils/notify";
import { IPartyFormData } from "@app/pages/main-page/components/party-form/constants";
import { RINKEBY_ID } from "@app/constants/chain";
import { RARIBLE_URL } from "@app/constants/rarible-url";

//#region styles
import { styled } from "@linaria/react";
import { desktopComponent, mobileComponent } from "@app/assets/styles/atomic";
import closePink from '@assets/images/close-pink.png';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #141414;
`;

const Text = styled.p`
  margin: 0;
`;

const Alert = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 50px;
  padding: 10px;
  font-weight: 600;
  font-size: 12px;
  color: #FF00F7;
  background: #660058;
  text-align: center;
`;

const Link = styled.a`
  font-weight: 600;
  font-size: 12px;
  color: #FF00F7;
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
`;
//#endregion

interface Props {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  className?: string;
}

const Layout = observer(
  ({
    children,
    openModal,
    closeModal,
    isModalOpen,
    className,
  }: PropsWithChildren<Props>): ReactElement => {
    const { chainId } = useMetaMask();
    const { push } = useHistory();
    const { pathname } = useLocation();
    const { balance, blockChainState, address } = chainStore;

    const {
      createCrowd,
      clearPage,
      getPreview,
      clearPreview,
      crowdPreview,
      createCrowdState,
    } = crowdStore;

    const [previewId, setPreviewId] = useState("");
    const [isAlertClosed, setIsAlertClosed] = useState(false);

    const onFormSubmit = (data: IPartyFormData) => {
      try {
        let id = "";

        const [, , domain, page, address, nftId] = data.url.split("/");

        if (domain === "rarible.com" || domain === RARIBLE_URL) {
          if (page === "token") {
            id = address.split("?")[0];
          }
        }

        if (domain === "opensea.io") {
          if (page === "assets") {
            id = `${address}:${nftId}`;
          }
        }

        getPreview(id);
        setPreviewId(id);
      } catch (error: any) {
        notify(error.message);
      }
    };

    const onCreate = async () => {
      try {
        const id = await createCrowd(previewId);
        closeModal();
        clearPage();
        push(`/${id}`);
      } catch (error) { }
    };

    return (
      <Root className={className} id='Layout'>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          preventScroll={false}
          title={crowdPreview ? "Create a Crowd" : "Start a Crowd"}
          isLight={!crowdPreview ? true : false}
          onBack={crowdPreview ? clearPreview : undefined}
        >
          {!crowdPreview ? (
            <PartyForm
              loading={createCrowdState === StateEnum.Loading}
              onSubmit={onFormSubmit}
            />
          ) : (
            <NftPreview
              loading={createCrowdState === StateEnum.Loading}
              nftName={crowdPreview?.name}
              image={crowdPreview?.media}
              onSubmit={onCreate}
              disabledSubmit={createCrowdState === StateEnum.Error}
            />
          )}
        </Modal>
        <div>
          {!isAlertClosed && <Alert>
            <Text>This is an Ethereum Rinkeby Testnet Demo 🛠</Text>
            <span>Click <Link href="https://rinkebyfaucet.com/" target="_blank" rel="noopener noreferrer">here</Link> to claim free Rinkeby ETH 💸 for tests. Click <Link href="https://youtu.be/vRbnEQVZVXA" target="_blank" rel="noopener noreferrer">here</Link> to watch an explanation video 🎥 on how to use Crowd</span>
            <Button onClick={() => setIsAlertClosed(true)}><img src={closePink} /></Button>
          </Alert>}
          <Navbar
            balance={balance}
            className={desktopComponent}
            onAddNew={openModal}
            location={pathname}
          />
        </div>
        <MobileNavbar
          className={mobileComponent}
          account={address}
          onAddNew={openModal}
        />
        {blockChainState === StateEnum.Error || chainId !== RINKEBY_ID ? (
          <>
            <MobileError className={mobileComponent} />
            <ErrorComponent className={desktopComponent} />
          </>
        ) : (
          children
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <MobileFooter className={mobileComponent} />
      </Root>
    );
  }
);

export default Layout;
