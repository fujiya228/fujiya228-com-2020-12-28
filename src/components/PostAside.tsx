import React from 'react';
import { css } from '@emotion/react';
import { Adsense } from '../components/Adsense';

export interface PostAsideProps {
  pathname: string;
}

export const PostAside: React.FC<PostAsideProps> = props => {
  const { pathname } = props;

  return (
    <aside id="post-aside" css={PostAsideStyle}>
      <div className="AdsContainer">
        <header>スポンサーリンク</header>
        <Adsense pathname={pathname} />
      </div>
    </aside>
  );
};

const PostAsideStyle = css`
  width: 30%;
  padding: 60px 8px 0 16px;

  @media (max-width: 840px) {
    display: none;
  }

  .AdsContainer {
    position: sticky;
    top: 72px;
    header {
      width: 100%;
      font-size: 12px;
      border-top: 3px solid #4e4e4e;
      padding: 8px 0 8px;
      font-weight: 700;
      text-align: center;
      color: #4e4e4e;
    }
  }
`;
