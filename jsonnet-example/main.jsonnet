local grr = import 'github.com/grafana/jsonnet-libs/grizzly/grizzly.libsonnet';

{
  folder: grr.folder.new('example-name', 'Example Folder'),
  datasources: [
    grr.datasource.new('example-datasource-name', (import 'example_datasource.jsonnet')),
  ],
  dashboards: [
    grr.dashboard.new('example-dashboard-name', (import 'example_dashboard.jsonnet'))
    + grr.resource.addMetadata('folder', 'example-name'),
  ],

  // See a more extensive example at https://github.com/grafana/grizzly/blob/main/examples/grr.jsonnet
}
