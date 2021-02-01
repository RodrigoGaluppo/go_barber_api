
interface ITemplateVariable{
    [key:string]:string | number
}

export default interface IParseMailTemplateDTO{
    file:string
    varibales:ITemplateVariable
}