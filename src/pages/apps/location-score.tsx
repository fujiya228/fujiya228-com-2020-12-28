import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import { Helmet } from 'react-helmet';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

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
import { Adsense } from '../../components/Adsense';

export interface LocationScoreProps {
  pathname: string;
  data: {
    header: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
  };
}
interface LocationScoreState {
  mapLat: number;
  mapLng: number;
}

const containerStyle = {
  width: '100%',
  height: '50vh',
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

const circleOptions = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 500,
  zIndex: 1,
};

const app_config = {
  title: 'みんなのi18n',
  description: 'internationalization ＝＞ i18n や localization ＝＞ l10n といった変換をしてくれるアプリケーション',
};

const LocationScore: React.FC<LocationScoreProps> = props => {
  const { width, height } = props.data.header.childImageSharp.fixed;
  const [state, setState] = useState<LocationScoreState>({ mapLat: 0, mapLng: 0 });
  const pathname = '/abbreviation-to-a10n';
  const appURL = `${config.siteUrl}${pathname}`;

  const [map, setMap] = useState<any>();

  const onLoad = (mapInstance: any) => {
    setMap(mapInstance);
    setState({ mapLat: mapInstance.center.lat(), mapLng: mapInstance.center.lng() });
  };

  const mapMoveStart = () => {
    setState({ mapLat: 0, mapLng: 0 });
  };

  const mapMove = () => {
    setState({ mapLat: map.center.lat(), mapLng: map.center.lng() });
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
                    <LoadScript googleMapsApiKey="AIzaSyBLLxwnSdKnQFDAapcGqMjBhbxz0yUknAg">
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={onLoad}
                        onDragStart={mapMoveStart}
                        onDrag={mapMove}
                      >
                        <Circle center={{ lat: state.mapLat, lng: state.mapLng }} radius={500} options={circleOptions} />
                      </GoogleMap>
                    </LoadScript>
                    <p><label>緯度</label><span className="text">{Math.floor(state.mapLat * 100000) / 100000}</span></p>
                    <p><label>経度</label><span className="text">{Math.floor(state.mapLng * 100000) / 100000}</span></p>
                    <div className="share">
                      <TwitterShareButton title="title" via={app_config.title} url={appURL} hashtags={[app_config.title]}>
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

export default LocationScore;
