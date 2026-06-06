import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from '../types';

const STORAGE_KEY = '@doit:tasks';

let inMemoryTasks: Task[] | null = null;

/**
 * Saves tasks to local storage
 * @param tasks - The list of tasks to save
 */
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    inMemoryTasks = tasks;
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    if (__DEV__) {
      console.error('Error saving tasks:', error);
    }
    throw error;
  }
};

/**
 * Retrieves tasks from local storage
 * @returns The list of saved tasks or an empty array
 */
export const getTasks = async (): Promise<Task[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const tasks: Task[] = jsonValue != null ? JSON.parse(jsonValue) : [];
    inMemoryTasks = tasks;
    return tasks;
  } catch (error) {
    if (__DEV__) {
      console.error('Error getting tasks:', error);
    }

    // Fallback to in-memory tasks if storage fails but we have data in memory
    if (inMemoryTasks !== null) {
      if (__DEV__) {
        console.warn('Falling back to in-memory tasks');
      }
      return inMemoryTasks;
    }

    throw error;
  }
};
