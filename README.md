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
# run in console
docker-compose up --build

# or run detached
docker-compose up --build -d
# and follow logs if needed
docker-compose logs -f app

# stop
docker-compose stop
```

## deploy production
```
docker-compose -f .docker/prod/docker-compose.yaml stop
APP_PORT=80 docker-compose -f .docker/prod/docker-compose.yaml up --build -d
```