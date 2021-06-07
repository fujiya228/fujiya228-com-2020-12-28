import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export interface AdsenseProps {
  pathname: string;
}

export const Adsense: React.FC<AdsenseProps> = props => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [props.pathname]);
  const client = 'ca-pub-5351220307196429';
  const format = 'fluid';
  const layout = 'in-article';
  const slot = '1004093357';

  return (
    <Ins
      className="adsbygoogle"
      data-ad-client={client}
      data-ad-layout={layout}
      data-ad-format={format}
      data-ad-slot={slot}
    />
  );
};

const Ins = styled.ins`
  display:block;
  text-align:center;
  min-width: 250px;
`;
