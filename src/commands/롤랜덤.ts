import { client } from "../index";
import { Command } from "../interfaces/Command";
// import { Logger } from "../utils/Logger";
import { Message, EmbedBuilder, ApplicationCommandOptionType, ChatInputApplicationCommandData, CommandInteraction, GuildMember } from "discord.js";
// import { check_permission as ckper, embed_permission as emper } from "../utils/Permission";
// import { QDB } from "../databases/Quickdb";
import { random } from "../random/random";
import { getCharacters } from "../random/lol";

const role_list = [ "전체", "탑", "정글", "미드", "원딜", "서폿" ];
const camp_list = [ "레드", "블루" ];

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
  name = "롤랜덤";
  visible = true;
  description = "롤 랜덤";
  information = "롤 랜덤";
  aliases: string[] = [];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description,
    options: [
      {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: "캐릭터",
        description: "롤 랜덤 캐릭터",
        options: [
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "전체",
            description: "롤 랜덤 캐릭터 전체"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "탑",
            description: "롤 랜덤 캐릭터 탑"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "정글",
            description: "롤 랜덤 캐릭터 정글"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "미드",
            description: "롤 랜덤 캐릭터 미드"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "원딜",
            description: "롤 랜덤 캐릭터 원딜"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "서폿",
            description: "롤 랜덤 캐릭터 서폿"
          }
        ]
      },
      {
        type: ApplicationCommandOptionType.Subcommand,
        name: "진영",
        description: "롤 랜덤 진영"
      }
    ]
  };
  msgmetadata?: { name: string; des: string; }[] = [
    {
      name: "캐릭터 [전체|탑|정글|미드|원딜|서폿]",
      des: "롤 랜덤 캐릭터 [전체|탑|정글|미드|원딜|서폿]"
    },
    {
      name: "진영",
      des: "롤 랜덤 진영"
    }
  ];

  /** 실행되는 부분 */
  async slashRun(interaction: CommandInteraction) {
    const cmd = interaction.options.data[0];
    if (cmd.name === "캐릭터") return await interaction.followUp({ embeds: [ await this.character("캐릭터", cmd.options![0].name, interaction.member as GuildMember) ] });
    if (cmd.name === "진영") return await interaction.followUp({ embeds: [ await this.camp("진영", interaction.member as GuildMember) ] });
    return await interaction.followUp({ embeds: [ this.help() ] });
  }
  async messageRun(message: Message, args: string[]) {
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
    return message.channel.send({ embeds: [ this.help() ] }).then(m => client.msgdelete(m, 7));
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  async character(text: string, role: string, member: GuildMember): Promise<EmbedBuilder> {
    const { characters, err } = await getCharacters();
    const setCharacters = characters ? role === "전체" ? characters : characters.filter(v => v.role.includes(role)) : undefined;
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
      description: `[**[ OPGG 바로가기 ]**](https://www.op.gg/champions/${character.id}/build?region=kr)`,
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
}