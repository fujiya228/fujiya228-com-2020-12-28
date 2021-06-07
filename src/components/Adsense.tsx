import React, { useEffect } from 'react';
import styled from '@emotion/styled';

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
  const format = 'auto';
  const slot = '9106982372';

  return (
    <Ins
      className="adsbygoogle"
      data-ad-client={client}
      data-ad-format={format}
      data-ad-slot={slot}
      data-full-width-responsive="true"
    />
  );
};

const Ins = styled.ins`
  display:block;
  text-align:center;
  min-width: 250px;
`;
