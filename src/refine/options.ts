import type { RefineProps } from "@refinedev/core";

export const options: RefineProps['options'] = {
  syncWithLocation: true,
  warnWhenUnsavedChanges: true,
  useNewQueryKeys: true,
  disableTelemetry: true
}
