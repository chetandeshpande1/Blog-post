

import  jwt  from "jsonwebtoken";

const jwtAuth = (req, res, next) =>{

    //1. read the token

    const token = req.headers['authorization'];

    console.log(token);

    //2. if no token, return a error
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    //3. check if token is valid
    try{
        const payLoad = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
        req.userID = payLoad.userID;    //to extract userid from payload   
        console.log(payLoad);
    }
    catch(err){
        //4.return error
        return res.status(401).send("Unauthorized");
    }

    //5. call next middleware
    next();
}

export default jwtAuth;
