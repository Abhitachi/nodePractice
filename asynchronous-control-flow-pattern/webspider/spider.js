import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";
import superagent from "superagent";
import { getPageLinks, urlToFileName } from "./utils.js";

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      cb(err);
    }
    fs.writeFile(filename, contents, cb); //invoke cb after writing file
  });
}

function download(url, filename, cb) {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text); //invoke cb after saving file
    });
  });
}

function spiderLinks(currentUrl, body, nesting, queue) {
  if (nesting === 0) {
    return;
  }
  const links = getPageLinks(currentUrl, body); //get links from the body
  console.log(links.length, "links found");
  console.log(links);
  if (links.length === 0) {
    return;
  }
  links.forEach((link) => spider(link, nesting - 1, queue)); //invoke spider for each link
}

function spiderTask(url, nesting, queue, done) {
  const filename = urlToFileName(url);
  fs.readFile(filename, "utf-8", (err, fileContent) => {
    if (err) {
      if (err.code !== "ENOENT") {
        return done(err);
      }
      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }
        spiderLinks(url, requestContent, nesting, queue); //invoke spiderLinks after downloading
        return done();
      });
    }
    spiderLinks(url, fileContent, nesting, queue);
    done();
  });
}

const spidering = new Set();
export function spider(url, nesting, queue) {
  if (spidering.has(url)) {
    return;
  }
  spidering.add(url);
  queue.pushTask((done) => {
    spiderTask(url, nesting, queue, done);
  });
}
