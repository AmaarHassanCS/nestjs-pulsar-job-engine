# nestjs-pulsar-job-engine

A nest js microservice based job engine that uses Pulsar, grpc and graphql

## Creation

```
npx create-nx-workspace --preset nest --name jobber --appName jobber-auth
```

This tells nx to create a `nest` project called jobber, and, create an app inside it called jobber-auth

We are also using Discovery module `@golevelup/nestjs-discovery` to dynamically detect/import/query the nest js instruments like modules, controllers, providers etc based on their types or meta keys.

## Setting up common library

`nx generate library <common-lib-name>`
nx supports creation of `application` and `library` in its projects.
These are generated under `./libs`

## Setup Database

- Create docker-compose file with postgres service
- use `docker-compose up -d` to execute
- Download pgadmin4 and create new server. name : `Local`, 'host': `localhost`, password: <pwd> and connect

## Generating protos

Make sure you have protoc protobuf installed

- macOS: brew install protobuf
- Ubuntu: sudo apt-get install protobuf-compiler
- Windows: Download from GitHub and add to PATH.

#### On Windows local

Run this or, `./build-local.sh` file to generate the proto types

or with npx
`npx protoc --ts_proto_out=./types --ts_proto_opt=nestJs=true --proto_path=./proto ./proto/*.proto`

or, without
`protoc --plugin=protoc-gen-ts_proto=$(npm root)/.bin/protoc-gen-ts_proto.cmd --ts_proto_out=./types --ts_proto_opt=nestJs=true --proto_path=./proto ./proto/*.proto`

Once established, and you have added `generate-ts-proto` custom script in the `project.json` and its corresponding changes in `package.json`, you can see run it as
`nx generate-ts-proto jobber-auth`

## Installing and Configuring Prisma

- Install `prisma` cli and `@prisma/client`
- Create a `prisma.schema` file which will define the connection with database and its schema. This file is important because nx will use it to generate type-def files, as well as migrations

### Generating type def

- Go to `project.json` of `jobber-auth` and add a new target for type definitions, e.g. "generate-types" and execute `primsa generate` command for it
- Now simply run the command `nx generate-types jobber-auth` and it will generate output types to the mentioned folder (in schema.prisma) in this case in `node_modules/@prisma-clients/jobber-auth`

### Generating migrations

- To generate migrations, simply add another target in the `project.json` like `migrate-prisma` and add `prisma migrate dev` to it.
- Then cd into `apps/jobber-auth` run `npx prisma migrate dev --schema=prisma/schema.prisma --name users` to automatically check schema diff, and generate migrations if necessary
- or use `nx run jobber-auth:migrate-prisma` since it has `users` migration already written in it

### Creating Prisma Client

- cd `apps/jobber-auth/src/app` and create `prisma` directory
- run `nx generate module prisma`, this will generate a `prisma.module` and link it with `app.module`
- run `nx generate service prisma`, this will generate a `primsa.service` and link it with `prisma.module`
- Extend prisma service with `prisma-clients/jobber-auth` Client, which is the path where all the types generated automatically
- Add the `prisma.service` to Exports of its `prisma.module`
- Now you can use prisma client with its connection to database whereever you like. Simply import the `PrismaClient` from `prisma.service`, make it part of the constructor and access methods inside the class by doing `this.prismaService.user.get()`

## Setting up GraphQL

- set up graphql dependencies
- creating a users
- For cookies based authentication, in graphiql, Click Settings and add this line
  `"request.credentials":"same-origin"`

### Setting up GraphQL

We are going to keep some common code of GraphQL inside the common library created. The packages are already placed in `package.json`.

- To add resolver: `nx generate resolver users`
- To add service: `nx generate service users`

## Execution

- start: `npx nx serve jobber-auth --no-cloud`

- building : `nx build jobber-auth`
- linting : `nx lint jobber-auth`
- testing : `nx test jobber-auth`
