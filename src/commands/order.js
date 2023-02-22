import {SlashCommandBuilder} from "@discordjs/builders";

const orderCommand = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order your favorite meal')
    .addStringOption((option) =>
        option
            .setName('food')
            .setDescription('Select your favourite food')
            .addChoices(
                {name: 'Cake', value: 'cake'},
                {name: 'Cookie',value: 'cookie'},
            )
            .setRequired(false))
    .addStringOption((option) =>
        option
            .setName('drink')
            .setDescription('Select your favourite drink')
            .addChoices(
                {name: 'Coffee', value: 'Coffee'},
                {name: 'Milk',value: 'milk'},
            )
            .setRequired(false));

export default orderCommand.toJSON();