export interface DatapipelineRun {
  executionId: string | null;
  datapipelineId: string | null;
  fileId: string | null;
  result: JSON | null;
  create_date: Date | null;
  state: string | null;
}
