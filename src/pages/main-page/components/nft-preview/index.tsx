import React, { ReactElement, useRef, useEffect } from "react";
import Loader from "react-loader-spinner";

import Button, { ButtonSize } from "@app/components/button";

//#region styles
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { mb24 } from "@app/assets/styles/atomic";

const dn = css`
  display: none;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 364px;
`;

const Preview = styled.img`
  max-height: 364px;
  max-width: 364px;
`;

const PreviewLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 304px;
  width: 304px;
  margin: auto;
  background: #263238;
  border-radius: 40px;
  z-index: 100;
`;

const Name = styled.p`
  margin: 0;
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
//#endregion

interface Props {
  nftName: string;
  image: string;
  loading: boolean;
  disabledSubmit: boolean;
  onSubmit: () => void;
}

const NftPreview = ({
  nftName,
  image,
  loading,
  onSubmit,
  disabledSubmit,
}: Props): ReactElement => {
  const imgEl = useRef<HTMLImageElement>(null);

  const [loaded, setLoaded] = React.useState(false);

  const onImageLoaded = () => setLoaded(true);

  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onImageLoaded);
      return () => imgElCurrent.removeEventListener("load", onImageLoaded);
    }
  }, []);

  return (
    <Root>
      <img src={image} className={dn} ref={imgEl}/>
      {!loaded ? (
        <PreviewLoader className={mb24}>
          <Loader
            type="Puff"
            color="#6200E8"
            height={20}
            width={20}
            timeout={0}
          />
        </PreviewLoader>
      ) : (
        <PreviewContainer className={mb24}>
          <Preview src={image} alt="preview" ref={imgEl} />
        </PreviewContainer>
      )}
      <Name title={nftName}>{nftName}</Name>
      <Button size={ButtonSize.large} loading={loading} onClick={onSubmit}>
        Start Fundrising
      </Button>
    </Root>
  );
};

export default NftPreview;
