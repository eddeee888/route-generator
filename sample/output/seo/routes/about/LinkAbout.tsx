/* This file was automatically generated with route-codegen and should not be edited. */
import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { LinkProps } from 'next/link';
import { patternAbout, UrlPartsAbout, patternNextJSAbout } from './patternAbout';
type LinkAboutProps = Omit<LinkProps, 'href'> & UrlPartsAbout;
const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, path, urlQuery);
  return <Link {...props} href={patternNextJSAbout} as={to} />;
};
export default LinkAbout;
