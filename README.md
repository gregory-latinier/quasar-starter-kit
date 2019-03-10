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

### Reverse proxy

As both admin and client webapp use the same domain, localhost, you won't be able to develop both apps at the same time unless you use a reverse proxy because the access token is stored in a cookie.

A way to fix this is is to use nginx for example.

Here is a sample conf

```
server {
	client_max_body_size 4G;
	listen       80;
	server_name  dev.qsk.com;

	location / {
		proxy_pass        http://localhost:8080;
		proxy_redirect  off;
		proxy_set_header        Host            $host;
		proxy_set_header        X-Real-IP       $remote_addr;
		proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}
```
Include this in your nginx.conf, replace the server name with your domain.
Update your host file with

```
127.0.0.1 dev.qsk.com
127.0.0.1 dev.admin.qsk.com
127.0.0.1 dev.api.qsk.com
```

### Let's roll

In the root package run

```
yarn dev
```

The client and admin apps should open.

Happy developing!

### Roadmap

- Client app: edit profile example
- Sample micro service using the database package
