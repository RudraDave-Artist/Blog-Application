import config from "../confg/config";
import { Client , ID , Databases , Storage,  Query } from "appwrite";

export class Services{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title , content , slug , featuredImage , status , userId}){
        console.log(slug);
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("There is an error while creating a post",error);
        }
    }

    async updatePost(slug, {title , content , featuredImage , status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("There is an error while updating a post",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("There is an error while deleting a post",error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("There is an error while fetching a post",error);
        }
    }
    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            if (queries === null || queries.length === 0) {
                queries = []; // No filter applied
            }
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId, 
                queries
            )
        } catch (error) {
            console.log("There is an error while fetching a post",error);
            return false
        }
    }
    //Read documentation to learn more queries

    //Uploading A File

    // Here we have to provide an actual file not just name
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("There is an error while uploading a file",error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("There is an error while deleting a file",error);

        }
    }

    getFilePreview(fileId){
        if(fileId){
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        }
        else {
            return "No Image available"
        }
    }
}

export const services = new Services()

