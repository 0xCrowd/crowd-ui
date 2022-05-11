import React, { PropsWithChildren, ReactElement, useState } from "react";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

import Navbar from "@components/navbar/index";
import ErrorComponent from "@components/error-component/index";
import PartyForm from "@app/pages/main-page/components/party-form";
import NftPreview from "@app/pages/main-page/components/nft-preview";
import Modal from "@app/components/modal";
import MobileError from "@app/mobile-components/error-component";
import { MobileNavbar } from "@app/mobile-components/navbar";
import { MobileFooter } from "@app/mobile-components/footer/footer";

import daoStore from "@app/stores/daoStore";
import chainStore from "@app/stores/chainStore";

import { StateEnum } from "@enums/state-enum/index";
import { notify } from "../../utils/notify";
import { IPartyFormData } from "@app/pages/main-page/components/party-form/constants";

//#region styles
import { styled } from "@linaria/react";
import { desktopComponent, mobileComponent } from "@app/assets/styles/atomic";
import { useHistory } from "react-router-dom";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #141414;
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
    const { push } = useHistory();
    const { balance, blockChainState, address } = chainStore;
    const {
      createCrowd,
      clearPage,
      getPreview,
      clearPreview,
      crowdPreview,
      createCrowdState,
    } = daoStore;

    const [previewId, setPreviewId] = useState("");

    const onFormSubmit = (data: IPartyFormData) => {
      try {
        let id = "";

        const [, , domain, page, address, nftId] = data.url.split("/");

        if (domain === "rarible.com" || domain === "rinkeby.rarible.com") {
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
      } catch (error) {}
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
        <Navbar
          balance={balance}
          className={desktopComponent}
          onAddNew={openModal}
        />
        <MobileNavbar
          className={mobileComponent}
          account={address}
          onAddNew={openModal}
        />
        {blockChainState === StateEnum.Error ? (
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
