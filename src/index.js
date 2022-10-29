import { config } from 'dotenv'; // import config from .env
import { Client, CommandInteractionOptionResolver, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from 'discord.js'; // REST API used for grabbing data from site

config(); // loads data from .env

// process included by default
//takes values from env file
const TOKEN = process.env.botToken;
const CLIENT_ID = process.env.clientId;
const GUILD_ID = process.env.guildId;


// Intents allows ability to choose which events to import?
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// retrieve token
const rest = new REST({ version: '10' }).setToken(TOKEN);

// bot login w tokin
client.login(TOKEN);
client.on('ready', () => {
    console.log('bot has logged in');

    client.user.setActivity("Fuck you all.");
});



client.on('interactionCreate', (interaction) => {

    if (interaction.isChatInputCommand()){
        console.log('Hello, World');
         interaction.reply({ content: '<@414941719398842368>',
         content: '<@414941719398842368>'
        });     
    }
});

client.on('messageCreate', (message) => {
    if (message.content.includes("test"))
    {
        message.channel.send(`${message.author} said bad word.`);

        //var user_id = message.channel.send(client.users.cache.find(u => u.tag === message.author.tag).id)
        //message.author.send('the fuck you say to me?');
    }
})

client.on('messageDelete', (message) => {
    message.channel.send(`${message.author} be deletin messages.`);

})



// async so that code runs alongside other code 
async function main(){

    const commands = [
        {
            name: 'annoyxeg',
            description: 'annoys xegativ',
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