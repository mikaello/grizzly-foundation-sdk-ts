import { DashboardBuilder } from "@grafana/grafana-foundation-sdk/dashboard";
import { PanelBuilder } from "@grafana/grafana-foundation-sdk/timeseries";
import { DataqueryBuilder } from "@grafana/grafana-foundation-sdk/prometheus";

export let exampleDashboard = new DashboardBuilder("example-dashboard-name")
  .uid("example-dashboard-name")
  .title("Grafonnet example")
  .description("Example dashboard built with Grafonnet")
  .withPanel(
    new PanelBuilder()
      .title("Random walk")
      .datasource({ uid: "grafana" })
      .withTarget(new DataqueryBuilder().expr("random_walk"))
  );
