import { newResource, addMetadata, withSpec } from "./resource.js";
import { makeResource } from "./util.js";

export const getMixinRuleNames = (mixins: Record<string, any>): string[] => {
  const flatMixins = Object.values(mixins).flat();
  const mixinRules = flatMixins.flatMap(
    (mixin) => mixin.prometheusRules?.groups || []
  );
  const mixinAlerts = flatMixins.flatMap(
    (mixin) => mixin.prometheusAlerts?.groups || []
  );
  return [
    ...mixinAlerts.map((group) => group.name),
    ...mixinRules.map((group) => group.name),
  ];
};

export const fromMaps = (rules: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.keys(rules).map((k) => [
      k,
      makeResource("PrometheusRuleGroup", k, { groups: rules }, {}),
    ])
  );
};

export const fromMapsFiltered = (
  rules: Record<string, any>,
  excludes: string[]
): Record<string, any> => {
  const filterRules = (rules: any, excludeList: string[]) =>
    rules.groups.filter((rule: any) => !excludeList.includes(rule.name));

  return Object.fromEntries(
    Object.keys(rules).map((k) => [
      k,
      makeResource(
        "PrometheusRuleGroup",
        k.replace(/\.json|\.yaml|\.yml$/, ""),
        { groups: filterRules(rules, excludes) },
        {}
      ),
    ])
  );
};

export const fromMixins = (
  mixins: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const key in mixins) {
    const mixin = mixins[key];
    if (mixin.prometheusAlerts || mixin.prometheusRules) {
      result[key] = makeResource(
        "PrometheusRuleGroup",
        key.replace(/\.json|\.yaml|\.yml$/, ""),
        {
          ...(mixin.prometheusAlerts || {}),
          ...(mixin.prometheusRules || {}),
        },
        {}
      );
    }
  }
  return result;
};

export const rule_group = {
  new: (namespace: string, name: string, group: any) => {
    let resource = newResource("PrometheusRuleGroup", name);
    resource = addMetadata(resource, "namespace", namespace);
    resource = withSpec(resource, group);
    return resource;
  },
};
