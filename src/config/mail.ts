interface IMailConfig{
    driver: "etherial" | "ses"
    defaults:{
        from:{
            email:string
            name:string
        }
    }
}

export default{
    driver : process.env.MAIL_DRIVER || "etherial",
    defaults:{
        from:{
            email:"russocode.atendimento@gmail.com",
            name:"Rodrigo"
        }
    }
} as IMailConfig