FROM node:16

LABEL description="backend"

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
