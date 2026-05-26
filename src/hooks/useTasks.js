import {useState, useEffect} from 'react';
import {Alert, LayoutAnimation} from 'react-native';
import {saveTasks, getTasks} from '../services/storage';
import {createTask} from '../models/Task';
import {MIN_TASK_LENGTH, MAX_TASK_LENGTH} from '../constants/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        const storedTasks = await getTasks();
        if (isMounted) {
          setTasks(storedTasks);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        if (isMounted) {
          Alert.alert(
            'Erro',
            'Não foi possível carregar suas tarefas. Usando armazenamento temporário.',
          );
          setTasks([]); // Fallback to empty list so user can still use the app
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (tasks !== null) {
      const persistTasks = async () => {
        try {
          await saveTasks(tasks);
        } catch (error) {
          console.error('Error saving tasks:', error);
          Alert.alert(
            'Erro de Persistência',
            'Não foi possível salvar suas alterações localmente.',
          );
        }
      };

      persistTasks();
    }
  }, [tasks]);

  const addTask = taskTitle => {
    const trimmedTask = taskTitle.trim();

    if (!trimmedTask) {
      Alert.alert('Aviso', 'A tarefa não pode estar vazia.');
      return false;
    }

    if (trimmedTask.length < MIN_TASK_LENGTH) {
      Alert.alert(
        'Aviso',
        `A tarefa deve ter pelo menos ${MIN_TASK_LENGTH} caracteres.`,
      );
      return false;
    }

    if (trimmedTask.length > MAX_TASK_LENGTH) {
      Alert.alert(
        'Aviso',
        `A tarefa deve ter no máximo ${MAX_TASK_LENGTH} caracteres.`,
      );
      return false;
    }

    const taskExists = (tasks || []).some(
      t => t.task.toLowerCase() === trimmedTask.toLowerCase(),
    );

    if (taskExists) {
      Alert.alert('Aviso', 'Esta tarefa já existe.');
      return false;
    }

    const newTask = createTask(trimmedTask);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prevTasks => [...(prevTasks || []), newTask]);
    return true;
  };

  const toggleTask = item => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prevTasks =>
      (prevTasks || []).map(t => {
        if (t.id === item.id) {
          return {...t, done: !t.done};
        }
        return t;
      }),
    );
  };

  const deleteTask = item => {
    Alert.alert(
      'Excluir Tarefa?',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setTasks(prevTasks =>
              (prevTasks || []).filter(t => t.id !== item.id),
            );
          },
          style: 'destructive',
        },
      ],
    );
  };

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
  };
};
