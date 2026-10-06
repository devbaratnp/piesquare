export const PROJECT_PROGRESS_STATUSES = ['ONGOING', 'COMPLETED'] as const;

export type ProjectProgressStatus = (typeof PROJECT_PROGRESS_STATUSES)[number];

export function isProjectProgressStatus(value: string): value is ProjectProgressStatus {
  return (PROJECT_PROGRESS_STATUSES as ReadonlyArray<string>).includes(value);
}
