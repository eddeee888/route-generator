# route-codegen

This generates route objects which can be used to manage inner and inter app routing. Given a route pattern, typescript interfaces are also generated automatically to make routing safe and easy to use.

## Install

```bash
$ yarn add route-codegen
```

Or

```bash
$ npm i route-codegen
```

## Create config

Add `route-codegen.yml` to project root. Example:

```yml
apps:
  client:
    routes:
      login: /app/login
      signup: /app/signup
      logout: /app/logout
      me: /app/me
    routingType: ReactRouter
    # Use generateReactRouterFunctions boolean if you don't want to
    # create typed convenient functions/hooks such as `useParams` or `useRedirect`
    generateReactRouterFunctions: false
    destinationDir: client/src/routes

  client-seo:
    routes:
      home: /
    routingType: NextJS
    destinationDir: client-seo/src/routes
    # Use one of these `reactRouterLinkOptions`, `nextJSLinkOptions`, `defaultLinkOptions`
    # options below if you want to custom how Link is created
    reactRouterLinkOptions:
      path: src/common/components/Link
      propsInterfaceName: LinkProps
      hrefProp: href
    nextJSLinkOptions:
      path: src/common/components/NextJSLink
      propsInterfaceName: LinkProps
      hrefProp: href
    defaultLinkOptions:
      path: src/common/ui/Anchor
      propsInterfaceName: AnchorProps
      hrefProp: href

  # an app without `routes` is still valid. In this case, this app can still generate url to other apps
  express-server:
    generateLink: false
    destinationDir: server/src/routes

  # leave out `destinationDir` if no route needs to be generated. Other apps still generate routes to this app
  legacy:
    routes:
      legacyApp: /legacy/app
```

## Generate

```bash
$ yarn route-codegen
```

Or

```bash
$ npx route-codegen
```

## Running it manually

```ts
// routegen.ts
import generate, { Config, RoutingType } from 'route-codegen/dist/generate';

const config: Config = {
  apps: {
    app: {
      routes: {
        user: '/app/users/:id',
        account: '/app/account',
      },
      routingType: RoutingType.ReactRouterV5,
      destinationDir: 'tests/output/app/routes',
    },
    seo: {
      routes: {
        home: '/',
        about: '/about',
        terms: '/terms-and-conditions',
      },
      routingType: RoutingType.NextJS,
      destinationDir: 'tests/output/seo/routes',
    },
  },
};

generate(config);
```

Then run the following in the terminal

```
$ yarn tsc routegen.ts
$ node routegen.js
```

## Developing

### Build it!

We need to build from TS -> JS to be able to run the generator. For the changes to reflect, after making changes in `src`, run the following:

```bash
$ yarn run build
```

### Build and run real config

```bash
$ yarn run test:cli
```

### How it works

- Reads in the config
- Go through each "app"
- Look at the routes it needs to generate and destination folder
- Generate each route into its own file in the destination folder ( this helps codesplitting )
- In dev, the files are generated into `tests/sampleOuput` folder. Check out the [config file here](./sample/routegen.yml) and the [generated code here](./sample/output)
