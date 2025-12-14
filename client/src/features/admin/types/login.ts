

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export interface ParticleStyle {
  '--delay': string;
  '--x': string;
  '--y': string;
}