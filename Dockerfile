FROM node:20-alpine as development

WORKDIR /

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build


FROM node:20-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /src

COPY package*.json .

RUN yarn ci --only=production

COPY --from=development /dist ./dist

CMD [ "node", "dist/app.js" ]
