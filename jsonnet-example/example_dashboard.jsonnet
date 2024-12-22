local g = import 'github.com/grafana/grafonnet/gen/grafonnet-latest/main.libsonnet';

g.dashboard.new('Grafonnet example')
+ g.dashboard.withUid('example-dashboard-name')
+ g.dashboard.withDescription('Example dashboard built with Grafonnet')
+ g.dashboard.withPanels([
  g.panel.timeSeries.new('Random walk')
  + g.panel.timeSeries.queryOptions.withTargets([
    g.query.prometheus.new(
      'grafana',
      'random_walk',
    ),
  ])
  + g.panel.timeSeries.gridPos.withW(24)
  + g.panel.timeSeries.gridPos.withH(8),
])
