# Docker Compose Setup for PostgreSQL and pgAdmin

This Docker Compose configuration allows you to quickly set up a PostgreSQL database server along with pgAdmin for easy database management.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Usage

1. **Clone this repository:**

   ```bash
   git clone https://git.smartdata.solutions/smartdata/smartskills
   cd smartskills/docker_local
   ```

2. **Adjust the environment variables in the smartskills/docker_local/.env file:**

   ```bash
   # PostgreSQL
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DB=your_database_name

   # pgAdmin
   PGADMIN_DEFAULT_EMAIL=your_pgadmin_email@example.com
   PGADMIN_DEFAULT_PASSWORD=your_pgadmin_password
   ```

3. **Adjust the DATABASE_URL in the smartskills/.env file:**

   ```bash
   DATABASE_URL="postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@127.0.0.1:5432/<POSTGRES_DB>"
   ```

   Replace <POSTGRES_USER>, <POSTGRES_PASSWORD> and <POSTGRES_DB> with values as specified in the .env file.

4. **Start the services using Docker Compose:**

   ```bash
   docker-compose up -d
   ```

   This will start the PostgreSQL server and pgAdmin in the background.

5. **Access pgAdmin in your web browser:**

- URL: http://localhost:5050
- Login with the email and password specified in the .env file.

6. **In pgAdmin, add a new server:**

   ### In the General tab:

   - Name: smartskills (for example)

   ### In the Connection tab:

   - Host name/address: postgres
   - Port: 5432
   - Maintenance database: As specified in the .env file (POSTGRES_DB)
   - Username and password: As specified in the .env file (POSTGRES_USER and POSTGRES_PASSWORD)

## Cleanup

To stop and remove the containers, use the following command:

```bash
docker-compose down
```

This will stop and remove the PostgreSQL and pgAdmin containers, but it will retain the data volume. If you want to remove the data volume as well, add the -v option:

```bash
docker-compose down -v
```

## Notes

- The pgAdmin port is mapped to 5050. You can change this in the docker-compose.yml file if needed.
- The PostgreSQL port is mapped to 5432. You can change this in the docker-compose.yml file if needed.
- The PostgreSQL data is persisted in a Docker volume named postgres-data. This ensures that your data is retained even if you stop and restart the containers.
