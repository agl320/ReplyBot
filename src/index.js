import { config } from 'dotenv';
import { Client, CommandInteractionOptionResolver, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from 'discord.js';

config();

const TOKEN = process.env.botToken;
const CLIENT_ID = process.env.clientId;
const GUILD_ID = process.env.guildId;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);


client.login(TOKEN);
client.on('ready', () => {console.log('bot has logged in');});

async function main(){

    const commands = [
        {
            name: 'tutorialhelp',
            description: 'Help Tutorial Command',
        },
    ];



    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),{
            body: commands,
        })
    } catch (err) {
        console.log(err);
    }
}

main();

//logs messages
client.on('messageCreate', (message) => {
    console.log(message.content);
})