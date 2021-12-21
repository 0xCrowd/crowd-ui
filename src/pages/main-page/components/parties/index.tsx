import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import cn from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";

import NftCard from "@app/components/nft-card";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
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

const EmptyTitle = styled.p`
  margin-bottom: 84px;
  font-weight: bold;
  font-size: 36px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #fff;

  ${media("mobile")} {
    font-size: 24px;
    height: 37px;
  }
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

const button = css`
  width: 302px;
  height: 50px;

  ${media("large")} {
    height: 42px;
  }
`;

const buttonContainer = css`
  width: 304px;
  height: 52px;

  ${media("large")} {
    height: 44px;
  }
`;
//#endregion

interface Props {
  loading: boolean;
  crowds: AdaptedCrowd[];
  onCreateClick: () => void;
  loadMore: () => void;
  hasMore: boolean;
}

const Parties = ({
  crowds,
  loading,
  onCreateClick,
  loadMore,
  hasMore,
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
      <LoaderContainer>
        <EmptyTitle>There is no parties yet!</EmptyTitle>
      </LoaderContainer>
    );
  }

  return (
    <>
      {(
        <InfiniteScroll
          dataLength={8}
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
                    className={cn(card, (index + 1) % 4 === 0 ? '' : mr32)}
                    status={status}
                    image={media}
                  />
                );
              }
            )}
          </Root>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Parties;
