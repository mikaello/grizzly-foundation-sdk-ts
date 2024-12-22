import { newResource, addMetadata, withSpec } from "./resource";

export function newCheck(type: string, name: string, check: object) {
  let resource = newResource("SyntheticMonitoringCheck", name);
  resource = addMetadata(resource, "type", type);
  resource = withSpec(resource, check);
  return resource;
}
