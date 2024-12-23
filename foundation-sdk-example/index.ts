// folder from @grafana/grafana-foundation-sdk
//import { folder } from "@grafana/grafana-foundation-sdk";

import {
  dashboard,
  datasource,
  folder,
} from "@mikaello/grizzly-foundation-sdk-ts";

import { exampleDashboard } from "./example-dashboard.js";

let resources = {
  folder: folder.new("example-folder", "Example Folder"),
  datasources: [
    datasource.new("example-datasource", { title: "Example Datasource" }),
  ],
  dashboards: [
    dashboard.new("example-dashboard-name", exampleDashboard.build()),
  ],
};

console.log(JSON.stringify(resources, null, 2));
