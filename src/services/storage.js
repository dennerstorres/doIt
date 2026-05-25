import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@doit:tasks';

let inMemoryTasks = null;

/**
 * Saves tasks to local storage
 * @param {Array} tasks - The list of tasks to save
 */
export const saveTasks = async tasks => {
  try {
    inMemoryTasks = tasks;
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw error;
  }
};

/**
 * Retrieves tasks from local storage
 * @returns {Promise<Array>} The list of saved tasks or an empty array
 */
export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const tasks = jsonValue != null ? JSON.parse(jsonValue) : [];
    inMemoryTasks = tasks;
    return tasks;
  } catch (error) {
    console.error('Error getting tasks:', error);

    // Fallback to in-memory tasks if storage fails but we have data in memory
    if (inMemoryTasks !== null) {
      console.warn('Falling back to in-memory tasks');
      return inMemoryTasks;
    }

    throw error;
  }
};
