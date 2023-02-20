import { config } from 'dotenv'
import {Client, GatewayIntentBits} from 'discord.js';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(process.env.SAYA_BOT_TOKEN);
client.once('ready', ()=> {
    console.log("I`m online!");
});