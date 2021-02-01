import { container } from "tsyringe"

// index que exporta todos os providers

// providers sao provedores de serviuco usados apara dividir as funcoes da aplicacao

import IHashProvider from "../providers/hashProvider/models/IHashProvider"
import BCryptHashProvider from "../providers/hashProvider/implementations/BCryptHashProvider"

container.registerSingleton<IHashProvider>("HashProvider",BCryptHashProvider)