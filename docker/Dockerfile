FROM node:20-alpine
ARG WEBAPI_PORT
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY ./ ./
EXPOSE $WEBAPI_PORT
USER node
CMD ["node", "./main.mjs"]
