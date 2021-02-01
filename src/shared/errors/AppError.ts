// classe de erro 
// e usada para disparar erros sem blocos gigantes de try catch

export default class AppError{
  public message:string
  public statusCode:number

  constructor(message:string,statusCode= 400){
    this.message = message
    this.statusCode = statusCode
  }
}
