import { Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from '../styles/colors';

export interface PaginationProps {
  currentPage: number;
  numPages: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const numLinks = numPages <= 5 ? numPages : 5;
  const prevPage = currentPage - 1 === 1 ? '/' : '/' + (currentPage - 1).toString();
  const nextPage = '/' + (currentPage + 1).toString();
  let numStart = 1;

  if (numPages > 5) {
    if (currentPage > 3) {
      numStart = currentPage + 2 >= numPages ? numPages - 4 : currentPage - 2;
    }
  }

  return (
    <nav css={navCss}>
      <div>
        {!isFirst && (
          <Link to={prevPage} rel="prev" className="prev">
            <ArrowIcon />
          </Link>
        )}

        {Array.from({ length: numLinks }, (_, i) => (
          <Link key={`pagination-number${i + numStart}`} className={i + numStart === currentPage ? 'active' : ''} to={`/${i + numStart === 1 ? '' : i + numStart}`}>
            {i + numStart}
          </Link>
        ))}

        {!isLast && (
          <Link to={nextPage} rel="next" className="next">
            <ArrowIcon />
          </Link>
        )}
      </div>
    </nav>
  );
};

const navCss = css`
  text-align: center;
  div {
    display: flex;
    justify-content: center;
    padding: 0 0 40px;
  }

  a {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell;
    background: #fff;
    color: black;
    float: left;
    padding: 0 8px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #ddd;
    margin: 0 4px;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    line-height: 46px;

    &.active {
      boder: 1px solid ${colors.base};
      background: ${colors.base};
      color: #fff;
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }

    &:hover {
      text-decoration: none;
    }
  }

  
  .prev {
    transform: rotate(-45deg);
    display: none;
    @media (min-width: 480px) {
      display: inline;
    }
  }

  .next {
    transform: rotate(135deg);
    display: none;
    @media (min-width: 480px) {
      display: inline;
    }
  }
`;

const ArrowIcon = styled.i`
  display: block;
  position: relative;
  top: 16px;
  width: 13.2px;
  height: 4px;
  margin: 0 auto;
  border-radius: 2px;
  background: ${colors.base};
  transition: .3s ease-in-out;
  &::before {
    display: block;
    position: absolute;
    width: 13.2px;
    height: 4px;
    margin: 0 auto;
    transform: rotate(90deg);
    transform-origin: 2px;
    border-radius: 2px;
    background: ${colors.base};
    content: '';
  }
`;

export default Pagination;
