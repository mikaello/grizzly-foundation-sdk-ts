export const defaultApiVersion = "grizzly.grafana.com/v1alpha1";

type Resource = {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
};

export function newResource(kind: string, name: string): Resource {
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