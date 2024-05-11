import { useDark, useToggle } from '@vueuse/core';

export const isDark = useDark({
  selector: 'body',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
});
export const toggleDark = useToggle(isDark);
