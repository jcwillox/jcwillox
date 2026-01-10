declare global {
  type ReactNode = typeof import("react").ReactNode;

  declare module "*?lqip" {
    const lqip: {
      lqip: string;
      width: number;
      height: number;
      src: string;
    };
    export default lqip;
  }

  declare module "*?lqip&react" {
    import type { FC, ImgHTMLAttributes } from "react";
    const component: FC<ImgHTMLAttributes<HTMLImageElement>>;
    export default component;
  }

  interface ImportMetaEnv {
    readonly VITE_EDGE_CONFIG: string;
    readonly GITHUB_TOKEN: string;
  }
}

export {};
