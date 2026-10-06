import { describe, expect, it } from 'vitest';
import { PROJECT_PROGRESS_STATUSES, isProjectProgressStatus } from './project-progress';

describe('project progress status', () => {
  it('accepts only ongoing and completed states', () => {
    expect(PROJECT_PROGRESS_STATUSES).toEqual(['ONGOING', 'COMPLETED']);
    expect(isProjectProgressStatus('ONGOING')).toBe(true);
    expect(isProjectProgressStatus('COMPLETED')).toBe(true);
    expect(isProjectProgressStatus('PUBLISHED')).toBe(false);
  });
});
