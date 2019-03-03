# quasar-starter-kit

[![Greenkeeper badge](https://badges.greenkeeper.io/gregory-latinier/quasar-starter-kit.svg)](https://greenkeeper.io/)

An opinionated starter kit for my projects, with Quasar 1.0 and HapiJS

### Install instructions

The project uses yarn. Refer to its [documentation](https://yarnpkg.com/en/docs/install) to install it.

##### Install lerna

```
yarn global add lerna
```

##### Install dependencies of all the packages
This will bootstrap all the projects of the monorepo

```
yarn
lerna bootstrap
```

##### Setup the database

I'm using [mongodb](https://www.mongodb.com/). The easiest way to setup your development environment is to create a free database with a provider, such as [mLab](https://mlab.com/). Follow the instructions and add the mongo database url in the API [.env](https://github.com/gregory-latinier/quasar-starter-kit/blob/develop/packages/api/.env.example) file.

```
MONGODB_URI=mongodb://...
```

##### JWT Secret

Change the JWT secret in the same API [.env](https://github.com/gregory-latinier/quasar-starter-kit/blob/develop/packages/api/.env.example) file.

```
JWT_SECRET=MyS3cR3t
```

##### Add some sample data
In the folder https://github.com/gregory-latinier/quasar-starter-kit/tree/develop/packages/database/sample-data you will find some users to init your database for test

The default password used is `azerty01`

Remember don't use this data for production!

### Let's roll

In the root package run

```
yarn dev
```

The client and admin apps should open.

Happy developing!

### Roadmap

- Repo: Greenkeeper
- Projects: Sentry logs
- Client app: edit profile example
- Sample micro service using the database package
