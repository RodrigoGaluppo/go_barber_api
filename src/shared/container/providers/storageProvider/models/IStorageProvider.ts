// exporta da interface de storage
export default interface IStorageProvider{
    saveFile(file:string) : Promise<string>
    deleteFile(file:string) : Promise<void>
}