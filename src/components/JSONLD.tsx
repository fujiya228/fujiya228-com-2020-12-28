import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FixedObject } from 'gatsby-image';

import config from '../website-config';

interface JSONLDProps {
  postData?: {
    title: string;
    slug: string;
    category: string;
    date: string;
    image: string;
  };
}

interface LogoProps {
  logo?: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
  orgImage?: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

export const Jsonld = (props: JSONLDProps) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "img/logo.fin.png" }) {
          childImageSharp {
            fixed(quality: 100 width: 500) {
              ...GatsbyImageSharpFixed
            }
          }
        },
        orgImage: file(relativePath: { eq: "img/organization.png" }) {
          childImageSharp {
            fixed(quality: 100 width: 500) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(logos: LogoProps) => {
      const postData = props.postData ? props.postData : null;
      const title = postData ? postData.title + ' | ' + config.title : config.title;

      // ブログ発行者（自分）
      const publisher = {
        '@type': 'Organization',
        name: config.organization,
        description: config.orgDescription,
        logo: {
          '@type': 'ImageObject',
          url: logos.orgImage?.childImageSharp.fixed.src,
          width: 60,
          height: 60,
        },
      };

      // コンテンツの投稿者（現状自分一人なのでこのままで）
      // TODO: いつか投稿者別のコードも作っておきたい
      const author = {
        '@type': 'Person',
        name: config.organization,
        description: config.orgDescription,
        image: {
          '@type': 'ImageObject',
          url: logos.orgImage?.childImageSharp.fixed.src,
          width: 60,
          height: 60,
        },
        url: config.siteUrl,
        sameAs: [
          config.facebook,
          config.twitter,
        ],
      };

      // ページの内容
      const about = {
        '@type': 'thing',
        name: config.organization,
        url: config.siteUrl,
        sameas: config.siteUrl + '/about',
        image: {
          '@type': 'ImageObject',
          url: logos.logo?.childImageSharp.fixed.src,
        },
      };

      // JSON+LDの設定
      const jsonLdConfigs: any = [
        {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          about,
          publisher,
          author,
          inLanguage: 'ja',
          url: config.siteUrl,
          name: config.title,
          alternateName: config.title,
          image: {
            '@type': 'ImageObject',
            url: logos.logo?.childImageSharp.fixed.src,
          },
          description: config.description,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${config.siteUrl}/search?q={q}`,
            'query-input': 'required name=q',
          },
        },
      ];

      if (postData) {
        // パンくずリスト表示用の設定
        const itemListElement = [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: config.siteUrl,
          },
        ];
        // カテゴリーがあれば追加
        if (postData.category !== '') {
          itemListElement.push({
            '@type': 'ListItem',
            position: itemListElement.length + 1,
            name: postData.category,
            item: config.siteUrl + '/categories/' + postData.category,
          });
        }

        // 投稿を追加
        itemListElement.push({
          '@type': 'ListItem',
          position: itemListElement.length + 1,
          name: postData.title,
          item: config.siteUrl + postData.slug,
        });
        // jsonLD全体に追加
        jsonLdConfigs.push({
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement,
        });

        // BlogPosting
        jsonLdConfigs.push({
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: config.siteUrl + postData.slug,
          name: title,
          alternateName: config.title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: postData.image,
          },
          // description,
          datePublished: postData.date,
          dateModified: postData.date,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': config.siteUrl,
          },
          author,
          publisher,
        });

        // Article(Article or NewsArticle or BlogPosting らしいからこっちも入れておいた)
        jsonLdConfigs.push({
          '@context': 'http://schema.org',
          '@type': 'Article',
          headline: title,
          datePublished: postData.date,
          dateModified: postData.date,
          image: {
            '@type': 'ImageObject',
            url: postData.image,
          },
        });
      }

      return (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(jsonLdConfigs)}</script>
        </Helmet>
      );
    }}
  />
);
