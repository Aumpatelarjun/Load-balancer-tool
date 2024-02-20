import express from "express";
const app = express();
import axios from "axios";
import cron from 'node-cron';


let healthyServers = [];

let current = -1;

app.all("*", (req, res) => {
    handleRequest(req, res);
  });

  const changeServer = () =>{
    if (healthyServers.length <= 0) {
        return null; 
      }
    
    current = (current +1) % healthyServers.length;
    return current
  }


  const makerequest = async (req, res) =>{
    try{

        const {data} = await  axios({
            method: req.method,
            url: `${healthyServers[current]}${req.originalUrl}`,
        });
        return res.status(200).json({
            success: true,
            data,
          });
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: 'this port is not working',
          });
    }
  }


  const handleRequest = async(req,res) =>{
    try{
        const currserver = changeServer()

        if(currserver==null){
            return res.status(500).json({
                success: false,
                error: "All Servers are dead !!!",
                message:
                  "If you are a developer, ensure that you have provided the correct URLs in the load balancer configuration.",
              });
        }
return makerequest(req, res);
        // if (currserver !== null) {
        //   const currServerUrl = servers.get(currserver); 
        //   if (healthyServers.includes(currServerUrl)) {
        //       return makerequest(req, res);
        //   }
        // }
    }
    catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
          });

    }

  }


  const healthCheck = async() =>{

    try{

    for(let i=1;i<=servers.size;i++){
    const curr = servers.get(i)

    try{
    let res = await axios.get(`${curr}${healthendPoint}`)
    
    let index = healthyServers.indexOf(curr)
    if(index<0) healthyServers.push(curr)

    }
    catch(error){
    let index = healthyServers.indexOf(curr)
    index>-1  && healthyServers.splice(index,1);
    console.error(`this ${curr} is not running`)

    }

    const healthyServersCount = healthyServers.length ;
    const deadServersCount = servers.size - healthyServers.length;

    }

}

catch(error){
    console.log(error);
}
  }



const Server = () => {
    const PORT = 4000;
    app.listen(PORT, () => {
      for (const [key, value] of servers) {
        healthyServers.push(value);
      }
  
      console.log(`Load Balancer is running on port: ${PORT}`);
      const helthCheckCronJob = cron.schedule(`*/${healthcheck} * * * * *`, () => {
        healthCheck();
      });
    });
  };
  
  export default Server;