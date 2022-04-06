#language: pt-br
Funcionalidade: Listagem

    Como usuário, desejo verificar a listagem
    Para validar os cadastros

    Cenário: Listagem sem registros
        Dado que o site não possui registros
        Quando acessar a listagem
        Então devo visualizar a listagem vazia

    Cenário: Listagem com um registro
        Dado que o site possui apenas um registro
        Quando acessar a listagem
        Então deve visualizar apenas um registro 