declare module '@glidejs/glide' {
  export interface GlideOptions {
    type?: string;
    startAt?: number;
    perView?: number;
    focusAt?: string | number;
    gap?: number;
    animationDuration?: number;
    hoverpause?: boolean;
    breakpoints?: Record<number, Partial<GlideOptions>>;
  }

  export default class Glide {
    constructor(selector: string | HTMLElement, options?: GlideOptions);
    mount(): void;
    go(pattern: string): void;
    destroy(): void;
    on(event: string | Array<string>, callback: (data: unknown) => void): void;
    index: number;
  }
}