FROM node:14-slim

LABEL description="frontend"

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]

