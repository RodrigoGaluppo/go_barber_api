# recuperacao de senha

    **RF (requisistos funcionais)**
    - o suaurio deve poder recuperar sua senha informando o seu email
    - o usuario deve receber um email com instrucoes de recuperacao de senha
    - o usuario deve poder resetar sua senha

    **RNF (requisitos nao funcionais )**
    - utilizar MailTrap par testar emails em desenvolvimento
    - requisitos nao funcionais mazon SES para envios em producao
    - o envio de E-mails deve acontecer em 2 plano

    **RN (requisitos de negocio) **
    - o link enviado por email deve expirar em 2 horas 
    - o usuario precisa confirmar a nova senh ao resetar a nova senha

# atualizacao do perfil

    **RF (requisistos funcionais)**
    - o usuario deve poder atualizar seu nome,email,senha

    **RNF (requisitos nao funcionais )**

    **RN (requisitos de negocio) **
    - o usuario nao pode alterar seu email para um email ja utilizado
    - para atualizar sua senha o usuario deve informar sua antiga e confirmar a nova

# painel do prestador
    **RF (requisistos funcionais)**
    - o usuario deve poder listar seus agendamentos de um dia especifico
    - O prestador deve receber uma notificacao sempre que alguem marcar um agendamento
    - o prostador deve poder visualizar as notificacoes nao lidas

    **RNF (requisitos nao funcionais )**
    - os agendamentos do dia devem ser armazenados em cache
    - as notificacoes dveem ser armazenadas no mongoDB
    - notificaoes devem ser mandadas em tempo real usando o SocketIO

    **RN (requisitos de negocio) **
    - a notificacao deve ter um status de lida ou nao lida para que o presdtador possa controlar

# agendamento de servicos
    **RF (requisistos funcionais)**
    - o suaurio deve poder listar todos prestadores de servico cadastrado
    - o usuario deve poder visualizar os dias em que este prestador tem horario disponivel de um prestador
    - o suuario deve poder listar horarios disponiveis em um dia especifico de um prestador
    - o usuario deve poder realizar um novo agendamento

    **RNF (requisitos nao funcionais )**
    - A listagem de prestadores deve ser armazenada em cache

    **RN (requisitos de negocio) **
    - todo agendamento deve durar 1hr
    - os agendamentos devem estar disponiveis de 8hr as 17hrs
    - o usuario no pode agendar em um horario ja ocupado
    - o usuario nao pode gendar num horario que ja passou
    - o usuario nao pode agendar servicos consigo mesmo
