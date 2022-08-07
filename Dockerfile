FROM kimoo1/nginx-node:latest

WORKDIR /youcanvote-copy

COPY package.json package-lock.json ./

COPY .husky/ ./husky/

COPY app/ ./app/

RUN npm run build

COPY nginx.conf /etc/nginx/conf.d/

CMD ["npm", "run", "dev-back"]