import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import cn from 'classnames';
import InfiniteScroll from "react-infinite-scroll-component";

import NftCard from "@app/components/nft-card";
import Button from "@app/components/button";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { media, mr32 } from '@assets/styles/constants';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1152px;
  margin: auto;
  
  ${media('mobile')} {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 50%;
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

  ${media('mobile')} {
    font-size: 24px;
    height: 37px;
  }
`;

const card = css`
  margin-bottom: 36px;
  
  ${media('mobile')} {
    margin-right: 0 !important;
  }

  ${media('large')} {
    margin-bottom: 60px;
  }
`;

const button = css`
  width: 302px;
  height: 50px;

  ${media('large')} {
    height: 42px;
  }
`;

const buttonContainer = css`
  width: 304px;
  height: 52px;

  ${media('large')} {
    height: 44px;
  }
`;
//#endregion

interface Props {
  loading: boolean;
  daos: IAdaptedDao[];
  onCreateClick: () => void;
  loadMore: () => void;
  hasMore: boolean
}

const Parties = ({ daos, loading, onCreateClick, loadMore, hasMore }: Props): ReactElement => {
  if (loading) {
    return (
      <LoaderContainer>
        <Loader
          type="Puff"
          color="#6200E8"
          height={100}
          width={100}
        />
      </LoaderContainer>
    );
  }

  return (
    <>
      {daos && daos.length ? (
        <InfiniteScroll
          dataLength={daos.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<Loader
            type="Puff"
            color="#6200E8"
            height={10}
            width={10}
            timeout={3000}
          />}
          scrollableTarget="scrollableDiv"
        >
          <Root>
            {daos.map(
              ({
                partyName,
                ceramic_stream,
                percentage,
                users,
                image,
                price,
              }, index) => {
                return (
                  <NftCard
                    id={ceramic_stream}
                    price={price}
                    percentage={percentage}
                    title={partyName}
                    image={image}
                    participants={users?.length}
                    className={cn(card, (index + 1) % 4 !== 0 ? mr32 : '')}
                  />
                );
              }
            )}
          </Root>
        </InfiniteScroll>
      ) : (
        <LoaderContainer>
          <EmptyTitle>There is no parties yet!</EmptyTitle>
          <Button 
            className={button}
            containerClassName={buttonContainer}
            onClick={onCreateClick}
          >Try to start a new one</Button>
        </LoaderContainer>
      )}
    </>
  );
};

export default Parties;
