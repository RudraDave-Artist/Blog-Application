import config from "../confg/config";
import {Users , Client} from "node-appwrite"


export class UserInfo{
    client = new Client()
    user;
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId)
            .setKey(config.appwriteApiKey)

        this.user = new Users(this.client)
    }

    async getUser(userId) {
        try {
            const user = await this.user.get(userId)
            console.log(user);
            return user
        }
        catch {
            console.log("There is an error while fetching a user");
            return null
        }
    }

}

export const user = new UserInfo()