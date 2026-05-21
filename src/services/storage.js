import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@doit:tasks';

/**
 * Saves tasks to local storage
 * @param {Array} tasks - The list of tasks to save
 */
export const saveTasks = async tasks => {
  try {
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
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  }
};
