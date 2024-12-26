# grizzly-foundation-sdk-ts

This library provides utilities for [Grizzly](https://github.com/grafana/grizzly), a utility for managing observability resources on Grafana and hosted Prometheus installations.

They are converted from the Jsonnet library <https://github.com/grafana/jsonnet-libs/tree/master/grizzly>, so that they can be used form Foundation SDK (TypeScript).
This library is useful / necessary if you want to export multiple types of resources in a single output.

## Develop

Edit the files in [./src](./src) and check your result with `npm run test` or the generate output commands described below.

## Compile test JSON from Grizzly and Foundation SDK

### Grizzly

Prerequisites:

- jsonnet-bundler
- jsonnet
- jq

You can install jsonnet tools with `make install-tools`.

```
$ cd jsonnet-example
$ jb install
$ jsonnet -J vendor main.jsonnet | jq --sort-keys > compiled.json
```

### Foundation SDK

Prerequisites:

- npm
- jq

```
$ cd foundation-sdk-example
$ npm install
$ npm run -s build | jq --sort-keys > compiled.json
```
