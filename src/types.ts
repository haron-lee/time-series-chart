export interface ChartDataType {
  date: string;
  data: DataType;
}

export interface DataType {
  id: string;
  value_area: number;
  value_bar: number;
}
