# ERD : Codersquare

> **This document explores the design of codersquare, a social experience for sharing useful programming resources. We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.**

## Storge

- We'll use a relational database (schema follows) to fast retrieval of posts and comments. A minimal database implementation such as sqlite3 suffices, although we can potentially switch to something with a little more power such as PostgreSql if necessary. Data will be stored on the server on a separate, backed up volume for resilience. There will be no replication or sharding of data at this early stage. We ruled out storage-as-a-service services such as Firestore and the like in order to showcase building a standalone backend for educational purposes.

# Schema

>## Users

| Column | Type |
|--------|------|
| ID | STRING/UUID |
| First/Last name | STRING |
| Password | STRING |
| Email | STRING |
| Username | STRING |


> ### Posts

| Column | Type |
|--------|------|
| ID | STRING/UUID |
| Title | STRING |
| URL | STRING |
| UserId | STRING/UUID (fk_Users.ID) |
| PostedAt | Timestamp |

> ### Likes

| Column | Type |
|--------|------|
| UserId | STRING/UUID |
| PostId | STRING |

> ### Comments

| Column | Type |
|---------|------|
| ID | STRING |
| UserId | STRING/UUID |
| PostId | STRING |
| Comment | STRING |
| PostedAt | Timestamp |

# Server

- Node.js is selected for implementing the server for speed of development.
- Express.js is the web server framework.
- Sequelize to be used as an ORM.

## Authentication / Authorization

> _For v1, a simple JWT-based auth mechanism is to be used, with passwords
encrypted and stored in the database. OAuth is to be added initially or later
for Google + Facebook and maybe others (Github?)._

# Endpoint / RESTApi

1. ## Auth

    ```
    /signin [POST Request].
    /singup [POST Request].
    /singout [POST Request].
    ```
2. ## Posts

    ```
    /posts/list [GET]
    /posts/new  [POST]
    /posts/:id  [GET]
    /posts/:id  [DELETE]
    ```

3. ## Likes

    ```
    /likes/new [POST]
    ```

4. ## Comments

    ```
    /comments/new  [POST]
    /comments/list [GET]
    /comments/:id  [DELETE]
    ```

## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in React.js.
See Figma/screenshots for details.
API server will serve a static bundle of the React app.
Uses ReactQuery to talk to the backend.
Uses Chakra UI for building the CSS components.

## Hosting

The code will be hosted on Github, PRs and issues welcome.

The web client will be hosted using any free web hosting platform such as firebase
or netlify. A domain will be purchased for the site, and configured to point to the
web host's server public IP.

We'll deploy the server to a (likely shared) VPS for flexibility. The VM will have
HTTP/HTTPS ports open, and we'll start with a manual deployment, to be automated
later using Github actions or similar. The server will have closed CORS policy except
for the domain name and the web host server.
