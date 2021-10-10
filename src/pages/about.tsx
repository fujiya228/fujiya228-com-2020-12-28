import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>About</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome />
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">About</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <p>
                  21卒Webエンジニア / 個人開発 / セルフマネジメント<br />Vue.js , Firebaseでいろいろ作るのが好きです！
                </p>
                <p>
                  最近は、知識をどうやったら効率よくまとめて、引き出せるか悩んでいます。<br />Notionにメモとしてまとめていましたが、階層構造が深くなるにつれてアクセスするのが大変になってきました。
                </p>
                <p>
                  そこで、あらかじめ視覚的に整理しておくことでアクセスしやすくなるのでは？と考えて作ってみたのが<a href="https://fujiya-knowledge-map.web.app">こちら</a>です。
                </p>
                <p>
                  書籍以外にも動画などで様々な情報が得られる時代ですが、得た情報を自分なりにまとめて整理し知識とすることは必須であり重要だと考えています。
                </p>
                <p>
                  「人間の新しい外部記憶装置」として、情報を即座に、整理して、アクセスできて、思い出せるようなアプリケーションにすることが目標です！
                </p>
                <h2>これからやりたいこと</h2>
                <p>
                  まだまだ駆け出したばかりですので、様々なことに興味があります。
                </p>
                <p>
                  が、将来的には様々なサービスを素早く作って成長させていきたいので、
                  フロントエンド、バックエンド、インフラの全体的なことを学ぶことはもちろん、
                  どのように開発・運用していくか？といった部分を考えていきたいです！
                </p>
                <p>
                  直近ではマイクロサービスアーキテクチャについての理解を深めたいので、個人的に簡単なサービスを作ってみたいと考えています！
                </p>
                <h2>経歴</h2>
                <iframe seamless width="100%" height="500px" frameBorder="0" src="https://app.the-timeline.jp/2PACX-1vTwcswVhvoJu3AwKeEJ_Jt0jeZjQINh0wOmSceqiyuKwYlfwu9Fm4vcnLhFQt4_QQhcU5CugiH_YO0d" />
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
