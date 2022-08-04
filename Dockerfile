FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY .husky/ ./husky/

COPY app/ ./app/

ENTRYPOINT ["npm", "run", "dev-back"]