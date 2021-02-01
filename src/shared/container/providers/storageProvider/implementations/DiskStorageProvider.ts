import IStorageProvider from "../models/IStorageProvider"
import fs from "fs"
import path from "path"
import uploadConfig from "@config/upload.config"

// implementa e exporta a classe de armazenmento da imagem do avatar para manejo do sistema
// dividindo funcoes e dependencias

export default class DiskStorageProvider implements IStorageProvider {

    public async saveFile(file:string):Promise<string>{
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder,file),
            path.resolve(uploadConfig.uploadsFolder,file)
        )
        return file
    }

    public async deleteFile(file:string):Promise<void>{
        const filePath = path.resolve(uploadConfig.uploadsFolder,file)
        try{
            await fs.promises.stat(filePath)
        }catch{
            return
        }
        await fs.promises.unlink(filePath)
    }
}