import type { GraphData } from "./index";
import type { GraphKey } from "./index";

/* ── Cordis Context augmentation (client-side services) ── */
declare module "@deepseek-ai/cordis" {
  interface Context {
    locale: any;
    slots: any;
  }
}

/* ── Slot map augmentation ── */
declare module "@deepseek-ai/dsh-client-ui-slots" {
  interface LocaleNamespaceMap {
    "dsh-plugin-constellation": GraphKey;
  }
  interface SlotMap {
    "settings.section": {
      onClick: () => void;
      label: string;
    };
    "shell.overlay": unknown;
  }
}

export {};
