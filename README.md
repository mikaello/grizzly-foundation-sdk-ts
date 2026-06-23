# grizzly-foundation-sdk-ts

[![npm](https://img.shields.io/npm/v/@mikaello/grizzly-foundation-sdk-ts.svg?style=flat-square)](https://www.npmjs.com/package/@mikaello/grizzly-foundation-sdk-ts)

> [!WARNING]
> **This project is no longer actively maintained.**
> Grizzly has been superseded by the [gcx CLI](https://github.com/grafana/gcx) tool, and Grafana resources should now use the new API version `grizzly.grafana.com/v1alpha1`.
> All users are encouraged to migrate to the new API version and deploy resources using [gcx](https://github.com/grafana/gcx) or other tooling such as Terraform, grafana-operator, Crossplane, or git-sync.

This library provides utilities for [Grizzly](https://github.com/grafana/grizzly), a utility for managing observability resources on Grafana and hosted Prometheus installations.

They are converted from the Jsonnet library <https://github.com/grafana/jsonnet-libs/tree/master/grizzly>, so that they can be used from Foundation SDK (TypeScript).
This library is useful / necessary if you want to export multiple types of resources in a single output.

## Install

```shell
npm install @mikaello/grizzly-foundation-sdk-ts
```

See example usage in [./foundation-sdk-example](./foundation-sdk-example).

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
