export const defaultApiVersion = "grizzly.grafana.com/v1alpha1";

export type Kind = "Datasource"
  | "DashboardFolder"
  | "LibraryElement"
  | "Dashboard"
  | "AlertRuleGroup"
  | "AlertNotificationPolicy"
  | "AlertContactPoint"
  | "AlertNotificationTemplate"
  | "PrometheusRuleGroup"
  | "SyntheticMonitoringCheck";

export type Resource = {
  apiVersion: string;
  kind: Kind;
  metadata: {
    name: string;
  };
};

/**
 * Create a new resource of given kind:
 *
 * ```yml
 * apiVersion: grizzly.grafana.com/v1alpha1
 * kind: <kind>
 * metadata:
 *   name: <name>
 * ```
 *
 * See {@link withApiVersion}, {@link addMetadata} and {@link withSpec} for helper functions that can alter a resource.
 */
export function newResource(kind: Kind, name: string): Resource {
  return {
    apiVersion: defaultApiVersion,
    kind: kind,
    metadata: {
      name: name,
    },
  };
}

export function withApiVersion(resource: Resource, apiVersion: string) {
  return {
    ...resource,
    defaultApiVersion: apiVersion,
    apiVersion: apiVersion,
  };
}

export function addMetadata(resource: Resource, name: string, value: any) {
  return {
    ...resource,
    metadata: {
      ...resource.metadata,
      [name]: value,
    },
  };
}

export function withSpec(resource: Resource, spec: any) {
  return {
    ...resource,
    spec: spec,
  };
}
