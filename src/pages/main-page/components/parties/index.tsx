import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import cn from 'classnames';

import Card from "@app/components/card";
import Button from "@app/components/button";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { mr40 } from '@assets/styles/constants';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1220px;
  margin: auto;
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
  font-size: 48px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #6c5ce7;
`;

const card = css`
  margin-bottom: 60px;
`;
//#endregion

interface Props {
  loading: boolean;
  pools: any[];
  onCreateClick: () => void;
}

const Parties = ({ pools, loading, onCreateClick }: Props): ReactElement => {
  if (loading) {
    return (
      <LoaderContainer>
        <Loader
          type="Puff"
          color="#6200E8"
          height={100}
          width={100}
          timeout={3000}
        />
      </LoaderContainer>
    );
  }

  return (
    <>
      {pools && pools.length ? (
        <Root>
          {pools.map(
            ({
              id,
              party_name,
              total,
              participants,
              percentage,
              image,
              price,
            }, index) => {
              return (
                <Card
                  id={id}
                  price={price}
                  collected={percentage}
                  title={party_name}
                  image={image}
                  participants={participants?.length}
                  className={cn(card, (index + 1) % 3 !== 0 ? mr40 : '')}
                />
              );
            }
          )}
        </Root>
      ) : (
        <LoaderContainer>
          <EmptyTitle>There is no parties yet!</EmptyTitle>
          <Button onClick={onCreateClick}>Try to start a new one</Button>
        </LoaderContainer>
      )}
    </>
  );
};

export default Parties;
