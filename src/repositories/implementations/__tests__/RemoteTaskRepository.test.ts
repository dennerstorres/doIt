import {api} from '../../../services/api';
import {RemoteTaskRepository} from '../RemoteTaskRepository';
import {Task} from '../../../types';

jest.mock('../../../services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('RemoteTaskRepository', () => {
  let repository: RemoteTaskRepository;
  const mockTask: Task = {
    id: '1',
    task: 'Remote Task',
    done: false,
    priority: 'none',
    category: 'none',
    repeat: 'none',
    archived: false,
    deadline: null,
    createdAt: '2023-01-01T12:00:00.000Z',
    updatedAt: '2023-01-01T12:00:00.000Z',
    completedAt: null,
    deleted: false,
  };

  beforeEach(() => {
    repository = new RemoteTaskRepository();
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch tasks from the /tasks endpoint', async () => {
      (api.get as jest.Mock).mockResolvedValueOnce({data: [mockTask]});

      const result = await repository.getAll();

      expect(api.get).toHaveBeenCalledWith('/tasks');
      expect(result).toEqual([mockTask]);
    });

    it('should throw error if api.get fails', async () => {
      const error = new Error('Network error');
      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(repository.getAll()).rejects.toThrow('Network error');
    });
  });

  describe('saveAll', () => {
    it('should post tasks to the /tasks endpoint', async () => {
      (api.post as jest.Mock).mockResolvedValueOnce({data: {}});

      const tasks = [mockTask];
      await repository.saveAll(tasks);

      expect(api.post).toHaveBeenCalledWith('/tasks', {tasks});
    });

    it('should throw error if api.post fails', async () => {
      const error = new Error('Network error');
      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(repository.saveAll([mockTask])).rejects.toThrow(
        'Network error',
      );
    });
  });
});
