import { client } from "../index";
import { Command } from "../interfaces/Command";
import { Message, EmbedBuilder, ApplicationCommandOptionType, ChatInputApplicationCommandData, CommandInteraction, GuildMember } from "discord.js";
// import { check_permission as ckper, embed_permission as emper } from "../utils/Permission";
// import { QDB } from "../databases/Quickdb";
import { champions, championtype, postiontype } from "../random/lol/champions";

/**
 * DB
 * let guildDB = await QDB.get(interaction.guild!);
 * 
 * check permission(role)
 * if (!(await ckper(interaction))) return await interaction.followUp({ embeds: [ emper ] });
 * if (!(await ckper(message))) return message.channel.send({ embeds: [ emper ] }).then(m => client.msgdelete(m, 1));
 */

/** 예시 명령어 */
export default class implements Command {
  /** 해당 명령어 설명 */
  name = "롤";
  visible = true;
  description = "롤 관련 랜덤";
  information = "롤 관련 랜덤";
  aliases: string[] = [ "lol" ];
  metadata: ChatInputApplicationCommandData = {
    name: this.name,
    description: this.description,
    options: [
      {
        type: ApplicationCommandOptionType.SubcommandGroup,
        name: "캐릭터",
        description: "캐릭터 관련 랜덤",
        options: [
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "전체",
            description: "전체 캐릭터 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "탑",
            description: "탑 캐릭터 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "정글",
            description: "정글 캐릭터 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "미드",
            description: "정글 캐릭터 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "바텀",
            description: "바텀 캐릭터 랜덤"
          },
          {
            type: ApplicationCommandOptionType.Subcommand,
            name: "서폿",
            description: "서폿 캐릭터 랜덤"
          }
        ]
      }
    ]
  };
  msgmetadata?: { name: string; des: string; }[] = [
    {
      name: "캐릭터 [전체|탑|정글|미드|바텀|서폿]",
      des: "[전체|탑|정글|미드|바텀|서폿] 캐릭터 랜덤"
    }
  ];

  /** 실행되는 부분 */
  async slashRun(interaction: CommandInteraction) {
    const cmd = interaction.options.data[0];
    if (cmd.name === "캐릭터") {
      const data = cmd.options ? cmd.options[0]?.name : undefined;
      if (data == "전체") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "ALL") ] });
      if (data == "탑") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "TOP") ] });
      if (data == "정글") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "JUNGLE") ] });
      if (data == "미드") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "MID") ] });
      if (data == "바텀") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "ADC") ] });
      if (data == "서폿") return await interaction.followUp({ embeds: [ await this.championsrandom(interaction.member as GuildMember, "SUPPORT") ] });
    }
    return;
  }
  async messageRun(message: Message, args: string[]) {
    if (args[0] == "캐릭터") {
      if (args[1] == "전체") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "ALL") ] }).then(m => client.msgdelete(m, 4));
      if (args[1] == "탑") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "TOP") ] }).then(m => client.msgdelete(m, 4));
      if (args[1] == "정글") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "JUNGLE") ] }).then(m => client.msgdelete(m, 4));
      if (args[1] == "미드") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "MID") ] }).then(m => client.msgdelete(m, 4));
      if (args[1] == "바텀") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "ADC") ] }).then(m => client.msgdelete(m, 4));
      if (args[1] == "서폿") return message.channel.send({ embeds: [ await this.championsrandom(message.member!, "SUPPORT") ] }).then(m => client.msgdelete(m, 4));
    }
    return message.channel.send({ embeds: [ this.help() ] }).then(m => client.msgdelete(m, 6));
  }

  help(): EmbedBuilder {
    return client.help(this.metadata.name, this.metadata, this.msgmetadata)!;
  }

  async championsrandom(member: GuildMember, postion: postiontype | "ALL") {
    const getchampions = await champions().catch(() => {
      return undefined;
    });
    if (!getchampions) return client.mkembed({
      title: `챔피언정보를 가져올수 없음`,
      color: "DarkRed"
    });
    let championlist: championtype[] = [];
    if (postion == "ALL") championlist = getchampions;
    if (postion == "TOP") championlist = getchampions.filter(champ => champ.position == "TOP");
    if (postion == "JUNGLE") championlist = getchampions.filter(champ => champ.position == "JUNGLE");
    if (postion == "MID") championlist = getchampions.filter(champ => champ.position == "MID");
    if (postion == "ADC") championlist = getchampions.filter(champ => champ.position == "ADC");
    if (postion == "SUPPORT") championlist = getchampions.filter(champ => champ.position == "SUPPORT");
    const r = Math.floor(Math.random() * championlist.length);
    const postionname = (postion: postiontype | "ALL") => {
      return postion == "ALL" ? "전체"
        : postion == "TOP" ? "탑"
        : postion == "JUNGLE" ? "정글"
        : postion == "MID" ? "미드"
        : postion == "ADC" ? "바텀"
        : "서폿";
    }
    const champion = championlist[r];
    if (!champion) return client.mkembed({
      title: `챔피언정보를 가져올수 없음`,
      color: "DarkRed"
    });
    return client.mkembed({
      author: { name: member.nickname || member.user.username, iconURL: member.displayAvatarURL({ forceStatic: false }) },
      title: `** 롤 ${postionname(postion)} 랜덤 **`,
      description: `
        ID: ${champion.key}
        이름: ${champion.name}
        포지션: ${postionname(champion.position)}
      `,
      thumbnail: champion.image_url
    });
  }
}