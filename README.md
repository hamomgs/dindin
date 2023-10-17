# Dindin
<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/hamomgs/dindin?color=%2304D361" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/hamomgs/dindin" />
  
  <a href="https://github.com/tgmarinho/README-ecoleta/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/hamomgs/dindin" />
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen" />
</p>

## 💻 About the Project

A Rest API for personal finance management, that allows users to track their expenses and incomes in a simple and secure way. With Dindin, users can have an overview of their financial situation, set goals and plan for the future.
This project, part of a challenge proposed by [Cubos Academy](https://cubos.academy/).

---

## 🛣️ How to Run the Project

Follow these instructions to run the project in your local environment.

### 🚀 Pre-requisites

- You'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) installed on your computer to build this app.
- Use [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/) to perform the API requests.
- Additionally, having an editor like [VSCode](https://code.visualstudio.com/) for coding is quite advantageous.

### 🎲 Building

```bash
# Clone the project and access the folder
$ git clone https://github.com/hamomgs/dindin.git
$ cd dindin

# Install the dependencies
$ npm install

# Make a copy of file '.env.example' to '.env'
$ cp .env.example .env

# Acess the .env
$ code .env

# Fill it with your port, database and jwt config.
PORT=3000

# JWT Config
JWT_PASS=YourPassword

# Database Config
DB_HOST=YourDbHost
DB_PORT=YourDbPort
DB_USER=YourDbUser
DB_PASS=YourDbPassword
DB_NAME=YourDbName
```

Run the application in development mode.

```bash
$ npm run dev

# The application will be accessible on port:3000 by default via http://localhost:3000.
```

Import on Insomnia or Postman the [request collection](https://github.com/hamomgs/dindin/blob/main/Insomnia-collection.json).

<p align="center">
  <a href="https://insomnia.rest/download" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

---

## 📚 API Reference

### Base URL

```bash
http://localhost:3000/
```

### 🧩 Endpoits

### User
**Create user** | `POST /usuario`

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `nome` | `string` | Body | **Required**. User name. |
| `email` | `string` | Body | **Required**. User email. |
| `senha` | `string` | Body | **Required**. User password. |

```jsx
// Example Response
// HTTP Status 201 
{
  "id": 1,
  "nome": "José",
  "email": "jose@email.com"
}
```

##

**User login** | `POST /login` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `email` | `string` | Body | **Required**. User email. |
| `senha` | `string` | Body | **Required**. User password. |

```jsx
// Example Response
// HTTP Status 200
{
  "usuario": {
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

##

**Get logged user details** | `GET /usuario`

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |

```jsx
// Example Response
// HTTP Status 200
{
  "id": 1,
  "nome": "José",
  "email": "jose@email.com"
}
```

##

**Edit user profile** | `PUT /usuario`

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |
| `nome` | `string` | Body | **Required**. User name. |
| `email` | `string` | Body | **Required**. User email. |
| `senha` | `string` | Body | **Required**. User password. |

```jsx
// Example Response
// HTTP Status 204
// No body response.
```

##

### Category
**List all categories** | `GET /categoria` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |

```jsx
// Example Response
// HTTP Status 200
[
  {
    "id": 1,
    "descricao": "Roupas"
  },
  {
    "id": 2,
    "descricao": "Mercado"
  }
]
```

##

### Transaction
**List all transactions** | `GET /transacao` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |

```jsx
// Example Response
// HTTP Status 200
[
  {
    "id": 1,
    "tipo": "saida",
    "descricao": "Sapato amarelo",
    "valor": 15800,
    "data": "2023-03-23T15:35:00.000Z",
    "usuario_id": 5,
    "categoria_id": 4,
    "categoria_nome": "Roupas"
  },
  {
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2023-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários"
  }
]
```

##

**List all filtered transactions** | `GET /transacao?filtro[]=categoria1&filtro[]=categoria2`

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |
| `filtro[]` | `array` | Query | **Optional**. Category name. |

```jsx
// Example Response | GET /transacao?filtro[]=roupas&filtro[]=salários
// HTTP Status 200
[
  {
    "id": 1,
    "tipo": "saida",
    "descricao": "Sapato amarelo",
    "valor": 15800,
    "data": "2022-03-23T15:35:00.000Z",
    "usuario_id": 5,
    "categoria_id": 4,
    "categoria_nome": "Roupas"
  },
  {
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários"
  }
]
```

##

**Get transaction details by id** | `GET /transacao/:id` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |
| `id` | `number` | Parameter | **Required**. Transaction id. |

```jsx
// Example Response
// HTTP Status 200
{
  "id": 3,
  "tipo": "entrada",
  "descricao": "Salário",
  "valor": 300000,
  "data": "2022-03-24T15:30:00.000Z",
  "usuario_id": 5,
  "categoria_id": 6,
  "categoria_nome": "Salários"
}
```

##

**Create transaction** | `POST /transacao` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |
| `tipo` | `string` | Body | **Required**. Transaction type. `entrada` or `saida`. |
| `descricao` | `string` | Body | **Required**. Transaction description. |
| `valor` | `number` | Body | **Required**. Transaction value. |
| `data` | `timestamp` | Body | **Required**. Transaction date. |
| `categoria_id` | `number` | Body | **Required**. Category id. |

```jsx
// Example Response
// HTTP Status 204
{
  "id": 3,
  "tipo": "entrada",
  "descricao": "Salário",
  "valor": 300000,
  "data": "2022-03-24T15:30:00.000Z",
  "usuario_id": 5,
  "categoria_id": 6,
  "categoria_nome": "Salários"
}
```

##

**Edit specific transacion** | `PUT /transacao/:id` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |
| `id` | `string` | Parameter | **Required**. Transaction id. |
| `tipo` | `string` | Body | **Required**. Transaction type. `entrada` or `saida`. |
| `descricao` | `string` | Body | **Required**. Transaction description. |
| `valor` | `number` | Body | **Required**. Transaction value. |
| `data` | `timestamp` | Body | **Required**. Transaction date. |
| `categoria_id` | `number` | Body | **Required**. Category id. |

```jsx
// Example Response
// HTTP Status 204
// No body response.
```

##

**Remove transaction** | `DELETE /transacao/:id` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |
| `id` | `string` | Parameter | **Required**. Transaction id. |

```jsx
// Example Response
// HTTP Status 204
// No body response.
```

##

**Get transaction statement** | `GET /transacao/extrato` 

| Param | Type | Origin | Description |
| ----- | ---- | ------ | ----------- |
| `token` | `Beater` | Authentication | **Required**. Token returned to the user after logging in. |

```jsx
// Example Response
// HTTP Status 200
{
	"entrada": 300000,
	"saida": 15800
}
```

### 🗃️ Database Schema Diagram

![database schema diagram](./sql/db-schema-diagram.png)

### 📂 Directory Structure

```markdown
dindin/
├── node_modules
├── sql
│   ├── schema
│   │   └── 1.sql
│   └── db-schema-diagram.png
├── src
│   ├── controllers
│   │   ├── categoryController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── middlewares
│   │   └── userAuth.js
│   ├── routes
│   │   ├── categoryRouter.js
│   │   ├── index.js
│   │   ├── loginRouter.js
│   │   ├── transactionRouter.js
│   │   └── userRouter.js
│   ├── services
│   │   ├── database.js
│   │   └── jwt.js
│   ├── validations
│   │   └── index.js
│   └── index.js   
├── .env
├── .eslintrc.json           
├── .gitignore       
├── .prettierrc 
├── LICENCE
├── package-lock.json 
├── package.json
└── README.md
```

---

## 🛠 Technologies

| Tech  | Version |
| ------------- | ------- |
| [Node.js](https://nodejs.org/) | 4.18.2 |
| [Express.js](https://www.npmjs.com/package/express) | 4.18.2 |
| [Nodemon](https://www.npmjs.com/package/nodemon) | 3.0.1 |
| [Pg](https://www.npmjs.com/package/pg) | 8.11.3 |
| [Dotenv](https://www.npmjs.com/package/dotenv) | 16.3.1 |
| [Json Web Token](https://www.npmjs.com/package/jsonwebtoken) | 9.0.2 |
| [Bcrypt](https://www.npmjs.com/package/bcrypt) | 5.1.1 |
| [Eslint](https://www.npmjs.com/org/eslint) | 8.49.0 |
| [Prettier](https://www.npmjs.com/package/prettier) | 3.0.3 |

## 📝 License

This project is under the license [MIT](https://github.com/hamomgs/dindin/blob/main/LICENCE).

## 🧑‍💻 Authors

<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/gabriel-apolinario-dev/"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/109678980?v=4" width="100px;" alt=""/><br /><sub><b>Gabriel Apolinário</b></sub></a><br /><a href="https://github.com/MrApolinario" title="Gabriel Apolinário">👨‍💻</a></td> 
    <td align="center"><a href="https://www.linkedin.com/in/hamomgs/"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/88857655?v=4" width="100px;" alt=""/><br /><sub><b>Hamom Silva</b></sub></a><br /><a href="https://github.com/hamomgs" title="Hamom Silva">👨‍💻</a></td>
  </tr>
</table>
