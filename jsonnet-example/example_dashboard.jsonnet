local g = import 'github.com/grafana/grafonnet/gen/grafonnet-latest/main.libsonnet';

g.dashboard.new('Example dashboard')
+ g.dashboard.withUid('example-dashboard-name')
+ g.dashboard.withDescription('Example dashboard built with joy')
+ g.dashboard.withAnnotations([])
+ g.dashboard.withEditable(true)
+ g.dashboard.withFiscalYearStartMonth(0)
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
+ g.dashboard.withTimezone('browser')
