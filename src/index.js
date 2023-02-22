import {config} from 'dotenv'
import {Client, GatewayIntentBits, Routes} from 'discord.js';
import {REST} from '@discordjs/rest';

import orderCommand from './commands/order.js';
import helloCommand from './commands/hello.js';
import rolesCommand from "./commands/addRole.js";
import userHelloCommand from "./commands/helloToUser.js";
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
                await interaction.reply({content: `You ordered ${food} and ${drink}`})
            else if (food !== "")
                await interaction.reply({content: `You ordered ${food}`})
            else if (drink !== "")
                await interaction.reply({content: `You ordered ${drink}`})
        }
        else if(interaction.commandName==='sayhello'){
            let user = client.users.cache.get(interaction.options.get('user').value);
            await interaction.reply({content: `Hello ${user}!`})
        }
    }
});


async function main() {


    const commands = [orderCommand, helloCommand, rolesCommand, userHelloCommand];
    //console.log(orderCommand.toJSON());
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

