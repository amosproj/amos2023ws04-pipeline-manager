export interface DatapipelineRun {
  file_name:string | null;
  executionId: string | null;
  datapipelineId: string | null;
  fileId: string | null;
  created_date: string | null;
  start_by_user: string | null;
  result: JSON | null;
  state: string | null;
}
