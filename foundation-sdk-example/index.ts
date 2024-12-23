// folder from @grafana/grafana-foundation-sdk
//import { folder } from "@grafana/grafana-foundation-sdk";

import {
  dashboard,
  datasource,
  folder,
  resource,
} from "@mikaello/grizzly-foundation-sdk-ts";

import { exampleDashboard } from "./example-dashboard.js";
import { exampleDatasource } from "example-datasource.js";

let resources = {
  folder: folder.new("example-name", "Example Folder"),
  datasources: [datasource.new("example-datasource-name", exampleDatasource)],
  dashboards: [
    resource.addMetadata(
      dashboard.new("example-dashboard-name", exampleDashboard.build()),
      "folder",
      "example-name"
    ),
  ],
};

console.log(JSON.stringify(resources, null, 2));
