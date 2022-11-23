import { config } from 'dotenv'; // import config from .env
import { Client, CommandInteractionOptionResolver, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from 'discord.js'; // REST API used for grabbing data from site
// const {REST} = require("@discordjs/rest")
// const{ Routes } = require("@discord-api-type/v9")
// const fs = require("fs")
// const { Player } = require("discord-player")

const LOAD_SLASH = process.argv[2] == "load"



config(); // loads data from .env

// process included by default
//takes values from env file
const TOKEN = process.env.botToken;
const CLIENT_ID = process.env.clientId;
const GUILD_ID = process.env.guildId;


// Intents allows ability to choose which events to import?
const client = new Client({ 
    intents: [
        "GUILDS",
        "GUILD_VOICE_STATES",
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.slashcommands = new DiscordAPIError.Collection()
client.player = new Player(client, {
    ytldOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))

for(const file of slashFiles){
    const slashcmd = require('./slash/${file}')
    client.slashcommands.set(slashcmd.data.name, slashcmd)

    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

if (LOAD_SLASH){
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if(err){
            console.log(err)
            process.exit(1)
        }
    })
}
else{
    client.on("ready", () => {
        console.log('Logged in as ${client.user.tag}')
    })
    client.log("interactionCreate", (interaction) => {
        async function handleCommand(){
            if (!interaction.isCommand()) return
            const slashcmd = client.slashcommands.get(interation.commandName)
            if(!slashcmd) interaction.replay("Not a valid slash command")

            await interaction.deferReply()
            await slashcmd.run({client, interaction})
        }
        handleCommand()
    })

}

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