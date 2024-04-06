import { ApplicationError } from "../../error-handler/applicationError.js";
import  UserModel  from "./user.model.js";
import  jwt  from "jsonwebtoken";
import userRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export default class UserController{

    constructor(){
        this.userRepository = new userRepository();
    }
 

    // very simple signup and signin code without any validation
    async signUp(req, res){
        try{
            const {name, email, password, type} = req.body;

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new UserModel(name, email, hashedPassword, type);
            await this.userRepository.signUp(user)
            res.status(201).send(user);
        }catch(err){
            // throw new Error("Something went wrong");
            throw new ApplicationError("Something went wrong", 500);
        }
    }

    async signIn(req, res){

        try{
            // 1. find user by email
            const user = await this.userRepository.findByEmail(req.body.email);
            if(!user){
                return res.status(400).send('Incorrect credentials');
        }
        else{
            //2. compare password with hashed password
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
                //3. Create token
                const token = jwt.sign({userID: user._id, email: user.email}, process.env.JWT_SECRET,{expiresIn:'1h'})
                //4. send token
                return res.status(200).send(token);
            }
            else{
                return res.status(400).send('Incorrect credentials'); 
            }
        }

        // const result = await this.userRepository.signIn(req.body.email, req.body.password)   no need of this 

        }
        catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }
}