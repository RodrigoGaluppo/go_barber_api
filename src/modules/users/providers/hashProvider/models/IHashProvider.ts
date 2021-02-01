// tem a interface dos metodos usados da aplicacao
export default interface IHashProvider{
    generateHash(payload:string): Promise<string>
    compareHash(payload:string,hashed:string): Promise<boolean>
}