import axios from "axios";

export const getMaps = (): Promise<{ maps?: { uuid: string; name: string; image: string; normal: boolean; }[]; err?: string; }> => axios.get(`https://valorant-api.com/v1/maps?language=ko-KR`, {
  responseType: "json"
}).then((val) => {
  if (val.data.status !== 200 || !val.data.data) return { err: "오류1" };
  return { maps: val.data.data.map((v: any) => {
    return {
      uuid: v.uuid,
      name: v.displayName,
      image: v.splash,
      normal: !!v.tacticalDescription
    }
  }) };
}).catch((err) => {
  return { err: err.response.data.error || "오류2" };
});

export const getCharacters = (): Promise<{ characters?: { uuid: string; name: string; image: string; role: string; }[]; err?: string; }> => axios.get(`https://valorant-api.com/v1/agents?language=ko-KR&isPlayableCharacter=true`, {
  responseType: "json"
}).then((val) => {
  if (val.data.status !== 200 || !val.data.data) return { err: "오류1" };
  return { characters: val.data.data.map((v: any) => {
    return {
      uuid: v.uuid,
      name: v.displayName,
      image: v.displayIcon,
      role: v.role.displayName
    }
  }) };
}).catch((err) => {
  return { err: err.response.data.error || "오류2" };
});

export const getGuns = (): Promise<{ guns?: { uuid: string; name: string; image: string; }[]; err?: string; }> => axios.get(`https://valorant-api.com/v1/weapons?language=ko-KR`, {
  responseType: "json"
}).then((val) => {
  if (val.data.status !== 200 || !val.data.data) return { err: "오류1" };
  return { guns: val.data.data.map((v: any) => {
    return {
      uuid: v.uuid,
      name: v.displayName,
      image: v.displayIcon
    }
  }) };
}).catch((err) => {
  return { err: err.response.data.error || "오류2" };
});