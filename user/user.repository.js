import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

class userRepository{

    constructor(){
        this.collection = "users";
    }

    async signUp(newUser){

        try {
            //1. get database
            const db = getDB();

            //2. get the collections
            const collection = db.collection(this.collection);
             
            //3. insert the document in user collection
            await collection.insertOne(newUser);
            return newUser;
        }
        catch (error) {
            // throw new Error("Something went wrong")
            throw new ApplicationError("Something went wrong with db", 500);    
        }
    }

    async signIn(email, password){

        try {
            //1. get database
            const db = getDB();

            //2. get the collections
            const collection = db.collection(this.collection);
             
            //3. find the document
            return await collection.findOne({email, password});
            
        }
        catch (error) {
            // throw new Error("Something went wrong")
            throw new ApplicationError("Something went wrong with db", 500);    
        }
    }

    async findByEmail(email){

        try {
            //1. get database
            const db = getDB();

            //2. get the collections
            const collection = db.collection("users");
             
            //3. find the document
            return await collection.findOne({email});
            
        }
        catch (error) {
            // throw new Error("Something went wrong")
            throw new ApplicationError("Something went wrong with db", 500);    
        }
    }

}

export default userRepository