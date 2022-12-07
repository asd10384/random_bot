import request from "request";
import { load } from "cheerio";

let url = "https://overwatch.blizzard.com/ko-kr/heroes/";

export interface hero {
  name: string;
  position: "tank" | "damage" | "support";
  position_img: string;
  image: string;
}

export const Heros = () => {
  return new Promise<{ tanks: hero[], damages: hero[], supports: hero[] }>((res, rej) => {
    request(url, {}, (err, _res, body) => {
      if (err) return rej(err);
      let $ = load(body);
      const elems = $("div.main-content blz-media-gallery blz-hero-card").toArray();
      let tanks: hero[] = [];
      let damages: hero[] = [];
      let supports: hero[] = [];
      elems.map((elem) => {
        const $ = load(elem);
        const name = $("div span").text();
        const position = elem.attribs["data-role"];
        const img = $("blz-image").attr("src");
        if (name) {
          if (position == "tank") tanks.push({
            name: name,
            position: position,
            position_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Tank_icon.svg/2048px-Tank_icon.svg.png",
            image: img || ""
          });
          if (position == "damage") damages.push({
            name: name,
            position: position,
            position_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Damage_icon.svg/228px-Damage_icon.svg.png",
            image: img || ""
          });
          if (position == "support") supports.push({
            name: name,
            position: position,
            position_img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Support_icon.svg/228px-Support_icon.svg.png",
            image: img || ""
          });
        }
      });
      return res({
        tanks,
        damages,
        supports
      });
    });
  });
}