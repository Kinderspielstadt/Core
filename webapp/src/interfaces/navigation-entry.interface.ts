import { FunctionalComponent } from 'vue';
import { RouteLocationRaw } from 'vue-router';

export interface INavigationEntry {
  name: string;
  to?: RouteLocationRaw;
  icon?: FunctionalComponent;
  disabled?: boolean;
}
