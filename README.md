# bbgh-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## development with docker

Runs `yarn serve` in container:
```
# build
docker-compose build

# install dependencies 
docker-compose run app yarn install

# run
docker-compose up
```

## deploy production

#### 1. Set VUE_APP_API_HOST in .env.local or .env.production.local files
```env
# .env.local
VUE_APP_API_HOST=<bbgh-backend api url>
```

```
docker-compose -f .docker/prod/docker-compose.yaml stop
APP_PORT=8081 docker-compose -f docker-compose.prod.yaml up --build -d
```
