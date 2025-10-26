import GlobeIcon from "@public/globe.svg";

import type { AppRegistryProps } from "../types";

export const AppRegistry: AppRegistryProps = {
  apps: [
    {
      id: "test-1",
      name: "Test 1",
      icon: GlobeIcon,
      defaultWidth: 320,
      defaultHeight: 200,
    },
    {
      id: "test-2",
      name: "Test 2",
      icon: GlobeIcon,
      defaultWidth: 320,
      defaultHeight: 200,
    },
    {
      id: "test-3",
      name: "Test 3",
      icon: GlobeIcon,
      defaultWidth: 320,
      defaultHeight: 200,
    },
  ],
};
