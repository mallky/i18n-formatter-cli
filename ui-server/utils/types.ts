export interface IConfig {
  addNew?: boolean;
  isKey?: boolean;
  type?: 'line' | 'object'
}

export interface Item {
  id: string;
  text: string;
  config: IConfig;

  value?: Item[];
}
