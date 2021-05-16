import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import { Helmet } from 'react-helmet';
import { TwitterIcon, TwitterShareButton } from 'react-share';

import { css } from '@emotion/react';

import { Footer } from '../../components/Footer';
import SiteNav from '../../components/header/SiteNav';
import { PostFullContent } from '../../components/PostContent';
import { Wrapper } from '../../components/Wrapper';
import IndexLayout from '../../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../../templates/post';
import { colors } from '../../styles/colors';

import config from '../../website-config';
import { abbreviation } from '../../utils/hira-to-alpha';
import { Adsense } from '../../components/Adsense';

export interface AbbreviationProps {
  data: {
    header: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
  };
}
interface AbbreviationState {
  inputStr: string;
  outputStr: string;
  alphaStr: string;
}

const app_config = {
  title: 'みんなのi18n',
  description: 'internationalization ＝＞ i18n や localization ＝＞ l10n といった変換をしてくれるアプリケーション',
};

const Abbreviation: React.FC<AbbreviationProps> = props => {
  const { width, height } = props.data.header.childImageSharp.fixed;
  const [state, setState] = useState<AbbreviationState>({ inputStr: 'ヤマダたろう', alphaStr: 'yamadatarou', outputStr: 'y9u' });
  const { pathname } = location;
  const appURL = config.siteUrl + pathname;

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [alpha, output] = abbreviation(e?.target?.value);
    setState({ inputStr: e?.target?.value, outputStr: output, alphaStr: alpha });
  };

  return (
    <IndexLayout>
      <Helmet>
        <title>{app_config.title}</title>
        <meta name="description" content={app_config.description} />
        <meta property="og:site_name" content={app_config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={app_config.title} />
        <meta property="og:description" content={app_config.description} />
        <meta property="og:url" content={appURL} />
        <meta
          property="og:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && (
          <meta name="google-site-verification" content={config.googleSiteVerification} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={app_config.title} />
        <meta name="twitter:description" content={app_config.description} />
        <meta name="twitter:url" content={appURL} />
        <meta
          name="twitter:image"
          content={`${config.siteUrl}${props.data.header.childImageSharp.fixed.src}`}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width.toString()} />
        <meta property="og:image:height" content={height.toString()} />
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
                <PostFullTitle className="post-full-title">みんなのi18n | 省略化アプリケーション</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <div css={AppContent}>
                    <p>internationalization ＝＞ i18n や localization ＝＞ l10n といった変換をしてくれるアプリケーションです。<br />ひらがな、カタカナもある程度対応しました。（「っ」や「ー」、記号など一部変換できません。）</p>
                    <p><label>入力</label><input className="text" type="text" value={state.inputStr} onChange={inputChange} /></p>
                    <p><label>アルファベット</label><input readOnly className="text output" type="text" value={state.alphaStr} /></p>
                    <p><label>省略結果</label><input readOnly className="text output" type="text" value={state.outputStr} /></p>
                    <div className="share">
                      <TwitterShareButton title={`${state.inputStr} => ${state.outputStr}`} via={app_config.title} url={appURL} hashtags={[app_config.title]}>
                        <TwitterIcon size={32} borderRadius={4} />
                        <span>シェアする</span>
                      </TwitterShareButton>
                    </div>
                  </div>
                </div>
              </PostFullContent>
              <Adsense pathname={pathname} />
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout >
  );
};

export const pageQuery = graphql`
  query {
    header: file(relativePath: { eq: "img/logo.fin.png" }) {
      childImageSharp {
        fixed(width: 2000, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

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

const AppContent = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  label {
    display: inline-block;
    width: 200px;
  }
  .text {
    width: 200px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px black;
  }
  .output {
    background: #eee;
  }
  .share {
    width: 160px;
    margin: 0 auto;
    border-radius: 4px;
    background: #00aced;
    color:white;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    line-height: 32px;
    transition: .3s ease-in-out;
    &:hover {
      opacity: 0.6;
    }
    button {
      width: 100%;
    }
  }
`;

export default Abbreviation;
