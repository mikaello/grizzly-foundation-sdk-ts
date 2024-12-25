local g = import 'github.com/grafana/grafonnet/gen/grafonnet-latest/main.libsonnet';

g.dashboard.new('Example dashboard')
+ g.dashboard.withUid('example-dashboard-name')
+ g.dashboard.withDescription('Example dashboard built with joy')
+ g.dashboard.withAnnotations([])
+ g.dashboard.withEditable(true)
+ g.dashboard.withFiscalYearStartMonth(0)
+ g.dashboard.withPanels([
  g.panel.timeSeries.new('Random walk')
  + g.query.prometheus.withDatasource('grafana')
  + g.panel.timeSeries.queryOptions.withTargets([
    g.query.prometheus.withExpr(
      'random_walk',
    ) + g.query.prometheus.withRefId(''),
  ])
  + g.panel.timeSeries.panelOptions.withRepeatDirection('h')
  + g.panel.timeSeries.panelOptions.withTransparent(false)
  + g.panel.timeSeries.gridPos.withW(12)
  + g.panel.timeSeries.gridPos.withH(9)
  + g.panel.timeSeries.gridPos.withX(0)
  + g.panel.timeSeries.gridPos.withY(0),
])
+ g.dashboard.withTimezone('browser')
+ g.dashboard.withTemplating({})
+ { graphTooltip: 0 }  // 0 is default, but can't be set explicitly
