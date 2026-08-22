/* Ambient shim: react-dom is a loader seed module; only createPortal is used.
   Kept in a script-scope .d.ts so it applies even without @types/react-dom. */
declare module "react-dom" {
  import type React from "react";
  export function createPortal(children: React.ReactNode, container: Element, key?: string | null): React.ReactPortal;
}
