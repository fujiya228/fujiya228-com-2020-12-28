import React from 'react';

import styled from '@emotion/styled';

import { colors } from '../styles/colors';
import { inner, outer } from '../styles/shared';
import { PageContext } from '../templates/post';
import { PostCard } from './PostCard';
import { ReadNextCard } from './ReadNextCard';

interface ReadNextProps {
  tags: string[];
  currentPageSlug: string;
  relatedPosts: {
    totalCount: number;
    edges: Array<{
      node: {
        timeToRead: number;
        frontmatter: {
          date: string;
          title: string;
        };
        fields: {
          slug: string;
        };
      };
    }>;
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export const ReadNext = ({ relatedPosts, currentPageSlug, tags, pageContext }: ReadNextProps) => {
  const showRelatedPosts = relatedPosts.totalCount > 1;

  return (
    <ReadNextAside className="read-next" css={outer}>
      <div css={inner}>
        <ReadNextFeed className="read-next-feed">
          {showRelatedPosts && (
            <ReadNextCard
              currentPageSlug={currentPageSlug}
              tags={tags}
              relatedPosts={relatedPosts}
            />
          )}

          {pageContext.prev && <PostCard post={pageContext.prev} />}
          {pageContext.next && <PostCard post={pageContext.next} />}
        </ReadNextFeed>
      </div>
    </ReadNextAside>
  );
};

const ReadNextAside = styled.aside`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  /* background: color(var(--darkgrey) l(-5%)); */
  /* background: ${colors.base}; */
  background: #fff;
`;

const ReadNextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -25px;
  padding: 60px 0 0 0;
`;
