import {config} from 'dotenv'
import {Client, GatewayIntentBits, Routes} from 'discord.js';
import {REST} from '@discordjs/rest';
import {joinVoiceChannel} from '@discordjs/voice';
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
        if (interaction.commandName === 'ping')
            await interaction.reply({content: 'Hello world!!!'});
        else if (interaction.commandName === 'order'){
            let food="";
            let drink="";
            try{
                food=interaction.options.get('food').value;
            }catch (err){}
            try{
                drink=interaction.options.get('drink').value;
            }catch (err){}
            if(food!=="" && drink!=="")
                await interaction.reply({content: `You ordered ${interaction.options.get('food').value} and ${interaction.options.get('drink').value}`})
            else if(food!=="")
                await interaction.reply({content: `You ordered ${interaction.options.get('food').value}`})
            else if(drink!=="")
                await interaction.reply({content: `You ordered ${interaction.options.get('drink').value}`})
        }
    }
});


async function main() {
    const commands = [
        {
            name: 'ping',
            description: 'Replies with Pong!',
        },
        {
            name: 'order',
            description: 'Order something...',
            options: [{
                name: 'food',
                description: 'the type of food',
                type: 3,
                required: false,
                choices: [
                    {
                        name: 'Cake',
                        value: 'cake',
                    },
                    {
                        name: 'Cookie',
                        value: 'cookie',
                    },
                ]
            },
                {
                    name: 'drink',
                    description: 'the type of drink',
                    type: 3,
                    required: false,
                    choices: [
                        {
                            name: 'Coffee',
                            value: 'coffee',
                        },
                        {
                            name: 'Juice',
                            value: 'Juice',
                        }
                    ]
                }

            ]
        },
    ];

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

