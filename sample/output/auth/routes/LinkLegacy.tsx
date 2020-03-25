import React from 'react';
import { generateUrl } from 'route-codegen';
import Link, { AnchorProps as OriginalLinkProps } from 'common/ui/Anchor';
import { patternLegacy } from './patternLegacy';
type LinkProps = Omit<OriginalLinkProps, 'href'>;
const LinkLegacy: LinkProps = ({ urlQuery, ...props }) => {
  const to = generateUrl(patternLegacy, {}, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkLegacy;
