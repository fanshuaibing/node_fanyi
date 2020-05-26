import * as https from "https";
import * as querystring from "querystring";
import { appId, appSecret } from "./private";
import md5 from "md5";
export const translate = (word: string) => {
  console.log(word);
  const salt = Math.random();
  const sign = md5(appId + word + salt + appSecret);
  const query = querystring.stringify({
    q: word,
    appid: appId,
    salt,
    sign,
    from: "en",
    to: "zh",
  });
  let from, to;

  const options = {
    hostname: "api.fanyi.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let chunks: Buffer[] = [];

    response.on("data", (chunk) => {
      chunks.push(chunk);
    });
    response.on("end", () => {
      const string = Buffer.concat(chunks).toString();
      const object = JSON.parse(string);
      console.log(object);
    });
  });

  request.on("error", (e) => {
    console.error(e);
  });
  request.end();
};
