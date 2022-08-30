export interface dataType {
  week: Array<itemType>;
  month: Array<itemType>;
  year: Array<itemType>;
  final: Array<itemType>;
}

export interface itemType {
  title: string;
  content: string;
}
