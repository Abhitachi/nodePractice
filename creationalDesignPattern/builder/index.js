import { UrlBuilder } from "./url.js";

const url = new UrlBuilder()
  .setProtocol("https")
  .setAuthentication("admin", "admin")
  .setHostname("example.com")
  .setPort("8080")
  .setPathname("/path/to/resource")
  .setSearch("peace=peace")
  .setHash("section")
  .build();

console.log(url.toString());
