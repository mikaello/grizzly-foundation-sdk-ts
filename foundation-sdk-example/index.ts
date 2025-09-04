import {
  dashboard,
  datasource,
  folder,
  resource,
} from "@mikaello/grizzly-foundation-sdk-ts";

import { exampleDashboard } from "./example-dashboard.ts";
import { exampleDatasource } from "./example-datasource.ts";

let resources = {
  folder: folder.new("example-name", "Example Folder"),
  datasources: [datasource.new("example-datasource-name", exampleDatasource)],
  dashboards: [
    resource.addMetadata(
      dashboard.new("example-dashboard-name", exampleDashboard.build()),
      "folder",
      "example-name",
    ),
  ],
};

// @ts-ignore - not able to remove plugin version from JSONNET output
resources.dashboards[0].spec.panels[0].pluginVersion = "v11.4.0";

console.log(JSON.stringify(resources, null, 2));
