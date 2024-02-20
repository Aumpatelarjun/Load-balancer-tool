import inquirer from 'inquirer';
import Server from './Server.mjs';

let servercount =0;
global.servers = new Map()
global.healthcheck = 7;
global.healthendPoint = '/'


const getServers = async() =>{
const server = await inquirer.prompt ({
    name :"servercount",
    type :"input" ,
    message :"Enter number of server",
    validate: (input)=> /^\d+$/.test(input) || 'Please enter a valid numeric value.'
});
servercount = server.servercount ;
}


const getServersDetails = async()=>{

    for(let i=1;i<=servercount;i++){
        const server = await inquirer.prompt({
            name: "serverUrl",
            type: "input",
            message: `Enter server url ${i}`,
    
        });

        servers.set(i, server.serverUrl)
    }
}

const getHealthCheckEndpoint = async()=>{
    const server = await inquirer.prompt({
        name: "endpoint",
        type: "input",
        message: "Enter the health check endpoint (e.g., /health). By default, it is set to '/'.",
    });

    healthendPoint = server.endpoint;
}

const getHealthCheckPeriod = async()=>{
    const server = await inquirer.prompt({
        name: "seconds",
        type: "number",
        message: `Enter the time period (in seconds) for checking the server health.`,
        validate: (input)=> /^\d+$/.test(input) || 'Please enter a valid numeric value.'
    });

    healthcheck = server.seconds;
}

const confirmStartServer = async()=>{
    const server = await inquirer.prompt({
        name: "startLB",
        type: "confirm",
        message: `Start LoadBalancer server ?`,
    });
    if(server.startLB){
        Server();
    }
    else{
        console.log("Closing");
    }
}

const startIt = async()=>{
    await getServers();
    await getServersDetails();
    await getHealthCheckEndpoint();
    await getHealthCheckPeriod();
    await confirmStartServer();
}

startIt();



