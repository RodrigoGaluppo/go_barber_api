import AppError from "@shared/errors/AppError"
import {hash,compare} from "bcryptjs"
import IHashProvider from "../models/IHashProvider"

// classe que usa a biblioteca bycript , todos os metodos que forewm usqdos devem ser reescritos
// assim as dependencias ficam miunimas e fica facil a manutencao

export default class BCryptHashProvider implements IHashProvider {
    public async generateHash(payload:string): Promise<string> {
        return hash(payload,8)  
    }
    public async compareHash(payload:string,hashed:string): Promise<boolean>{
        return compare(payload,hashed)
    }
}