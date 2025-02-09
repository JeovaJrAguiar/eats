# EatsFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Parts

Core: contém recursos globais únicos </br>
Pages: contém recursos reutilizáveis dentro de várias partes da aplicação </br>
Shared: contém funcionalidades ou páginas específjcas da aplicação

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```


## Structure

```
.
|___ eats-front/
    |--- 
    |--- 
    |--- 
    |--- 
```
## Docker

#### Construir a imagem
```
docker build -t angular-app .
```

#### Rodar o container

```
docker run -p 80:80 --name angular-app angular-app
```

