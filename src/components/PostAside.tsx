import React from 'react';
import { css } from '@emotion/react';
import TableOfContents from '../components/TableOfContents';

export interface PostAsideProps {
  pathname: string;
  headings?: Array<{
    id: string;
    depth: number;
    value: string;
  }>;
}

export const PostAside: React.FC<PostAsideProps> = props => {
  return (
    <aside id="post-aside" css={PostAsideStyle}>
      <div className="StickyContainer">
        <section>
          <header>スポンサーリンク</header>
          <div className="ads" />
        </section>
        <section>
          <header>目次</header>
          <TableOfContents headings={props.headings} />
        </section>
      </div>
    </aside>
  );
};

const PostAsideStyle = css`
  width: 30%;
  padding: 60px 0 0 24px;

  @media (max-width: 840px) {
    display: none;
  }

  .StickyContainer {
    position: sticky;
    top: 72px;
  }

  section {
    margin-bottom: 8px;
  }

  header {
    width: 100%;
    font-size: 12px;
    border-top: 3px solid #4e4e4e;
    padding: 8px 0 8px;
    font-weight: 700;
    text-align: center;
    color: #4e4e4e;
  }
`;
