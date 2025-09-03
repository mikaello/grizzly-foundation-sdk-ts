import { createHash } from "node:crypto";

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

/**
 * Useful utility when you are creating review environments in GitLab.
 * This creates a branch postfix you can use to differientiate resources when creating review environments.
 * When on default branch it will be empty string ("").
 *
 * **NB**: GitLab users only!
 */
export const BRANCH_POSTFIX =
  process.env.CI_COMMIT_REF_SLUG !== undefined &&
  process.env.CI_COMMIT_REF_SLUG !== process.env.CI_DEFAULT_BRANCH
    ? "-" +
      createHash("sha256")
        .update(process.env.CI_COMMIT_REF_SLUG)
        .digest("hex")
        .substring(0, 5)
    : "";
