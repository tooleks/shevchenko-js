FROM node:20-alpine
ARG WEBAPI_PORT
WORKDIR /app
COPY ./ ./
RUN npm ci --no-audit && npm cache clean --force
EXPOSE $WEBAPI_PORT
USER node
CMD ["node", "./main.mjs"]
