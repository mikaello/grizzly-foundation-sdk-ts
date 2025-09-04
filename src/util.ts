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
 *
 * When on default branch it will be empty string (""). When on feature branch it will be a dash ("-")
 * followed by a substring of the hash of the branch name.
 *
 * **NB**: GitLab users only!
 *
 * @example Add branch prefix for rule group
 * ```ts
 * import { BRANCH_POSTFIX } from '@mikaello/grizzly-foundation-sdk-ts';
 *
 *  new RuleGroupBuilder('GitLab')
 *    .withRule(
 *      new RuleBuilder('Prod Uptime')
 *        .uid(`gitlab-prod-uptime${BRANCH_POSTFIX}`)
 *        // ...
 *     )
 * ```
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
