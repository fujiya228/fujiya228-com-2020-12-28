import React, { useEffect } from 'react';
import styled from '@emotion/styled';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export interface AdsenseProps {
  pathname: string;
  isInfead?: boolean;
}

export const Adsense: React.FC<AdsenseProps> = props => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [props.pathname]);
  const client = 'ca-pub-5351220307196429';

  const layout = props.isInfead ? null : 'in-article';
  const layoutKey = props.isInfead ? '-6t+ed+2i-1n-4w' : null;
  const slot = props.isInfead ? '5405028860' : '1004093357';
  const style = props.isInfead ? 'min-width: 250px' : null;

  return (
    <Ins
      className="adsbygoogle"
      css={style}
      data-ad-client={client}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-slot={slot}
    />
  );
};

const Ins = styled.ins`
  display:block;
  text-align:center;
`;
