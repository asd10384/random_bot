import request from "request";
import { load } from "cheerio";

let url = "https://www.op.gg/champions?hl=ko_KR";

export type postiontype = "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";

interface pagechampiontype {
  id: number;
  is_rotation: boolean;
  is_rip: boolean;
  average_stats: any;
  positions: {
    name: postiontype;
    stats: any;
    roles: { name: string; stats: any; }[];
    counters: { champion_id: number; play: number; win: number; }[];
  }[];
  roles: { name: string; stats: any; }[];
  image_url: string;
  name: string;
  display: boolean;
  key: string;
  positionWinRate: number;
  positionPickRate: number;
  positionBanRate: number;
  positionRoleRate: number;
  positionTierData: any;
  positionTier: number;
  positionRank: number;
  positionCounters: {
    name: string;
    img_url: string;
    key: string;
    champion_id: number;
    play: number;
    win: number;
  }[];
  href: string;
}

export interface championtype {
  id: number;
  key: string;
  name: string;
  image_url: string;
  position: postiontype;
}

export const champions = () => {
  return new Promise<championtype[]>((res, rej) => {
    request(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "cookie": "_ga_Y5593E5J0V=GS1.1.1669547706.1.0.1669547725.0.0.0; _ga_6G6B5VPJ90=GS1.1.1669547706.1.0.1669547725.0.0.0; _ga_9VCRVN44XE=GS1.1.1669900511.1.0.1669900511.0.0.0; _ga_CY1GGLJ03J=GS1.1.1669900511.1.0.1669900511.0.0.0; _oee=2022-11-06T05%3A25%3A00.000Z; _ab=false; _gid=GA1.2.701767375.1670645301; _pbjs_userid_consent_data=3524755945110770; __gads=ID=81b6dbe322e72868:T=1670645308:S=ALNI_MZbP4CE7I1BRWiZv2EZxVp9PZkPZg; __gpi=UID=00000b8d209502aa:T=1670645308:RT=1670645308:S=ALNI_MYxzUdyjUzeSq_8mIn381bI2qheYg; _otm=false; __qca=I0-979865781-1670646833721; _ga_HKZFKE5JEL=GS1.1.1670645301.2.1.1670646899.0.0.0; _ga_37HQ1LKWBE=GS1.1.1670645301.3.1.1670646899.0.0.0; _ga=GA1.2.2039204577.1669547694; _gat_gtag_UA_37377845_1=1; _dd_s=rum=0&expire=1670647818051; "
          + "_ol=ko-KR"
      }
    }, (err, _res, body) => {
      if (err) return rej(err);
      let $ = load(body);
      const champions_string = $("script#__NEXT_DATA__").text();
      const championsdata = JSON.parse(champions_string);
      const championsdatalist: pagechampiontype[] = championsdata?.props?.pageProps?.championMetaList;
      let champions: championtype[] = championsdatalist.map(data => {
        return {
          id: data.id,
          key: data.key,
          name: data.name,
          image_url: data.image_url,
          position: data.positions[0]?.name || ""
        };
      });
      return res(champions);
    });
  });
}