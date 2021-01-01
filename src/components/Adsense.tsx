import React, { useEffect } from 'react';
import styled from '@emotion/styled';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export interface AdsenseProps {
  isInfead?: boolean;
}

export const Adsense: React.FC<AdsenseProps> = props => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  });
  const client = 'ca-pub-5351220307196429';
  const format = 'fluid';

  const layout = props.isInfead ? null : 'in-article';
  const layoutKey = props.isInfead ? '-6t+ed+2i-1n-4w' : null;
  const slot = props.isInfead ? '5405028860' : '1004093357';
  const style = props.isInfead ? 'min-width: 250px' : null;

  return (
    <Ins
      className="adsbygoogle"
      data-ad-client={client}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-ad-slot={slot}
    />
  );
};

const Ins = styled.ins`
  display:block;
  text-align:center;
`;
