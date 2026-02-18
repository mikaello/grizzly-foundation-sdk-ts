import { newResource, withSpec, type Resource } from "./resource.ts";
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
 * @see Use `ManifestBuilder` from \@grafana/grafana-foundation-sdk/resource instead.
 */
export const dashboard = {
  new: (name: string, dashboardJson: any): Resource<"Dashboard"> => {
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
  new: (name: string, title: string): Resource<"DashboardFolder"> => {
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
  new: (name: string, datasourceJson: any): Resource<"Datasource"> => {
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
 *   <alertContactPointJson>
 * ```
 */
export const alertContactPoint = {
  new: (
    name: string,
    alertContactPointJson: any,
  ): Resource<"AlertContactPoint"> => {
    const resource = newResource("AlertContactPoint", name);
    return withSpec(resource, alertContactPointJson);
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
 *   <alertRuleGroupJson>
 * ```
 */
export const alertRuleGroup = {
  new: (
    folder: string,
    name: string,
    alertRuleGroupJson: any,
  ): Resource<"AlertRuleGroup"> => {
    const resource = newResource("AlertRuleGroup", `${folder}.${name}`);
    return withSpec(resource, alertRuleGroupJson);
  },
};

/**
 * The notification template will be combined with name in the generated resource.
 *
 * Create a new AlertNotificationTemplate resource:
 * ```yml
 * apiVersion: grizzly.grafana.com/v1alpha1
 * kind: AlertNotificationTemplate
 * metadata:
 *   name: <name>
 * spec:
 *   <alertNotificationTemplateJson>
 * ```
 */
export const alertNotificationTemplate = {
  new: (
    name: string,
    templateJson: any,
  ): Resource<"AlertNotificationTemplate"> => {
    const resource = newResource("AlertNotificationTemplate", name);
    return withSpec(resource, templateJson);
  },
};
