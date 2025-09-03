import { newResource, withSpec } from "./resource.ts";
import { makeResource } from "./util.ts";

export const getFolder = (main: {
  grafanaDashboardFolder: string | undefined;
}): string => {
  return main.grafanaDashboardFolder || "General";
};

export const fromMap = (
  dashboards: Record<string, any>,
  folder: string,
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const k in dashboards) {
    result[k] = makeResource(
      "Dashboard",
      k.replace(/\.json|\.yaml|\.yml$/, ""),
      dashboards[k],
      { folder },
    );
  }
  return result;
};

export const fromMixins = (
  mixins: Record<string, any>,
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
        { folder },
      );
    }
  }
  return result;
};

/**
 * Create a new Dashboard resource:
 *
 * ```yml
 * apiVersion: grizzly.grafana.com/v1alpha1
 * kind: Dashboard
 * metadata:
 *   name: <name>
 * spec:
 *   <datasourceJson>
 * ```
 */
export const dashboard = {
  new: (name: string, dashboardJson: any) => {
    const resource = newResource("Dashboard", name);
    return withSpec(resource, dashboardJson);
  },
};

/**
 * Create a new Folder resource:
 *
 * ```yml
 * apiVersion: grizzly.grafana.com/v1alpha1
 * kind: Datasource
 * metadata:
 *   name: <name>
 * spec:
 *   title: <title>
 * ```
 */
export const folder = {
  new: (name: string, title: string) => {
    const resource = newResource("DashboardFolder", name);
    return withSpec(resource, { title });
  },
};

/**
 * Create a new Datasource resource:
 *
 * ```yml
 * apiVersion: grizzly.grafana.com/v1alpha1
 * kind: Datasource
 * metadata:
 *   name: <name>
 * spec:
 *   <datasourceJson>
 * ```
 */
export const datasource = {
  new: (name: string, datasourceJson: any) => {
    const resource = newResource("Datasource", name);
    return withSpec(resource, datasourceJson);
  },
};

/**
 * Create a new AlertContactPoint resource:
 *
 * ```yml
 * apiVersion: grizzly.grafana.com/v1alpha1
 * kind: AlertContactPoint
 * metadata:
 *   name: <name>
 * spec:
 *   <datasourceJson>
 * ```
 */
export const alertContactPoint = {
  new: (name: string, datasourceJson: any) => {
    const resource = newResource("AlertContactPoint", name);
    return withSpec(resource, datasourceJson);
  },
};

/**
 * The alert folder will be combined with name in the generated resource.
 *
 * Create a new AlertRuleGroup resource:
 * ```yml
 * apiVersion: grizzly.grafana.com/v1alpha1
 * kind: AlertRuleGroup
 * metadata:
 *   name: <folder>.<name>
 * spec:
 *   <datasourceJson>
 * ```
 */
export const alertRuleGroup = {
  new: (folder: string, name: string, datasourceJson: any) => {
    const resource = newResource("AlertRuleGroup", `${folder}.${name}`);
    return withSpec(resource, datasourceJson);
  },
};
