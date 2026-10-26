export const PHONE: string;
export const EMAIL: string;
export const NAV: { id?: string; l: string; hub?: string; kids?: [string, string][] }[];
export const MEGA: Record<string, { e: string; t: string; d: string; s: [string, string]; i: Record<string, [string, string]> }>;
export const TITLE: Record<string, string>;
export const PARENT: Record<string, { l: string; hub?: string }>;
export const P: Record<string, () => string>;
export const W: Record<string, string[]>;
export function renderPage(id: string): string;
