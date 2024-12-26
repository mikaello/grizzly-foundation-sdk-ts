export function get<T>(
  obj: Record<string, any>,
  key: string,
  defaultValue: T,
): T {
  return obj.hasOwnProperty(key) ? obj[key] : defaultValue;
}

export function makeResource(
  kind: string,
  name: string,
  resource: any,
  metadata: Record<string, any> = {},
): Record<string, any> {
  return {
    apiVersion: "grizzly.grafana.com/v1alpha1",
    kind,
    metadata: {
      name,
      ...metadata,
    },
    spec: resource,
  };
}
