import IHashProvider from "../models/IHashProvider"

// usado para fazer fake hash dos testes

export default class FakeHashProvider implements IHashProvider {
    public async generateHash(payload:string): Promise<string> {
        return payload
    }
    public async compareHash(payload:string,hashed:string): Promise<boolean>{
        return payload === hashed
    }
}