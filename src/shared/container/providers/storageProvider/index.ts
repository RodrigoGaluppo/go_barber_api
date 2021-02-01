import DiskStorageProvider from "./implementations/DiskStorageProvider"
import S3SStorageProvider from "./implementations/S3SStorageProvider"
import uploadConfig from "@config/upload.config"
import {container} from "tsyringe"
import IStorageProvider from "./models/IStorageProvider"

const providers ={
    disk:DiskStorageProvider,
    s3:S3SStorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    providers[uploadConfig.driver]
)