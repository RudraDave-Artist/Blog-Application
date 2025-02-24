import config from "../confg/config";
import { Client , ID, Account } from "appwrite";
import {Users} from "node-appwrite"


export class Authentication {
    client = new Client()
    account;
    users;
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId)
            // .setKey(config.appwriteApiKey)

        this.account = new Account(this.client)
        this.users = new Users(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAcc = await this.account.create(ID.unique(), email, password, name)
            if (userAcc) {
                //call another method
                return this.login({ email, password })
            }
            else {
                return userAcc
            }
        }
        catch (error) {
            console.log("There is an while creating an account : " + error);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        }
        catch (err) {
            console.log("There is an error while logging an account : " + err);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        }
        catch (err) {
            console.log("This is error caused while getting an user:" + err);
            return null
        }
    }

    async getUser(userId) {
        try {
            const user = await this.users.get(userId)
            console.log(user);
            return user
        }
        catch {
            console.log("There is an error while fetching a user");
            return null
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        }
        catch (err) {
            console.log("There is an error while logging out:" + err);

        }
    }
}

export const auth = new Authentication()