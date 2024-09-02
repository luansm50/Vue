# Projeto Effecti

Este projeto é uma aplicação que utiliza Docker para gerenciar contêineres de um frontend em Vue.js e um backend em Spring Boot. O frontend e o backend estão configurados para rodar em contêineres Docker separados, comunicando-se através de uma rede Docker personalizada.

## Estrutura do Projeto

- **Frontend (Vue.js)**: Serviço que serve a aplicação de frontend.
- **Backend (Spring Boot)**: Serviço que fornece a API backend.

## Requisitos

- Docker
- Docker Compose

## Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/luansmeloo/Vue.git
   cd Vue

## Uso

1. **Inicie os contêineres:**
    ```bash
    docker-compose up -d

2. **Verifique o status dos contêineres:**
    ```bash
    docker-compose ps

3. **Acesse a aplicação:**

- **Frontend:** Acesse http://localhost:8082 no seu navegador.
- **Backend:** Acesse http://localhost:8081 para interagir com a API.
