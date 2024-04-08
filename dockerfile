# Use a imagem Node.js como base
FROM node:20-alpine

# Instale o Prisma CLI globalmente
RUN npm install -g prisma

# Instale o rsync
RUN apk --no-cache add rsync

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instale as dependências do projeto
COPY package*.json ./
RUN npm install

# Inicialize o projeto Prisma
RUN npx prisma init

# Copie todos os arquivos, exceto a pasta do Prisma, para o diretório de trabalho temporário
COPY . .
RUN rsync -a --exclude='prisma' /app/ /app_temp/

# Gere os artefatos do Prisma
RUN npx prisma generate

# Construa o aplicativo Node.js, se necessário
RUN npm run build

# Exponha a porta em que o servidor NestJS está rodando
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "start:prod"]
