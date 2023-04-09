#Install dependencies 
FROM node:16-alpine3.16 As ci-cd-deps
RUN apk update

COPY package*.json tsconfig*.json ./
RUN npm ci

#build project
FROM node:16-alpine3.16 As ci-cd-build
RUN apk update

COPY --from=ci-cd-deps node_modules/ ./node_modules
COPY . .
RUN npm run build

#Dockerize application
FROM node:16-alpine3.16 As ci-cd
WORKDIR /home/nodeapp/
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeapp -u 1001

COPY --from=ci-cd-deps package*.json ./
#COPY .env ./
RUN npm ci --only=production
COPY --from=ci-cd-build dist/ ./dist

USER nodeapp

EXPOSE 3000

ENTRYPOINT ["node", "dist/main.js"]