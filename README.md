# nodesqloptimist

A demo of Microsoft SQL Server Optimistic Locking with NodeJS and using the ORM [Knex](https://knexjs.org/)

# SQL Server in Docker

> Make sure docker is running

## Start

1. run `.\scripts\Start-DockerSql.ps1`

1. This exports the following environment variables (you may need to reload the shell to have these seen)

| ENVVAR       | Type    | Use                    | Value                                                                                     |
| :----------- | :------ | :--------------------- | :---------------------------------------------------------------------------------------- |
| BLITZSQL     | string  | Full Connection String | `Server=127.0.0.1,1433;Database=Northwind;User Id=sa;Password=blitz!2023stw-;Encrypt=no;` |
| BLITZSQLNAME | string  | Database name          | `Northwind`                                                                               |
| BLITZSQLPASS | string  | Password               | `blitz!2023stw-`                                                                          |
| BLITZSQLPORT | integer | Port                   | `1433`                                                                                    |

## Stop

1. run `.\scripts\Stop-DockerSql.ps1`

# Demo

1. The demo script must be run
2. Your shell may need to be re-started to get the exported environment variables
3. `jest` to run the demo, set breakpoints to debug

# References

- [Microsoft SQL Row Versioning and Locking](https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver16)

- [Knex Documentation](https://devhints.io/knex)

- [Node parallelism in action](https://pragmaticaweds.hashnode.dev/concurrency-and-parallelism-in-nodejs-boosting-performance#heading-understanding-concurrency-in-nodejs)

- [Node Documentation Worker](https://nodejs.org/api/worker_threads.html#class-worker)
