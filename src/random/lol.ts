import axios from "axios";
import { load } from "cheerio";

export const getLatestVersion = (): Promise<{ version?: string; err?: string; }> => axios.get(`https://ddragon.leagueoflegends.com/api/versiodns.json`, {
  responseType: "json"
}).then((val) => {
  if (!val.data) return { err: "버전을 불러올수 없음1" };
  return { version: val.data[0] };
}).catch(() => {
  return { err: "버전을 불러올수 없음2" };
});

interface Character {
  id: string;
  role: string[];
  name: string;
  image: string;
}

export const getCharacters = () => new Promise<{ characters?: Character[]; err?: string; }>(async (res) => {
  await axios.get(`https://www.op.gg/champions?region=kr&tier=emerald_plus`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      "cookie": "_ol=ko_KR;"
    },
    responseType: "document"
  }).then((val) => {
    const $ = load(val.data);
    let text = $('#__NEXT_DATA__').text();
    if (!text || !(text.startsWith("{") && text.endsWith("}"))) return res({ err: "캐릭터를 불러올수 없음1" });
    let data: {[key: string]: any;} = {};
    try {
      data = JSON.parse(text);
    } catch {
      return res({ err: "캐릭터를 불러올수 없음2" });
    }
    if (data.props?.pageProps?.error) return res({ err: data.props?.pageProps?.error || "캐릭터를 불러올수 없음3" });
    if (!data.props?.pageProps?.championMetaList) return res({ err: "캐릭터를 불러올수 없음4" });
    return res({ characters: data.props.pageProps.championMetaList.map((v: any) => {
      return {
        id: v.key,
        role: v.positions.map((v2: any) => v2.name === "TOP" ? "탑" : v2.name === "JUNGLE" ? "정글" : v2.name === "MID" ? "미드" : v2.name === "ADC" ? "원딜" : v2.name === "SUPPORT" ? "서폿" : "").filter((v2: any) => !!v2),
        name: v.name,
        image: v.image_url
      }
    }) });
  }).catch(() => {
    return res({ err: "캐릭터를 불러올수 없음-1" });
  });
});