export type IGetDataRes = {
  topic: string;
  country: string;
  phrase_search: string;
  columnNames: string[];
  raw_related_data: string[][];
  raw_broadmatch_data: string[][];
  raw_question_data: string[][];
  request_id: string;
  status: number;
  created_date: string
}