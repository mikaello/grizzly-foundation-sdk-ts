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

export type Resource<T extends Kind> = {
  apiVersion: string;
  kind: T;
  metadata: {
    name: string;
    [key: string]: any;
  };
  spec?: any;
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
export function newResource<T extends Kind>(kind: T, name: string): Resource<T> {
  return {
    apiVersion: defaultApiVersion,
    kind: kind,
    metadata: {
      name: name,
    },
  };
}

export function withApiVersion<T extends Kind>(resource: Resource<T>, apiVersion: string): Resource<T> {
  return {
    ...resource,
    apiVersion: apiVersion,
  };
}

export function addMetadata<T extends Kind>(resource: Resource<T>, name: string, value: any): Resource<T> {
  return {
    ...resource,
    metadata: {
      ...resource.metadata,
      [name]: value,
    },
  };
}

export function withSpec<T extends Kind>(resource: Resource<T>, spec: any): Resource<T> {
  return {
    ...resource,
    spec: spec,
  };
}
