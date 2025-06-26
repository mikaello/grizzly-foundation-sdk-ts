import {
  alertContactPoint,
  alertRuleGroup,
  dashboard,
  folder,
  datasource,
  getFolder,
  fromMap,
  fromMixins,
} from "./grafana.ts";
import {
  getMixinRuleNames,
  fromMapsFiltered,
  rule_group,
} from "./prometheus.ts";
import {
  defaultApiVersion,
  withApiVersion,
  addMetadata,
  newResource,
  withSpec,
} from "./resource.ts";
import { newCheck } from "./check.ts";

type Main = {
  grafanaDashboards: Record<string, any>;
  grafanaDashboardFolder: string | undefined;
  prometheusAlerts: Record<string, any>;
  prometheusRules: Record<string, any>;
  mixins: Record<string, any>;
};

export const fromPrometheusKsonnet = (main: Main) => {
  const dashboardFolder = getFolder(main);
  const mixinRules = getMixinRuleNames(main.mixins);

  return {
    grafana: {
      ...fromMap(main.grafanaDashboards, dashboardFolder),
      ...fromMixins(main.mixins),
    },
    prometheus: {
      ...fromMapsFiltered(main.prometheusAlerts, mixinRules),
      ...fromMapsFiltered(main.prometheusRules, mixinRules),
      ...fromMixins(main.mixins),
    },
  };
};

export const resource = {
  defaultApiVersion,
  withApiVersion,
  addMetadata,
  newResource,
  withSpec,
};
export {
  alertContactPoint,
  alertRuleGroup,
  dashboard,
  folder,
  datasource,
  rule_group,
};
export const synthetic_monitoring_check = newCheck;
