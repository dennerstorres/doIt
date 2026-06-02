import {
  sortTasks,
  filterTasksBySearch,
  getTaskStats,
  calculateStreak,
  SORT_TYPES,
  isToday,
} from '../taskUtils';
import {Task} from '../../types';

describe('Task Utils', () => {
  const todayISO = new Date().toISOString();
  const mockTasks: Task[] = [
    {
      id: '1',
      task: 'B Task 1',
      done: true,
      createdAt: '2023-01-01T10:00:00Z',
      priority: 'none',
      category: 'none',
      repeat: 'none',
      archived: false,
      deadline: null,
      completedAt: '2023-01-01T10:30:00Z',
    },
    {
      id: '2',
      task: 'C Task 2',
      done: false,
      createdAt: '2023-01-01T11:00:00Z',
      priority: 'none',
      category: 'none',
      repeat: 'none',
      archived: false,
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
      archived: false,
      deadline: null,
    },
  ];

  describe('isToday', () => {
    it('should return true for current date', () => {
      expect(isToday(todayISO)).toBe(true);
    });

    it('should return false for past date', () => {
      expect(isToday('2020-01-01T10:00:00Z')).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(isToday(null)).toBe(false);
      expect(isToday(undefined)).toBe(false);
    });
  });

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
          archived: false,
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
          archived: false,
          deadline: null,
        },
      ];
      const sorted = sortTasks(sameDateTasks, SORT_TYPES.DEFAULT);
      expect(sorted[0].id).toBe('b');
      expect(sorted[1].id).toBe('a');
    });
  });

  describe('calculateStreak', () => {
    it('should return 0 if no tasks', () => {
      expect(calculateStreak([])).toBe(0);
      expect(calculateStreak(null as any)).toBe(0);
    });

    it('should return 1 if task completed today', () => {
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Task 1',
          done: true,
          completedAt: new Date().toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: new Date().toISOString(),
        },
      ];
      expect(calculateStreak(tasks)).toBe(1);
    });

    it('should return 1 if task completed yesterday but none today', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Task 1',
          done: true,
          completedAt: yesterday.toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: yesterday.toISOString(),
        },
      ];
      expect(calculateStreak(tasks)).toBe(1);
    });

    it('should return 2 if tasks completed today and yesterday', () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Today',
          done: true,
          completedAt: today.toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: today.toISOString(),
        },
        {
          id: '2',
          task: 'Yesterday',
          done: true,
          completedAt: yesterday.toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: yesterday.toISOString(),
        },
      ];
      expect(calculateStreak(tasks)).toBe(2);
    });

    it('should return 3 for a 3-day streak', () => {
      const dates = [0, 1, 2].map(daysAgo => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString();
      });

      const tasks: Task[] = dates.map((date, index) => ({
        id: String(index),
        task: `Task ${index}`,
        done: true,
        completedAt: date,
        archived: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        deadline: null,
        createdAt: date,
      }));

      expect(calculateStreak(tasks)).toBe(3);
    });

    it('should reset streak if there is a gap', () => {
      const today = new Date();
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const tasks: Task[] = [
        {
          id: '1',
          task: 'Today',
          done: true,
          completedAt: today.toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: today.toISOString(),
        },
        {
          id: '2',
          task: 'Two days ago',
          done: true,
          completedAt: twoDaysAgo.toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: twoDaysAgo.toISOString(),
        },
      ];
      // Streak is 1 because yesterday is missing
      expect(calculateStreak(tasks)).toBe(1);
    });

    it('should return 0 if last completion was 2 days ago', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const tasks: Task[] = [
        {
          id: '2',
          task: 'Two days ago',
          done: true,
          completedAt: twoDaysAgo.toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: twoDaysAgo.toISOString(),
        },
      ];
      expect(calculateStreak(tasks)).toBe(0);
    });

    it('should ignore archived or not done tasks', () => {
      const today = new Date();
      const tasks: Task[] = [
        {
          id: '1',
          task: 'Archived',
          done: true,
          completedAt: today.toISOString(),
          archived: true,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: today.toISOString(),
        },
        {
          id: '2',
          task: 'Not done',
          done: false,
          completedAt: today.toISOString(),
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: today.toISOString(),
        },
      ];
      expect(calculateStreak(tasks)).toBe(0);
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
    it('should return correct statistics excluding archived tasks', () => {
      const tasksWithArchived: Task[] = [
        ...mockTasks,
        {
          id: '4',
          task: 'Archived Task',
          done: false,
          archived: true,
          createdAt: '2023-01-01T12:00:00Z',
          priority: 'high',
          category: 'work',
          repeat: 'none',
          deadline: null,
        },
      ];
      const stats = getTaskStats(tasksWithArchived);
      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(1);
      expect(stats.completionPercentage).toBe(33);
      expect(stats.totalArchived).toBe(1);
      expect(stats.byPriority.none).toBe(3);
      expect(stats.byPriority.high).toBe(0); // Archived task should be ignored
    });

    it('should calculate breakdown by priority and category', () => {
      const diverseTasks: Task[] = [
        {
          id: '1',
          task: 'Task 1',
          done: true,
          priority: 'high',
          category: 'work',
          archived: false,
          repeat: 'none',
          deadline: null,
          createdAt: '2023-01-01T10:00:00Z',
        },
        {
          id: '2',
          task: 'Task 2',
          done: false,
          priority: 'medium',
          category: 'personal',
          archived: false,
          repeat: 'none',
          deadline: null,
          createdAt: '2023-01-01T10:00:00Z',
        },
        {
          id: '3',
          task: 'Task 3',
          done: true,
          priority: 'high',
          category: 'work',
          archived: false,
          repeat: 'none',
          deadline: null,
          createdAt: '2023-01-01T10:00:00Z',
        },
      ];

      const stats = getTaskStats(diverseTasks);
      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(2);
      expect(stats.completionPercentage).toBe(67);
      expect(stats.byPriority.high).toBe(2);
      expect(stats.byPriority.medium).toBe(1);
      expect(stats.byCategory.work).toBe(2);
      expect(stats.byCategory.personal).toBe(1);
    });

    it('should calculate dailyProgress correctly', () => {
      const dailyTasks: Task[] = [
        {
          id: '1',
          task: 'Done today',
          done: true,
          completedAt: todayISO,
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: todayISO,
        },
        {
          id: '2',
          task: 'Pending',
          done: false,
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: todayISO,
        },
        {
          id: '3',
          task: 'Done yesterday',
          done: true,
          completedAt: '2023-01-01T10:00:00Z',
          archived: false,
          priority: 'none',
          category: 'none',
          repeat: 'none',
          deadline: null,
          createdAt: '2023-01-01T09:00:00Z',
        },
      ];

      const stats = getTaskStats(dailyTasks);
      expect(stats.dailyProgress).toBe(50); // 1 completed today / (1 completed today + 1 pending)
    });

    it('should handle empty input', () => {
      const emptyStats = {
        total: 0,
        completed: 0,
        completionPercentage: 0,
        byPriority: {none: 0, low: 0, medium: 0, high: 0},
        byCategory: {
          none: 0,
          work: 0,
          personal: 0,
          shopping: 0,
          health: 0,
          study: 0,
        },
        totalArchived: 0,
        dailyProgress: 0,
        streak: 0,
      };
      expect(getTaskStats([])).toEqual(emptyStats);
      expect(getTaskStats(null as any)).toEqual(emptyStats);
    });
  });
});
