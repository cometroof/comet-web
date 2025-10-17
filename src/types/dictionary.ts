export type PageDictionary = Record<string, unknown>;

export interface Dictionary {
  [pageName: string]: PageDictionary;
}
