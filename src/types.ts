export interface ChartDataType {
  [date: string]: DataType;
}

export interface DataType {
  id: string;
  value_area: number;
  value_number: number;
}
