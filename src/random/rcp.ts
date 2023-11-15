import { ButtonInteraction, GuildMember, InteractionResponse, Message } from "discord.js";
import { client } from "../index";

interface RcpUsers { id: string; name: string; hand: string; };

export var start = false;
var msg: Message | null = null;
var msg2: InteractionResponse | null = null;
var users: RcpUsers[] = [];

export const setStart = (s: boolean) => start = s;
export const setMsg = (message: Message | null) => {
  msg = message;
  if (message === null && msg2) {
    try {
      if (msg2) msg2.delete().catch((err) => {console.log(err)});
    } catch {}
    msg2 = null;
  }
};
const setMsg2 = (message: InteractionResponse | null) => msg2 = message;
export const setUsers = (u: RcpUsers[]) => users = u;

export const rcp = async (interaction: ButtonInteraction, cmd: string) => {
  const id = (interaction.member as GuildMember).user.id;
  const name = (interaction.member as GuildMember).nickname || (interaction.member as GuildMember).user.username;
  if (!start) return interaction.reply({ embeds: [ client.mkembed({
    author: { name: name },
    title: `가위바위보 오류`,
    description: `가위바위보가 시작되지 않았습니다.\n${client.prefix}가위바위보`,
    color: "DarkRed",
  }) ], fetchReply: false, ephemeral: true });

  if (users.length === 0) {
    users.push({
      id: id,
      name: name,
      hand: cmd === '1' ? "가위" : cmd === '2' ? "바위" : "보"
    });
    return interaction.reply({ embeds: [ client.mkembed({
      author: { name: name },
      title: `가위바위보 : ${name}`,
      description: `${name} 선택완료`,
    }) ], fetchReply: false, ephemeral: false }).then(m => {
      if (start) setMsg2(m);
      else setTimeout(() => {
        setMsg2(null);
        m.delete().catch(() => {});
      }, 10);
    });
  }

  
  if (users.filter(v => v.id === id).length > 0) return interaction.reply({ embeds: [ client.mkembed({
    author: { name: name },
    title: `가위바위보 오류`,
    description: `이미 선택하셨습니다.`,
  }) ], fetchReply: false, ephemeral: true });
  
  users[1] = {
    id: id,
    name: name,
    hand: cmd === '1' ? "가위" : cmd === '2' ? "바위" : "보"
  };

  const winner: RcpUsers | null = users[0].hand === "가위" ?
    users[1].hand === "가위" ? null
    : users[1].hand === "바위" ? users[1]
    : users[1].hand === "보" ? users[0]
    : null
  : users[0].hand === "바위" ?
    users[1].hand === "가위" ? users[0]
    : users[1].hand === "바위" ? null
    : users[1].hand === "보" ? users[1]
    : null
  : users[0].hand === "보" ?
    users[1].hand === "가위" ? users[1]
    : users[1].hand === "바위" ? users[0]
    : users[1].hand === "보" ? null
    : null
  : null;

  const embed = client.mkembed({
    author: { name: `${users[0].name} VS ${users[1].name}` },
    title: `가위바위보 결과`,
    description: `${users[0].name} : **${users[0].hand}**\n${users[1].name} : **${users[1].hand}**\n\n**승자 : ${winner ? winner.name : "무승부"}**`
  });

  if (msg) try {
    if (msg) msg.delete().catch(() => {});
  } catch {}

  setUsers([]);
  setMsg(null);
  setStart(false);

  return interaction.reply({ embeds: [ embed ], fetchReply: false, ephemeral: false }).then(m => {
    setTimeout(() => {
      try {
        m.delete().catch(() => {});
      } catch {}
    }, 1000 * 20);
  });
}