# route-codegen

This generates route objects which can be used to manage inner and inter app routing. Given a route pattern, typescript interfaces are also generated automatically to make routing safe and easy to use.

## Install

```bash
$ yarn add react-route-generator
```

Or

```bash
$ npm i react-route-generator
```

## Create config

Add `routegen.yml` to project root. Example:

```yml
apps:
  client:
    routes:
      login: /app/login
      signup: /app/signup
      logout: /app/logout
      me: /app/me
    routingType: ReactRouter
    generateReactRouterFunctions: false # Use this boolean if you don't want to create typed convenient functions/hooks such as `useParams` or `useRedirect`
    destinationDir: client/src/routes

  client-seo:
    routes:
      home: /
    routingType: NextJS
    destinationDir: client-seo/src/routes
    # Use on of these `reactRouterLinkCreatorPath`, `nextJSLinkCreatorPath`, `defaultLinkCreatorPath` options below if you want to custom how Link is created
    reactRouterLinkCreatorPath: src/common/ui/createCustomReactRouterLink
    nextJSLinkCreatorPath: src/common/ui/createCustomNextJSLink
    defaultLinkCreatorPath: src/common/ui/createDefaultLink

  express-server:
    generateLink: false
    destinationDir: server/src/routes # an app without `routes` is still valid. In this case, this app can still generate url to other apps

  legacy:
    routes:
      legacyApp: /legacy/app # leave out `destinationDir` if no route needs to be generated. Other apps still generate routes to this app
```

## Generate

```bash
$ yarn routegen
```

Or

```bash
$ npx routegen
```

## Running it manually

```ts
import { generate, Config , RoutingType } from 'route-generator';

const config: Config = {
  apps: {
    routes: {
      user: '/app/users/:id'
      account: '/app/account'
    },
    routingType: RoutingType.ReactRouter,
    destinationDir: 'tests/output/app/routes'
  },
  seo: {
    routes: {
      home: '/'
      about: '/about'
      terms: '/terms-and-conditions'
    },
    routingType: RoutingType.NextJS
    destinationDir: 'tests/output/seo/routes'
  },
}

generate(config);
```

## Developing

### Build it!

We need to build from TS -> JS to be able to run the generator. For the changes to reflect, after making changes in `src`, run the following:

```bash
$ yarn run build
```

### Run it!

```bash
$ yarn run generate
```

### Or Do it all in one command!

```bash
$ yarn run test:cli
```

### How it works

- Reads in the config
- Go through each "app"
- Look at the routes it needs to generate and destination folder
- Generate each route into its own file in the destination folder ( this helps codesplitting )
- The files are generated into `tests/output` folder for now

## TODO

- [x] Bring over `createRoute` function which uses the generated types to generate the route objects
- [x] Break `index.ts` into smaller files
- [x] Handle inter app routing
- [x] Handle NextJS routing
- [x] Add yaml file for config
- [x] Make this CLI
- [x] Publish
- [x] Generate route / link creators
- [x] Generate url function needs to take URL query. Maybe pass this into each `createLink` as a function so route & link always have the same function.
- [ ] Tests
- [ ] Set up CI
- [ ] Clean up
