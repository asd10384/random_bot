import { client } from "../index";
import { Command } from "../interfaces/Command";
import { Message, EmbedBuilder, ApplicationCommandOptionType, ChatInputApplicationCommandData, CommandInteraction, GuildMember } from "discord.js";
import { positiontype, champions, positions } from "../random/valorant/champions";
// import { check_permission as ckper, embed_permission as emper } from "../utils/Permission";
// import { QDB } from "../databases/Quickdb";

/**
 * DB
 * let guildDB = await QDB.get(interaction.guild!);
 * 
 * check permission(role)
 * if (!(await ckper(interaction))) return await interaction.followUp({ embeds: [ emper ] });
 * if (!(await ckper(message))) return message.channel.send({ embeds: [ emper ] }).then(m => client.msgdelete(m, 1));
 */

export default class implements Command {
  /** 해당 명령어 설명 */
  name = "발로란트랜덤";
  visible = true;
  description = "발로란트 관련 랜덤";
  information = "발로란트 관련 랜덤";
  aliases: string[] = [ "valorant" ];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description,
    options: [
      {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: "캐릭터",
        description: "발로란트 캐릭터 랜덤",
        options: [
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "전체",
            description: "발로란트 캐릭터 전체 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "타격대",
            description: "발로란트 캐릭터 타격대 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "척후대",
            description: "발로란트 캐릭터 척후대 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "감시자",
            description: "발로란트 캐릭터 감시자 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "전략가",
            description: "발로란트 캐릭터 전략가 랜덤"
          }
        ]
      },
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "포지션",
        description: "발로란트 포지션 랜덤"
      }
    ]
  };
  msgmetadata?: { name: string; des: string; }[] = [
    {
      name: "캐릭터 [타격대|척후대|감시자|전략가]",
      des: "발로란트 캐릭터 랜덤"
    },
    {
      name: "포지션",
      des: "발로란트 포지션 랜덤"
    }
  ];

  /** 실행되는 부분 */
  async slashRun(interaction: CommandInteraction): Promise<any> {
    const cmd = interaction.options.data[0];
    if (cmd.name === "캐릭터") {
      const data = cmd.options ? cmd.options[0]?.name : undefined;
      if (data == "전체") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "전체") ] });
      if (data == "타격대") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "타격대") ] });
      if (data == "척후대") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "척후대") ] });
      if (data == "감시자") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "감시자") ] });
      if (data == "전략가") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "전략가") ] });
    }
    if (cmd.name == "포지션") return await interaction.followUp({ embeds: [ this.posi(interaction.member as GuildMember) ] });
  }
  async messageRun(message: Message, args: string[]) {
    if (args[0] == "캐릭터") {
      if (args[1] == "전체") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "전체") ] }).then(m => client.msgdelete(m, 3));
      if (args[1] == "타격대") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "타격대") ] }).then(m => client.msgdelete(m, 3));
      if (args[1] == "척후대") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "척후대") ] }).then(m => client.msgdelete(m, 3));
      if (args[1] == "감시자") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "감시자") ] }).then(m => client.msgdelete(m, 3));
      if (args[1] == "전략가") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "전략가") ] }).then(m => client.msgdelete(m, 3));
    }
    if (args[0] == "포지션") return message.channel.send({ embeds: [ this.posi(message.member!) ] }).then(m => client.msgdelete(m, 3));
    return message.channel.send({ embeds: [ this.help() ] }).then(m => client.msgdelete(m, 4));
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  async championsrandom(member: GuildMember, data: positiontype | "전체"): Promise<EmbedBuilder> {
    let list = [];
    if (data == "전체") {
      for (let i in champions) {
        list.push(...champions[i]);
      }
    } else {
      list.push(...champions[data]);
    }
    const r = Math.floor(Math.random()*list.length);
    const champion = list[r];
    return client.mkembed({
      author: { name: member.nickname || member.user.username, iconURL: member.displayAvatarURL({ forceStatic: false }) },
      url: `https://playvalorant.com/ko-kr/agents/${champion.id}`,
      title: `발로란트 랜덤 캐릭터: **${data}**`,
      description: `캐릭터: ${champion.name}`,
      thumbnail: data == "전체" ? "" : positions[data],
      image: champion.image
    });
  }

  posi(member: GuildMember): EmbedBuilder {
    let list: string[] = Object.keys(positions);
    const r = Math.floor(Math.random()*list.length);
    return client.mkembed({
      author: { name: member.nickname || member.user.username, iconURL: member.displayAvatarURL({ forceStatic: false }) },
      title: `발로란트 랜덤 포지션: ${list[r]}`,
      image: positions[list[r]]
    });
  }
}