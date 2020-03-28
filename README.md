![](https://github.com/eddeee888/route-codegen/workflows/route-codegen%20CI/badge.svg)

# route-codegen

This library generates route modules which can be used to manage client-side ( e.g. [react-router](https://github.com/ReactTraining/react-router), [NextJS](https://github.com/zeit/next.js/), etc. ) and server-side routing ( normal `<a />`).

Given a route pattern, automatically detect and generate link components to go to routes in the same app via client-side routing or routes in a different app via server-side routing. Typescript interfaces and helper functions / hooks are generated as well to make routing safe and easy.

This library can help you avoid routing errors like this:

![CRAroutenotfound](https://user-images.githubusercontent.com/33769523/77838225-9de4da00-71bd-11ea-991f-a3721a537dc8.gif)

## Installation

### Single app project

If you only have one app, you can install at project root:

```bash
$ yarn add route-codegen
```

Or

```bash
$ npm i route-codegen
```

Add `route-codegen.yml` to project root. Example:

```yml
apps:
  client:
    routes:
      login: /login
      logout: /logout
      user: /user/:id/:subview(profile|pictures)?
    routingType: ReactRouterV5 # "ReactRouterV5", "NextJS" or "Default" ( normal <a />)
    destinationDir: client/src/routes
```

More details about [config file](#configuration).

### Monorepo / multi-app projects

If you have more than one app and want to manage all routes in one config file, you will need to run the cli command at project root. Run the following at project root:

```bash
$ yarn add -D route-codegen
```

Or

```bash
$ npm i --save-dev route-codegen
```

The library contains some utility functions for the generated files. Therefore, it also needs to be installed in each app:

```bash
$ yarn add route-codegen
```

Or

```bash
$ npm i route-codegen
```

Add `route-codegen.yml` to project root. Example:

```yml
apps:
  client:
    routes:
      login: /login
      logout: /logout
      user: /user/:id/:subview(profile|pictures)?
    routingType: ReactRouterV5 # "ReactRouterV5", "NextJS" or "Default" ( normal <a />)
    destinationDir: client/src/routes

  client-seo:
    routes:
      home: /
    routingType: NextJS
    destinationDir: client-seo/src/routes

  # An app without `routes` is still valid.
  # In this case, this app can still generate url to other apps
  express-server:
    generateLink: false
    destinationDir: server/src/routes

  # Leave out `destinationDir` if no route needs to be generated.
  # Other apps still generates routes to navigate to this app
  legacy:
    routes:
      legacyApp: /legacy/app
```

More details about [config file](#configuration).

## Configuration

Path parameter patterns are from https://github.com/pillarjs/path-to-regexp.

If you have custom links ( e.g. to apply styling on top of underlying link components ), check out the [link options doc](./docs/LINK_OPTIONS.md).

## Generating route modules

```bash
$ yarn route-codegen
```

Or

```bash
$ npx route-codegen
```

### CLI Options

| Name       | Default           | Description                                                                 |
| ---------- | ----------------- | --------------------------------------------------------------------------- |
| config     | route-codegen.yml | The name of the config file.                                                |
| stacktrace | false             | Turn on stack trace. Used to debug errors if they occur.                    |
| verbose    | false             | Turn on infos and logs. Used to see more information about the current run. |

Example

```bash
$ yarn route-codegen --verbose --stacktrace --config path/to/routegen.yml
```

## Developing

### Build it!

We need to build from TS -> JS to be able to run the generator. For the changes to reflect, after making changes in `src`, run the following:

```bash
$ yarn build
```

### Build and run sample config

```bash
$ yarn test:sample
```

Sample config file here can be found [here](./sample/routegen.yml) and the [generated code here](./sample/output)

### How it works

- Read the config.
- Go through each "app".
- Look at the routes needed to generate and destination folders.
- Generate each route modules in the destination folder in different files ( this helps codesplitting ).
- Detect client-side routing ( inner app ) and create components with client-side links based on `routingType` libraries / frameworks.
- Detect server-side routing ( inter app ) and create components with `<a />` underneath.
