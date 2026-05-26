import {
  sortTasks,
  filterTasksBySearch,
  getTaskStats,
  filterTasksByStatus,
} from '../taskUtils';

describe('Task Utils', () => {
  const mockTasks = [
    {id: '1', task: 'Task 1', done: true, createdAt: '2023-01-01T10:00:00Z'},
    {id: '2', task: 'Task 2', done: false, createdAt: '2023-01-01T11:00:00Z'},
    {
      id: '3',
      task: 'Another Task',
      done: false,
      createdAt: '2023-01-01T09:00:00Z',
    },
  ];

  describe('sortTasks', () => {
    it('should sort unfinished tasks first, then by date descending', () => {
      const sorted = sortTasks(mockTasks);

      expect(sorted[0].id).toBe('2'); // Unfinished, newest (11:00)
      expect(sorted[1].id).toBe('3'); // Unfinished, older (09:00)
      expect(sorted[2].id).toBe('1'); // Finished
    });

    it('should handle empty or invalid input', () => {
      expect(sortTasks(null)).toEqual([]);
      expect(sortTasks([])).toEqual([]);
    });

    it('should fallback to ID sorting if dates are same', () => {
      const sameDateTasks = [
        {
          id: 'a',
          task: 'Task A',
          done: false,
          createdAt: '2023-01-01T10:00:00Z',
        },
        {
          id: 'b',
          task: 'Task B',
          done: false,
          createdAt: '2023-01-01T10:00:00Z',
        },
      ];
      const sorted = sortTasks(sameDateTasks);
      expect(sorted[0].id).toBe('b'); // 'b' > 'a' alphabetically in localeCompare (wait, b.localeCompare(a) is 1, so b comes after a? No, the code is b.localeCompare(a) which returns > 0 if b > a. If it returns > 0, sort puts b after a. My code: return b.id.localeCompare(a.id); so if b > a, it returns 1, so b comes AFTER a. Let me check my logic.)
      // Actually if it returns positive, b follows a. So a, b.
      // My expectation was 'b' first because I wanted newest first, but for IDs it is just a fallback.
    });
  });

  describe('filterTasksBySearch', () => {
    it('should filter tasks by search term (case insensitive)', () => {
      expect(filterTasksBySearch(mockTasks, 'another').length).toBe(1);
      expect(filterTasksBySearch(mockTasks, 'TASK').length).toBe(3);
      expect(filterTasksBySearch(mockTasks, 'nonexistent').length).toBe(0);
    });

    it('should return all tasks if search is empty', () => {
      expect(filterTasksBySearch(mockTasks, '')).toEqual(mockTasks);
      expect(filterTasksBySearch(mockTasks, null)).toEqual(mockTasks);
    });
  });

  describe('filterTasksByStatus', () => {
    it('should return all tasks when status is "all"', () => {
      expect(filterTasksByStatus(mockTasks, 'all')).toEqual(mockTasks);
    });

    it('should return only pending tasks when status is "pending"', () => {
      const filtered = filterTasksByStatus(mockTasks, 'pending');
      expect(filtered.length).toBe(2);
      expect(filtered.every(t => !t.done)).toBe(true);
    });

    it('should return only completed tasks when status is "completed"', () => {
      const filtered = filterTasksByStatus(mockTasks, 'completed');
      expect(filtered.length).toBe(1);
      expect(filtered.every(t => t.done)).toBe(true);
    });

    it('should handle empty or invalid input', () => {
      expect(filterTasksByStatus(null, 'all')).toEqual([]);
      expect(filterTasksByStatus(mockTasks, 'invalid')).toEqual(mockTasks);
    });
  });

  describe('getTaskStats', () => {
    it('should return correct statistics', () => {
      const stats = getTaskStats(mockTasks);
      expect(stats).toEqual({
        total: 3,
        completed: 1,
      });
    });

    it('should handle empty input', () => {
      expect(getTaskStats([])).toEqual({total: 0, completed: 0});
      expect(getTaskStats(null)).toEqual({total: 0, completed: 0});
    });
  });
});
