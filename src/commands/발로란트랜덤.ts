import { client } from "../index";
import { Command } from "../interfaces/Command";
// import { Logger } from "../utils/Logger";
import { Message, EmbedBuilder, ApplicationCommandOptionType, ChatInputApplicationCommandData, CommandInteraction, GuildMember } from "discord.js";
// import { check_permission as ckper, embed_permission as emper } from "../utils/Permission";
// import { QDB } from "../databases/Quickdb";
import { random } from "../random/random";
import { getCharacters, getGuns, getMaps } from "../random/valorant";

const role_list = [ "전체", "타격대", "척후대", "전략가", "감시자" ];
const camp_list = [ "공격", "수비" ];

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
  name = "발로란트랜덤";
  visible = true;
  description = "발로란트 랜덤";
  information = "발로란트 랜덤";
  aliases: string[] = [ "발로란트" ];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description,
    options: [
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "맵",
        description: "발로란트 랜덤 맵"
      },
      {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: "캐릭터",
        description: "발로란트 랜덤 캐릭터",
        options: [
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "전체",
            description: "발로란트 랜덤 캐릭터 전체"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "타격대",
            description: "발로란트 랜덤 캐릭터 타격대"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "척후대",
            description: "발로란트 랜덤 캐릭터 척후대"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "전략가",
            description: "발로란트 랜덤 캐릭터 전략가"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "감시자",
            description: "발로란트 랜덤 캐릭터 감시자"
          }
        ]
      },
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "진영",
        description: "발로란트 랜덤 진영"
      },
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "총",
        description: "발로란트 랜덤 총"
      }
    ]
  };
  msgmetadata?: { name: string; des: string; }[] = [
    {
      name: "맵",
      des: "발로란트 랜덤 맵"
    },
    {
      name: "캐릭터 [전체|타격대|척후대|전략가|감시자]",
      des: "발로란트 랜덤 캐릭터 [전체|타격대|척후대|전략가|감시자]"
    },
    {
      name: "진영",
      des: "발로란트 랜덤 진영"
    },
    {
      name: "총",
      des: "발로란트 랜덤 총"
    }
  ];

  /** 실행되는 부분 */
  async slashRun(interaction: CommandInteraction) {
    const cmd = interaction.options.data[0];
    if (cmd.name === "맵") return await interaction.followUp({ embeds: [ await this.map("맵", interaction.member as GuildMember) ] });
    if (cmd.name === "캐릭터") return await interaction.followUp({ embeds: [ await this.character("캐릭터", cmd.options![0].name, interaction.member as GuildMember) ] });
    if (cmd.name === "진영") return await interaction.followUp({ embeds: [ await this.camp("진영", interaction.member as GuildMember) ] });
    if (cmd.name === "총") return await interaction.followUp({ embeds: [ await this.gun("총", interaction.member as GuildMember) ] });
    return await interaction.followUp({ embeds: [ this.help() ] });
  }
  async messageRun(message: Message, args: string[]) {
    if (args[0] === "랜덤") args = args.slice(1);
    if (args[0] === "맵") return message.channel.send({ embeds: [ await this.map(args[0], message.member!) ] }).then(m => client.msgdelete(m, 7));
    if (args[0] === "캐릭터") {
      if (!role_list.includes(args[1])) return message.channel.send({ embeds: [ client.mkembed({
        author: { name: message.member!.nickname || message.member!.user.username },
        title: `${this.name} 오류`,
        description: `${client.prefix}${this.name} ${args[0]} <포지션> <- 오류\n입력가능한포지션:${role_list.map((v, i) => `${i+1}. ${v}`).join("\n")}`,
        color: "DarkRed"
      }) ] }).then(m => client.msgdelete(m, 1));
      return message.channel.send({ embeds: [ await this.character(args[0], args[1], message.member!) ] }).then(m => client.msgdelete(m, 7));;
    }
    if (args[0] === "진영") return message.channel.send({ embeds: [ await this.camp(args[0], message.member!) ] }).then(m => client.msgdelete(m, 7));
    if (args[0] === "총") return message.channel.send({ embeds: [ await this.gun(args[0], message.member!) ] }).then(m => client.msgdelete(m, 7));
    return message.channel.send({ embeds: [ this.help() ] }).then(m => client.msgdelete(m, 7));
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  async map(text: string, member: GuildMember): Promise<EmbedBuilder> {
    const { maps, err } = await getMaps();
    const map = maps ? maps[random(maps.filter(v => v.normal).length)] : undefined;
    if (err || !maps || !map?.name) return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} 오류`,
      description: err || "오류발생",
      color: "DarkRed"
    });
    return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} ${text} : ${map.name}`,
      image: map.image
    });
  }

  async character(text: string, role: string, member: GuildMember): Promise<EmbedBuilder> {
    const { characters, err } = await getCharacters();
    const setCharacters = characters ? role === "전체" ? characters : characters.filter(v => v.role === role) : undefined;
    const character = setCharacters ? setCharacters[random(setCharacters.length)] : undefined;
    if (err || !characters || !character?.name) return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} 오류`,
      description: err || "오류발생",
      color: "DarkRed"
    });
    return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} ${text} : ${character.name}`,
      image: character.image
    });
  }

  async camp(text: string, member: GuildMember): Promise<EmbedBuilder> {
    const camp = camp_list[random(camp_list.length)];
    return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} ${text} : ${camp}`
    });
  }

  async gun(text: string, member: GuildMember): Promise<EmbedBuilder> {
    const { guns, err } = await getGuns();
    const gun = guns ? guns[random(guns.length)] : undefined;
    if (err || !guns || !gun?.name) return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} 오류`,
      description: err || "오류발생",
      color: "DarkRed"
    });
    return client.mkembed({
      author: { name: member.nickname || member.user.username },
      title: `${this.name} ${text} : ${gun.name}`,
      image: gun.image
    });
  }
}