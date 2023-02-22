import {SlashCommandBuilder} from "@discordjs/builders";

const helloCommand = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say "Hello" to Saya!');

export default helloCommand.toJSON();
