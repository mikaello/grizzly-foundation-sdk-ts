import {
  dashboard,
  folder,
  datasource,
  getFolder,
  fromMap,
  fromMixins,
} from "./grafana";
import { getMixinRuleNames, fromMapsFiltered, rule_group } from "./prometheus";
import { newResource } from "./resource";
import { newCheck } from "./check";

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

export const resource = newResource;
export { dashboard, folder, datasource, rule_group };
export const synthetic_monitoring_check = newCheck;
