import { newResource, withSpec } from "./resource";
import { makeResource } from "./util";

export const getFolder = (main: {
  grafanaDashboardFolder: string | undefined;
}): string => {
  return main.grafanaDashboardFolder || "General";
};

export const fromMap = (
  dashboards: Record<string, any>,
  folder: string
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const k in dashboards) {
    result[k] = makeResource(
      "Dashboard",
      k.replace(/\.json|\.yaml|\.yml$/, ""),
      dashboards[k],
      { folder }
    );
  }
  return result;
};

export const fromMixins = (
  mixins: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const key in mixins) {
    const mixin = mixins[key];
    const folder = mixin.grafanaDashboardFolder || "General";
    for (const k in mixin.grafanaDashboards) {
      result[k] = makeResource(
        "Dashboard",
        k.replace(/\.json|\.yaml|\.yml$/, ""),
        mixin.grafanaDashboards[k],
        { folder }
      );
    }
  }
  return result;
};

export const dashboard = {
  new: (name: string, dashboardJson: any) => {
    const resource = newResource("Dashboard", name);
    return withSpec(resource, dashboardJson);
  },
};

export const folder = {
  new: (name: string, title: string) => {
    const resource = newResource("DashboardFolder", name);
    return withSpec(resource, { title });
  },
};

export const datasource = {
  new: (name: string, datasourceJson: any) => {
    const resource = newResource("Datasource", name);
    return withSpec(resource, datasourceJson);
  },
};
