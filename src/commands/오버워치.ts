import { client } from "../index";
import { Command } from "../interfaces/Command";
import { Message, EmbedBuilder, ApplicationCommandOptionType, ChatInputApplicationCommandData, CommandInteraction, GuildMember } from "discord.js";
import { hero, Heros } from "../random/overwatch/Heros";
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
  name = "오버워치랜덤";
  visible = true;
  description = "오버워치 관련 랜덤";
  information = "오버워치 관련 랜덤";
  aliases: string[] = [ "overwatch" ];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description,
    options: [
      {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: "영웅",
        description: "오버워치 영웅 랜덤",
        options: [
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "전체",
            description: "오버워치 영웅 전체 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "탱커",
            description: "오버워치 영웅 탱커 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "딜러",
            description: "오버워치 영웅 딜러 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "힐러",
            description: "오버워치 영웅 힐러 랜덤"
          }
        ]
      },
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "포지션",
        description: "오버워치 포지션 랜덤"
      }
    ]
  };
  msgmetadata?: { name: string; des: string; }[] = [
    {
      name: "영웅 [전체|탱커|딜러|힐러]",
      des: "오버워치 영웅 랜덤"
    },
    {
      name: "포지션",
      des: "오버워치 포지션 랜덤"
    }
  ];

  /** 실행되는 부분 */
  async slashRun(interaction: CommandInteraction): Promise<any> {
    const cmd = interaction.options.data[0];
    if (cmd.name === "영웅") {
      const data = cmd.options ? cmd.options[0]?.name : undefined;
      if (data == "전체") return await interaction.followUp({ embeds: [ await this.hero(interaction.member as GuildMember, "all") ] });
      if (data == "탱커") return await interaction.followUp({ embeds: [ await this.hero(interaction.member as GuildMember, "tanks") ] });
      if (data == "딜러") return await interaction.followUp({ embeds: [ await this.hero(interaction.member as GuildMember, "damages") ] });
      if (data == "힐러") return await interaction.followUp({ embeds: [ await this.hero(interaction.member as GuildMember, "supports") ] });
    }
    if (cmd.name == "포지션") return await interaction.followUp({ embeds: [ this.posi(interaction.member as GuildMember) ] });
  }
  async messageRun(message: Message, args: string[]) {
    if (args[0] == "영웅") {
      if (args[1] == "전체") return message.channel.send({ embeds: [ await this.hero(message.member!, "all") ] }).then(m => client.msgdelete(m, 3));
      if (args[1] == "탱커") return message.channel.send({ embeds: [ await this.hero(message.member!, "tanks") ] }).then(m => client.msgdelete(m, 3));
      if (args[1] == "딜러") return message.channel.send({ embeds: [ await this.hero(message.member!, "damages") ] }).then(m => client.msgdelete(m, 3));
      if (args[1] == "힐러") return message.channel.send({ embeds: [ await this.hero(message.member!, "supports") ] }).then(m => client.msgdelete(m, 3));
    }
    if (args[0] == "포지션") return message.channel.send({ embeds: [ this.posi(message.member!) ] }).then(m => client.msgdelete(m, 3));
    return message.channel.send({ embeds: [ this.help() ] }).then(m => client.msgdelete(m, 4));
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  async hero(member: GuildMember, data: "all" | "tanks" | "damages" | "supports"): Promise<EmbedBuilder> {
    const heros = await Heros().catch(() => undefined);
    if (!heros) return client.mkembed({
      author: { name: member.nickname || member.user.username, iconURL: member.displayAvatarURL({ forceStatic: false }) },
      title: `영웅정보를 가져올수 없음`,
      color: "DarkRed"
    });
    let list: hero[] = [];
    if (data == "all") {
      for (let hero of heros.tanks) list.push(hero);
      for (let hero of heros.damages) list.push(hero);
      for (let hero of heros.supports) list.push(hero);
    } else {
      for (let hero of heros[data]) list.push(hero);
    }
    const r = Math.floor(Math.random()*list.length);
    const hero = list[r];
    return client.mkembed({
      title: `오버워치 랜덤 영웅: **${
        data == "all" ? "전체"
          : data == "tanks" ? "탱커"
          : data == "damages" ? "딜러"
          : "힐러"
      }**`,
      description: `영웅: ${hero.name}`,
      image: hero.image,
      footer: { text: hero.position, iconURL: hero.position_img }
    });
  }

  posi(member: GuildMember): EmbedBuilder {
    const list = [
      {
        name: "탱커",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Tank_icon.svg/2048px-Tank_icon.svg.png"
      },
      {
        name: "딜러",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Damage_icon.svg/228px-Damage_icon.svg.png"
      },
      {
        name: "힐러",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Support_icon.svg/228px-Support_icon.svg.png"
      }
    ]
    const r = Math.floor(Math.random()*list.length);
    return client.mkembed({
      author: { name: member.nickname || member.user.username, iconURL: member.displayAvatarURL({ forceStatic: false }) },
      title: `오버워치 랜덤 포지션: ${list[r].name}`,
      image: list[r].icon
    });
  }
}