> [!CAUTION]
> This code is absolute garbage. Deal with it

# Setup the project
Follow these steps to get the project running. \
**Make sure PostgreSQL is installed on your machine.**

```bash
git clone https://github.com/m2x07/todoapp
```

### Prepare the files:
Create two files `frontend/.env` and `backend/.env` \
Fill in both the files as per example below:

- `frontend/.env`
```
# "VITE_" prefix is used because vite only identifies keys with that prefix
VITE_BACKEND_URL="http://localhost:3000"
```

- `backend/.env`
```
DATABASE_CONNECTION_STRING="your_postgres_string_here"

# Default port for vitejs is 5173
FRONTEND_URL="http://localhost:5173"

# port where our backend will be running
BACKEND_PORT=3000
```

### Setup the DB:
In the ROOT directory of this project lies a `init.sql` file which will initialize the proper database for you and add few example rows to it. \
Run the command:
```bash
psql -U postgres -f init.sql
```
Substitute `postgres` with whatever postgres user you are using.

### Run the project:
This project is configured using [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces), so all the dependencies will be installed in the ROOT directory.

Run the following in the ROOT directory, **NOT** in `frontend/` or `backend/`.
```
npm install
```

```
npm start       # starts backend and frontend concurrently
```

`npm run frontend` and `npm run backend` are available to run frontend and backend individually.

Great, now both back-end and front-end should be available on your localhost.
