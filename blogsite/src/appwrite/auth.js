//if you ever want to build auth service for any app ever using appwrite,you can simply copy paste this code snippets...so remember this...

import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
            this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name); //we used async await here because the function pauses and holds until the await call fetches the APIs from Appwrite through client
            if(userAccount){
                //call another method
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            throw error;
            
        }

        return null;  //this was done to handle the case when no user is found,like uh were not even able to reach out to the service..and the error which can occur is already handled in the try catch section
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service:: logout :: error",error);
        }
    }
}
 
const authService=new AuthService();

export default authService