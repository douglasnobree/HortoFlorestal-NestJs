FROM node:20-alpine

RUN npm install -g prisma

RUN apk --no-cache add rsync

WORKDIR /app
COPY .env /app/.env

COPY package*.json ./
RUN npm install

RUN npx prisma init
RUN npx prisma db push
RUN npx prisma db pull

COPY . .
RUN rsync -a --exclude='prisma' /app/ /app_temp/


RUN npx prisma generate

RUN npm run build

EXPOSE 3333

CMD ["npm","run","start:prod"]
