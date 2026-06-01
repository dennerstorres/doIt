import {createTask, isValidTask} from '../Task';

describe('Task Model', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2023-01-01T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('createTask', () => {
    it('should create a task with correct structure', () => {
      const text = 'New Task';
      const task = createTask(text);

      expect(task).toEqual({
        id: expect.any(String),
        task: 'New Task',
        done: false,
        priority: 'none',
        category: 'none',
        repeat: 'none',
        deadline: null,
        createdAt: '2023-01-01T12:00:00.000Z',
      });
    });

    it('should trim the task text', () => {
      const text = '  Trimmed Task  ';
      const task = createTask(text);
      expect(task.task).toBe('Trimmed Task');
    });

    it('should create a task with specific priority', () => {
      const task = createTask('Important', 'high');
      expect(task.priority).toBe('high');
    });

    it('should create a task with specific category', () => {
      const task = createTask('Shopping list', 'low', 'shopping');
      expect(task.category).toBe('shopping');
    });
  });

  describe('isValidTask', () => {
    it('should return true for valid tasks', () => {
      const task = {
        id: '1',
        task: 'Valid Task',
        done: false,
      } as any;
      expect(isValidTask(task)).toBe(true);
    });

    it('should return false for invalid tasks', () => {
      expect(isValidTask(null)).toBe(false);
      expect(isValidTask({})).toBe(false);
      expect(
        isValidTask({id: 1, task: 'Invalid ID type', done: false} as any),
      ).toBe(false);
      expect(isValidTask({id: '1', task: 123, done: false} as any)).toBe(false);
      expect(isValidTask({id: '1', task: 'No done'} as any)).toBe(false);
    });
  });
});
