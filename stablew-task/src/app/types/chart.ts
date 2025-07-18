export enum HolderType {
  EOA = "eoa",
  SC = "sc",
}

export interface Holder {
  address: string;
  balance: string;
  type: HolderType;
}

export interface HourlyEntry {
  timestamp: number;
  holders: Holder[];
}

export interface ChartPoint {
  timestamp: number;
  eoaProportion: number;
  scProportion: number;
  totalBalance: bigint;
}
