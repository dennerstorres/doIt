import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageSyncQueueRepository} from '../AsyncStorageSyncQueueRepository';
import {SyncItem} from '../../../types';

describe('AsyncStorageSyncQueueRepository', () => {
  let repository: AsyncStorageSyncQueueRepository;
  const mockItem: SyncItem = {
    id: '1',
    type: 'SAVE_TASKS',
    payload: [],
    createdAt: new Date().toISOString(),
  };

  beforeEach(async () => {
    repository = new AsyncStorageSyncQueueRepository();
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('should return an empty array if queue is empty', async () => {
    const items = await repository.getAll();
    expect(items).toEqual([]);
  });

  it('should enqueue an item', async () => {
    await repository.enqueue(mockItem);
    const items = await repository.getAll();
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(mockItem);
  });

  it('should dequeue an item', async () => {
    await repository.enqueue(mockItem);
    const item = await repository.dequeue();
    expect(item).toEqual(mockItem);
    const items = await repository.getAll();
    expect(items).toHaveLength(0);
  });

  it('should return null when dequeuing from an empty queue', async () => {
    const item = await repository.dequeue();
    expect(item).toBeNull();
  });

  it('should peek an item without removing it', async () => {
    await repository.enqueue(mockItem);
    const item = await repository.peek();
    expect(item).toEqual(mockItem);
    const items = await repository.getAll();
    expect(items).toHaveLength(1);
  });

  it('should return null when peeking at an empty queue', async () => {
    const item = await repository.peek();
    expect(item).toBeNull();
  });

  it('should clear the queue', async () => {
    await repository.enqueue(mockItem);
    await repository.clear();
    const items = await repository.getAll();
    expect(items).toEqual([]);
  });

  describe('Error handling', () => {
    it('should return empty array if getAll fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );
      const items = await repository.getAll();
      expect(items).toEqual([]);
    });

    it('should throw error if enqueue fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce('[]');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );
      await expect(repository.enqueue(mockItem)).rejects.toThrow();
    });

    it('should throw error if dequeue fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
        JSON.stringify([mockItem]),
      );
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );
      await expect(repository.dequeue()).rejects.toThrow();
    });

    it('should return null if peek fails', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );
      const item = await repository.peek();
      expect(item).toBeNull();
    });

    it('should throw error if clear fails', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValueOnce(
        new Error('AsyncStorage Error'),
      );
      await expect(repository.clear()).rejects.toThrow();
    });
  });
});
