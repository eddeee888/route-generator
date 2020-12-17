/* This file was automatically generated with route-codegen and should not be edited. */
import React from "react";
import { generateUrl } from "@route-codegen/utils";
import { LinkProps, Link } from "react-router-dom";
import { patternUser, UrlPartsUser } from "./patternUser";
type LinkUserProps = Omit<LinkProps, "to"> & UrlPartsUser;
const LinkUser: React.FunctionComponent<LinkUserProps> = ({ path, query, origin, ...props }) => {
  const to = generateUrl(patternUser, path, query, origin);
  return <Link {...props} to={to} />;
};
export default LinkUser;
