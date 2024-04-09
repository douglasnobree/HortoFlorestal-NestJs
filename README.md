
# Back-end do site Horto Florestal




## Stack utilizada

**Back-end:** Node, TypeScript, NestJS, Prisma, Docker, Portraiter, Nginx Proxy Manager, 


## Documentação
Para a documentação, estou utilizando um swagger. basta abrir a aplicacao, e ir no end point root da aplicacao.



## Instalação

Usando Node

```bash
  npm i
  npm run build
  npm run start:prod
```

Usando Docker (Recomendado)

```bash
  docker-compose up
```
    
## Deploy

Estou utilizando o GitHub Actions para fazer o deploy automatico.
Utilizei o Portrainer, que é um :<completar>. Na GitHub Actions estou fazendo autenticacao com a API do Portrainer, autenticacao com o docker. na step seguinte eu faço a build da imagem da aplicacao, faço o push para o docker hub. e reinicio a stack do Portrainer, assim fazendo o deploy de forma 100% automatica com um simples commit da branch main.

```bash
  commit on branch main
```


## Funcionalidades

- Criar, Registrar, apagar, editar Plantas
- Criar, Registrar, apagar, editar Eventos
- Sistema de login
- <adicionar novas Funcionalidades>


## Autores

- [@Dougsan65](https://www.github.com/Dougsan65)


## Aprendizados

* SSh, aprendi os conceitos principais do ssh, como private key, public key, etc
* Configurar network VPS, abrir portas, fechar, permitir dns, etc
* Proxy Reverso: apontar para diferentes dominions com portas diferentes
* GitHub Actions: fazer acoes automatizadas, como deploy automatico
* Criar imagens com docker, subir no docker hub, fazer pull
* Colocar diferentes aplicacoes em um mesmo servidor usando o portraiter
* diferentes conhecimentos em infra.

