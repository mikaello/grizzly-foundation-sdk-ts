# grizzly-foundation-sdk-ts

[![npm](https://img.shields.io/npm/v/@mikaello/grizzly-foundation-sdk-ts.svg?style=flat-square)](https://www.npmjs.com/package/@mikaello/grizzly-foundation-sdk-ts)

> [!WARNING]
> **This project is no longer needed.**
> It was created to wrap Foundation SDK types in Grizzly's `grizzly.grafana.com/v1alpha1` resource format for use with the [Grizzly](https://github.com/grafana/grizzly) CLI.
> Grafana 12 introduced a first-class [Observability as Code](https://grafana.com/docs/grafana/latest/as-code/observability-as-code/) story where the **Foundation SDK is used directly** against Grafana's native Kubernetes-style APIs (e.g. `dashboard.grafana.app/v1`).
> All users are encouraged to migrate:
>
> - Use the [Foundation SDK](https://grafana.com/docs/grafana/latest/as-code/observability-as-code/foundation-sdk/) directly — no Grizzly wrapper needed
> - Deploy via [gcx](https://github.com/grafana/gcx), [Git Sync](https://grafana.com/docs/grafana/latest/as-code/observability-as-code/git-sync/), [Terraform](https://grafana.com/docs/grafana-cloud/as-code/infrastructure-as-code/terraform/), [Grafana Operator](https://grafana.com/docs/grafana-cloud/as-code/infrastructure-as-code/grafana-operator/), [Crossplane](https://github.com/grafana/crossplane-provider-grafana), or [file provisioning](https://grafana.com/docs/grafana/latest/as-code/observability-as-code/provision-resources/)
> - Requires Grafana 12 or later

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
