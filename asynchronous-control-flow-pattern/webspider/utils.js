import * as cheerio from "cheerio";
import path from "path";
import slug from "slug";
import { URL } from "url";

// function getLinkUrl
function getLinksUrl(currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || "", currentUrl);
  console.log(parsedLink, "links");
  const currentParsedUrl = new URL(currentUrl);
  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }
  return parsedLink.toString();
}

export function urlToFileName(url) {
  const parsedUrl = new URL(url); //creates a browser compatible url object
  const urlPath = parsedUrl.pathname
    .split("/") //get the pathname from the url and split it into an array
    .filter((component) => component !== "")
    .map((component) => slug(component, { remove: null })) //remove any empty strings and slugify the components
    .join("/");
  let filename = path.join(parsedUrl.hostname, urlPath); //join the hostname and the url path
  if (!path.extname(filename).match("/html/")) {
    filename += ".html";
  }
  return filename;
}

// function getPageLinks
export function getPageLinks(currentUrl, body) {
  return Array.from(cheerio.load(body)("a"))
    .map((element) => getLinksUrl(currentUrl, element))
    .filter(Boolean);
}
