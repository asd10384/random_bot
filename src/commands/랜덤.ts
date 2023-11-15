import { client } from "../index";
import { Command } from "../interfaces/Command";
// import { Logger } from "../utils/Logger";
import { Message, EmbedBuilder, ApplicationCommandOptionType, ChatInputApplicationCommandData, CommandInteraction, GuildMember } from "discord.js";
// import { check_permission as ckper, embed_permission as emper } from "../utils/Permission";
// import { QDB } from "../databases/Quickdb";
import { random } from "../random/random";

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
  name = "랜덤";
  visible = true;
  description = "랜덤";
  information = "랜덤";
  aliases: string[] = [];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description,
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "직접입력",
        description: ",로 나눠서 입력",
        minLength: 1,
        required: true
      }
    ]
  };
  msgmetadata?: { name: string; des: string; }[] = [
    {
      name: "<직접입력>",
      des: "띄어쓰기로 나눠서 입력"
    }
  ];

  /** 실행되는 부분 */
  async slashRun(interaction: CommandInteraction) {
    const cmd = interaction.options.data[0];
    if (!cmd.value) return await interaction.followUp({ embeds: [ client.mkembed({
      author: { name: (interaction.member as GuildMember).nickname || (interaction.member as GuildMember).user.username },
      title: `${this.name} 오류`,
      description: `/랜덤 <직접입력> <- 오류\n띄어쓰기로 나눠서 하나 이상 입력해주세요.`,
      color: "DarkRed"
    }) ] });
    if ((cmd.value as string).trim().includes(' ')) return await interaction.followUp({ embeds: [ await this.camp((cmd.value as string).trim().replace(/ +/g,' '), interaction.member as GuildMember) ] });
    return await interaction.followUp({ embeds: [ this.help() ] });
  }
  async messageRun(message: Message, args: string[]) {
    if (!args[0]) return message.channel.send({ embeds: [ client.mkembed({
      author: { name: message.member!.nickname || message.member!.user.username },
      title: `${this.name} 오류`,
      description: `${client.prefix}${this.name} <직접입력> <- 오류\n띄어쓰기로 나눠서 하나 이상 입력해주세요.`,
      color: "DarkRed"
    }) ] }).then(m => client.msgdelete(m, 1));
    if (args[0]) return message.channel.send({ embeds: [ await this.camp(args.join(' '), message.member!) ] }).then(m => client.msgdelete(m, 7));
    return message.channel.send({ embeds: [ this.help() ] }).then(m => client.msgdelete(m, 7));
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  async camp(data: string, member: GuildMember): Promise<EmbedBuilder> {
    const list = data.split(' ');
    const camp = list[random(list.length)];
    return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} : ${camp}`,
      description: `전체:\n${list.map((v, i) => `${i+1}. ${v}${v === camp ? ` (선택됨)` : ''}`).join('\n')}`
    });
  }
}