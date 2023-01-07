
export type positiontype = "타격대" | "척후대" | "감시자" | "전략가";

export const positions: {
  [key: string]: string;
} = {
  "타격대": "duelist",
  "척후대": "initiator",
  "감시자": "sentinel",
  "전략가": "controller"
};