import {
  sortTasks,
  filterTasksBySearch,
  getTaskStats,
  SORT_TYPES,
} from '../taskUtils';
import {Task} from '../../types';

describe('Task Utils', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      task: 'B Task 1',
      done: true,
      createdAt: '2023-01-01T10:00:00Z',
      priority: 'none',
      category: 'none',
      repeat: 'none',
      deadline: null,
    },
    {
      id: '2',
      task: 'C Task 2',
      done: false,
      createdAt: '2023-01-01T11:00:00Z',
      priority: 'none',
      category: 'none',
      repeat: 'none',
      deadline: null,
    },
    {
      id: '3',
      task: 'A Another Task',
      done: false,
      createdAt: '2023-01-01T09:00:00Z',
      priority: 'none',
      category: 'none',
      repeat: 'none',
      deadline: null,
    },
  ];

  describe('sortTasks', () => {
    it('should sort by DEFAULT (unfinished first, then by date descending)', () => {
      const sorted = sortTasks(mockTasks, SORT_TYPES.DEFAULT);

      expect(sorted[0].id).toBe('2'); // Unfinished, newest (11:00)
      expect(sorted[1].id).toBe('3'); // Unfinished, older (09:00)
      expect(sorted[2].id).toBe('1'); // Finished
    });

    it('should sort by DATE_DESC (newest first)', () => {
      const sorted = sortTasks(mockTasks, SORT_TYPES.DATE_DESC);

      expect(sorted[0].id).toBe('2'); // 11:00
      expect(sorted[1].id).toBe('1'); // 10:00
      expect(sorted[2].id).toBe('3'); // 09:00
    });

    it('should sort by DATE_ASC (oldest first)', () => {
      const sorted = sortTasks(mockTasks, SORT_TYPES.DATE_ASC);

      expect(sorted[0].id).toBe('3'); // 09:00
      expect(sorted[1].id).toBe('1'); // 10:00
      expect(sorted[2].id).toBe('2'); // 11:00
    });

    it('should sort by ALPHABETICAL (A-Z)', () => {
      const sorted = sortTasks(mockTasks, SORT_TYPES.ALPHABETICAL);

      expect(sorted[0].task).toBe('A Another Task');
      expect(sorted[1].task).toBe('B Task 1');
      expect(sorted[2].task).toBe('C Task 2');
    });

    it('should handle empty or invalid input', () => {
      expect(sortTasks(null as any)).toEqual([]);
      expect(sortTasks([])).toEqual([]);
    });

    it('should fallback to ID sorting if dates are same in DEFAULT', () => {
      const sameDateTasks: Task[] = [
        {
          id: 'a',
          task: 'Task A',
          done: false,
          createdAt: '2023-01-01T10:00:00Z',
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
        },
        {
          id: 'b',
          task: 'Task B',
          done: false,
          createdAt: '2023-01-01T10:00:00Z',
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
        },
      ];
      const sorted = sortTasks(sameDateTasks, SORT_TYPES.DEFAULT);
      expect(sorted[0].id).toBe('b');
      expect(sorted[1].id).toBe('a');
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
      expect(filterTasksBySearch(mockTasks, null as any)).toEqual(mockTasks);
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
      expect(getTaskStats(null as any)).toEqual({total: 0, completed: 0});
    });
  });
});
