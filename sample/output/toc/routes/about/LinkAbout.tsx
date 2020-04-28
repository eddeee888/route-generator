/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import generateUrl from "route-codegen/generateUrl";
import Link, { AnchorProps } from "src/common/ui/Anchor";
import { patternAbout, UrlPartsAbout } from "./patternAbout";
type LinkAboutProps = Omit<AnchorProps, "href"> & UrlPartsAbout;
const LinkAbout: React.FunctionComponent<LinkAboutProps> = ({ path, urlQuery, ...props }) => {
  const to = generateUrl(patternAbout, path, urlQuery);
  return <Link {...props} href={to} />;
};
export default LinkAbout;
