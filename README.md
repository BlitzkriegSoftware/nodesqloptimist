# nodesqloptimist

A demo of SQL Optimistic Locking with NodeJS and using the ORM [Knex](https://knexjs.org/)

# SQL Server in Docker

> Make sure docker is running

## Start

1. `cd Scripts/`

2. run `.\scripts\Sql-Start.ps1`

3. This exports the following environment variables (you may need to reload the shell to have these seen)

| ENVVAR       | Type    | Use                    | Value                                                                                     |
| :----------- | :------ | :--------------------- | :---------------------------------------------------------------------------------------- |
| BLITZSQL     | string  | Full Connection String | `Server=127.0.0.1,1433;Database=Northwind;User Id=sa;Password=blitz!2023stw-;Encrypt=no;` |
| BLITZSQLNAME | string  | Database name          | `Northwind`                                                                               |
| BLITZSQLPASS | string  | Password               | `blitz!2023stw-`                                                                          |
| BLITZSQLPORT | integer | Port                   | `1433`                                                                                    |

## Stop

1. run `.\scripts\Sql-Stop.ps1`

# Demo

1. The demo script must be run
2. Your shell may need to be re-started to get the exported environment variables
3. `jest` to run the demo, set breakpoints to debug

# References

- https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver16
