import IStorageProvider from "../models/IStorageProvider"
import fs from "fs"
import aws,{S3} from "aws-sdk"
import path from "path"
import uploadConfig from "@config/upload.config"
import mime from "mime"

// implementa e exporta a classe de armazenmento da imagem do avatar para manejo do sistema
// dividindo funcoes e dependencias

export default class DiskStorageProvider implements IStorageProvider {

    private client:S3

    constructor(){
        this.client = new aws.S3({
            region:"us-east-2",
            accessKeyId:process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
        })
    }
    
    public async saveFile(file:string):Promise<string>{
        const originalPath = path.resolve(uploadConfig.tmpFolder,file)
        
        const ContentType = mime.getType(originalPath)

        if(!ContentType){
            throw new Error("file not found")
        }

        const fileContent = await fs.promises.readFile(originalPath)

        await this.client.putObject({
            Bucket:uploadConfig.config.aws.bucket,
            Key:file,
            ACL:"public-read",
            Body:fileContent,
            ContentType:ContentType,
            ContentDisposition:`inline; filename=${file}`
        }).promise()

        await fs.promises.unlink(originalPath)

       return file
    }

    public async deleteFile(file:string):Promise<void>{

        await this.client.deleteObject({
            Bucket:uploadConfig.config.aws.bucket,
            Key:file
        }).promise()

    }
}