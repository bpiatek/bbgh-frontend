FROM node:lts-alpine

RUN npm install -g @vue/cli

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

EXPOSE 8080

CMD ["yarn", "serve"]
