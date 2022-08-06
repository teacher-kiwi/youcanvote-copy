FROM kimoo1/nginx-node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY .husky/ ./husky/

COPY app/ ./app/

COPY ./node-server.conf /etc/nginx/conf.d/

ENTRYPOINT ["npm", "run", "dev-back"]