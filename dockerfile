FROM node:18-alpine

COPY . .

RUN npm i

EXPOSE 5173

CMD [ "npm","run","dev" ]