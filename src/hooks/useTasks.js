import {useState, useEffect} from 'react';
import {Alert, LayoutAnimation} from 'react-native';
import {saveTasks, getTasks} from '../services/storage';
import {createTask} from '../models/Task';
import {
  MIN_TASK_LENGTH,
  MAX_TASK_LENGTH,
  TASK_PRIORITIES,
} from '../constants/tasks';

const animationConfig = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export const useTasks = () => {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastDeletedTask, setLastDeletedTask] = useState(null);

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

  const addTask = (taskTitle, priority = TASK_PRIORITIES.NONE) => {
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

    const newTask = createTask(trimmedTask, priority);
    LayoutAnimation.configureNext(animationConfig);
    setTasks(prevTasks => [...(prevTasks || []), newTask]);
    return true;
  };

  const toggleTask = item => {
    LayoutAnimation.configureNext(animationConfig);
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
            LayoutAnimation.configureNext(animationConfig);
            setLastDeletedTask(item);
            setTasks(prevTasks =>
              (prevTasks || []).filter(t => t.id !== item.id),
            );
          },
          style: 'destructive',
        },
      ],
    );
  };

  const editTask = (id, newTaskTitle, priority) => {
    const trimmedTask = newTaskTitle.trim();

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
      t => t.id !== id && t.task.toLowerCase() === trimmedTask.toLowerCase(),
    );

    if (taskExists) {
      Alert.alert('Aviso', 'Esta tarefa já existe.');
      return false;
    }

    LayoutAnimation.configureNext(animationConfig);
    setTasks(prevTasks =>
      (prevTasks || []).map(t => {
        if (t.id === id) {
          return {
            ...t,
            task: trimmedTask,
            priority: priority !== undefined ? priority : t.priority,
          };
        }
        return t;
      }),
    );
    return true;
  };

  const undoDelete = () => {
    if (lastDeletedTask) {
      LayoutAnimation.configureNext(animationConfig);
      setTasks(prevTasks => [...(prevTasks || []), lastDeletedTask]);
      setLastDeletedTask(null);
    }
  };

  const clearLastDeletedTask = () => {
    setLastDeletedTask(null);
  };

  return {
    tasks,
    loading,
    lastDeletedTask,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    undoDelete,
    clearLastDeletedTask,
  };
};
