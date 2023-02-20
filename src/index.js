import { config } from 'dotenv'
import {Client, GatewayIntentBits, Routes} from 'discord.js';
import { REST } from '@discordjs/rest';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] });
const TOKEN = process.env.SAYA_TOKEN;
const CLIENT_ID = process.env.SAYA_ID;
const rest = new REST({ version: '10' }).setToken(TOKEN);
client.login(TOKEN);
client.once('ready', ()=> {console.log("I`m online!")});

async function main() {
    const commands = [
        {
            name: 'ping',
            description: 'Replies with Pong!',
        },
        {
            name: 'order',
            description: 'Order something...',
        },
    ];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}
main();

