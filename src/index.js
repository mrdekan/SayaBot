import { config } from 'dotenv'
import {Client, GatewayIntentBits} from 'discord.js';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(process.env.SAYA_TOKEN);
client.once('ready', ()=> {
    console.log("I`m online!");
    console.log(`${client}`);
});