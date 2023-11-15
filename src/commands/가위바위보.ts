import { client } from "../index";
import { Command } from "../interfaces/Command";
// import { Logger } from "../utils/Logger";
import { Message, EmbedBuilder, ChatInputApplicationCommandData, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
// import { check_permission as ckper, embed_permission as emper } from "../utils/Permission";
// import { QDB } from "../databases/Quickdb";
import { start, setStart, setMsg, setUsers } from "../random/rcp";

/**
 * DB
 * let GDB = await QDB.get(interaction.guild!);
 * 
 * check permission(role)
 * if (!(await ckper(interaction))) return await interaction.followUp({ embeds: [ emper ] });
 * if (!(await ckper(message))) return (message.channel as TextChannel).send({ embeds: [ emper ] }).then(m => client.msgdelete(m, 1));
 */

export default class implements Command {
  /** 해당 명령어 설명 */
  name = "가위바위보";
  visible = true;
  description = "가위바위보";
  information = "가위바위보";
  aliases: string[] = [];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description
  };
  msgmetadata?: { name: string; des: string; }[] = undefined;

  /** 실행되는 부분 */
  async messageRun(message: Message, _args: string[]) {
    if (start) return message.channel.send({ embeds: [ client.mkembed({
      author: { name: message.member!.nickname || message.member!.user.username },
      title: `${this.name} 오류`,
      description: `이미 게임이 진행중입니다.`,
      color: "DarkRed"
    }) ] }).then(m => client.msgdelete(m, 1));
    setStart(true);
    return message.channel.send(this.rcp(message.member!)).then(m => {
      setMsg(m);
      setTimeout(() => {
        setMsg(null);
        setUsers([]);
        setStart(false);
        try {
          m.delete().catch(() => {});
        } catch {}
      }, 1000 * 20);
    });
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  rcp(member: GuildMember) {
    const embed = client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name}`,
      description: `두사람이 선택하면 결과가 나옵니다.`
    });
    return { embeds: [ embed ], components: [ this.makeButton() ] };
  }

  makeButton() {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
      .setCustomId("rcp-1")
      .setLabel("가위")
      .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
      .setCustomId("rcp-2")
      .setLabel("바위")
      .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
      .setCustomId("rcp-3")
      .setLabel("보")
      .setStyle(ButtonStyle.Primary),
    );
  }
}