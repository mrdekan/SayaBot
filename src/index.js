import {config} from 'dotenv'
import {Client, GatewayIntentBits, Routes} from 'discord.js';
import {REST} from '@discordjs/rest';
import {SlashCommandBuilder} from '@discordjs/builders';
//const { joinVoiceChannel } = require('@discordjs/voice');
config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
const TOKEN = process.env.SAYA_TOKEN;
const CLIENT_ID = process.env.SAYA_ID;
const rest = new REST({version: '10'}).setToken(TOKEN);
client.login(TOKEN);
client.once('ready', () => {
    console.log("I`m online!")
});
client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'hello')
            await interaction.reply({content: 'Hello there!!!'});
        else if (interaction.commandName === 'order') {
            let food = "";
            let drink = "";
            try {
                food = interaction.options.get('food').value;
            } catch (err) {
            }
            try {
                drink = interaction.options.get('drink').value;
            } catch (err) {
            }
            if (food !== "" && drink !== "")
                await interaction.reply({content: `You ordered ${interaction.options.get('food').value} and ${interaction.options.get('drink').value}`})
            else if (food !== "")
                await interaction.reply({content: `You ordered ${interaction.options.get('food').value}`})
            else if (drink !== "")
                await interaction.reply({content: `You ordered ${interaction.options.get('drink').value}`})
        }
    }
});


async function main() {
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
    const helloCommand = new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Say "Hello" to Saya!');
    const commands = [orderCommand.toJSON()];
    console.log(orderCommand.toJSON());
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
        });
        //client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main();

