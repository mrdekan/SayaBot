import {SlashCommandBuilder} from "@discordjs/builders";

const userHelloCommand = new SlashCommandBuilder()
    .setName('sayhello')
    .setDescription('Say hello to your friend')
    .addUserOption((option) =>
        option
            .setName('user')
            .setDescription('Select the user')
            .setRequired(true)
    );

export default userHelloCommand.toJSON();