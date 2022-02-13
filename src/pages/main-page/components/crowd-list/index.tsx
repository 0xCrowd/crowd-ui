import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroll-component";

import NftCard from "@components/nft-card";
import NoCrowds from "@components/no-crowds";
import MobileNoCrowds from "@app/mobile-components/no-crowds";

//#region styles
import { styled } from "@linaria/react";
import { css, cx } from "@linaria/core";

import { media, mr32 } from "@assets/styles/atomic";

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1152px;
  margin: auto;
  padding-top: 48px;

  ${media("mobile")} {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const card = css`
  margin-bottom: 36px;

  ${media("mobile")} {
    margin-right: 0 !important;
  }

  ${media("large")} {
    margin-bottom: 60px;
  }
`;

const mobileNoCrowd = css`
  ${media("large")} {
    display: none;
  }
`;

const desktopNoCrowds = css`
  ${media("mobile")} {
    display: none;
  }
`;
//#endregion

interface Props {
  loading: boolean;
  crowds: AdaptedCrowd[];
  onCreateClick: () => void;
  loadMore: () => void;
  hasMore: boolean;
  isMyCrowds?: boolean;
}

const CrowdList = ({
  crowds,
  loading,
  onCreateClick,
  loadMore,
  hasMore,
  isMyCrowds = false,
}: Props): ReactElement => {
  if (loading) {
    return (
      <LoaderContainer>
        <Loader type="Puff" color="#6200E8" height={100} width={100} />
      </LoaderContainer>
    );
  }

  if (!loading && !crowds.length) {
    return (
      <>
        <NoCrowds
          onCreateClick={onCreateClick}
          isMyCrowds={isMyCrowds}
          className={desktopNoCrowds}
        />
        <MobileNoCrowds
          isMyCrowds={isMyCrowds}
          onCreateClick={onCreateClick}
          className={mobileNoCrowd}
        />
      </>
    );
  }

  return (
    <>
      <InfiniteScroll
        dataLength={crowds.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <LoaderContainer>
            <Loader type="Puff" color="#6200E8" height={50} width={50} />
          </LoaderContainer>
        }
        scrollableTarget="scrollableDiv"
      >
        <Root>
          {crowds.map(
            (
              {
                name,
                media,
                price,
                ceramic_stream,
                percentage,
                deposits,
                status,
              },
              index
            ) => {
              return (
                <NftCard
                  key={ceramic_stream}
                  id={ceramic_stream}
                  price={+price}
                  percentage={percentage}
                  title={name}
                  participants={deposits.length}
                  className={cx(card, (index + 1) % 4 === 0 ? "" : mr32)}
                  status={status}
                  image={media}
                />
              );
            }
          )}
        </Root>
      </InfiniteScroll>
    </>
  );
};

export default CrowdList;
