# grizzly-foundation-sdk-ts

This library provides utilities for [Grizzly](https://github.com/grafana/grizzly), a utility for managing observability resources on Grafana and hosted Prometheus installations.

## Kubernetes Style Observability Objects

It provides functions to render Kubernetes style objects from Monitoring Mixins.

If deploying dashboards structured to be consumed by [prometheus-ksonnet](https://github.com/grafana/jsonnet-libs/prometheus-ksonnet)
or associated libraries, where other resources are using Tanka, place a file
named `grr.jsonnet` next to your `main.jsonnet`, and give it this content:

```
local main = (import 'main.jsonnet');
local grizzly = (import 'grizzly/grizzly.libsonnet');

grizzly.fromPrometheusKsonnet(main)
```

Then, you can invoke this from Grizzly like so:

`grr show -r environments/<my-environment>/grr.libsonnet`

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
