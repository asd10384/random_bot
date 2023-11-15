import { client } from "../index";
import { Command } from "../interfaces/Command";
// import { Logger } from "../utils/Logger";
import { Message, EmbedBuilder, ChatInputApplicationCommandData, CommandInteraction, GuildMember } from "discord.js";
// import { check_permission as ckper, embed_permission as emper } from "../utils/Permission";
// import { QDB } from "../databases/Quickdb";
import { random } from "../random/random";

const dice_list = [ 1, 2, 3, 4, 5, 6 ];

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
  name = "주사위";
  visible = true;
  description = "주사위";
  information = "주사위";
  aliases: string[] = [];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description
  };
  msgmetadata?: { name: string; des: string; }[] = undefined;

  /** 실행되는 부분 */
  async slashRun(interaction: CommandInteraction) {
    return await interaction.followUp({ embeds: [ await this.dice(interaction.member as GuildMember) ] });
  }
  async messageRun(message: Message, _args: string[]) {
    return message.channel.send({ embeds: [ await this.dice(message.member!) ] }).then(m => client.msgdelete(m, 7));
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  async dice(member: GuildMember): Promise<EmbedBuilder> {
    const camp = dice_list[random(dice_list.length)];
    return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `주사위`,
      image: `https://kr.web-dice.com/img/white/${camp}.png`
    });
  }
}