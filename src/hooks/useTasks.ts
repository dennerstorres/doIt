import {useState, useEffect, useCallback} from 'react';
import {Alert, LayoutAnimation, LayoutAnimationConfig} from 'react-native';
import {saveTasks, getTasks} from '../services/storage';
import {createTask} from '../models/Task';
import {
  MIN_TASK_LENGTH,
  MAX_TASK_LENGTH,
  TASK_PRIORITIES,
  TASK_CATEGORIES,
  TASK_REPEATS,
} from '../constants/tasks';
import {Task, TaskPriority, TaskCategory, TaskRepeat} from '../types';

const animationConfig: LayoutAnimationConfig = {
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
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastDeletedTask, setLastDeletedTask] = useState<Task | null>(null);

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

  const addTask = useCallback(
    (
      taskTitle: string,
      priority: TaskPriority = TASK_PRIORITIES.NONE,
      category: TaskCategory = TASK_CATEGORIES.NONE,
      deadline: string | null = null,
      repeat: TaskRepeat = TASK_REPEATS.NONE,
    ): boolean => {
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

      const newTask = createTask(
        trimmedTask,
        priority,
        category,
        deadline,
        repeat,
      );
      LayoutAnimation.configureNext(animationConfig);
      setTasks(prevTasks => [...(prevTasks || []), newTask]);
      return true;
    },
    [tasks],
  );

  const toggleTask = useCallback((item: Task) => {
    LayoutAnimation.configureNext(animationConfig);
    setTasks(prevTasks => {
      const currentTasks = prevTasks || [];
      const updatedTasks = currentTasks.map(t => {
        if (t.id === item.id) {
          const newDone = !t.done;
          return {
            ...t,
            done: newDone,
            completedAt: newDone ? new Date().toISOString() : null,
          };
        }
        return t;
      });

      // If task was marked as done and it is a repeating task, create next instance
      if (!item.done && item.repeat !== TASK_REPEATS.NONE) {
        let nextDeadline: string | null = null;
        if (item.deadline) {
          const date = new Date(item.deadline);
          if (item.repeat === TASK_REPEATS.DAILY) {
            date.setDate(date.getDate() + 1);
          } else if (item.repeat === TASK_REPEATS.WEEKLY) {
            date.setDate(date.getDate() + 7);
          } else if (item.repeat === TASK_REPEATS.MONTHLY) {
            date.setMonth(date.getMonth() + 1);
          }
          nextDeadline = date.toISOString();
        }

        const newTask = createTask(
          item.task,
          item.priority,
          item.category,
          nextDeadline,
          item.repeat,
        );

        return [...updatedTasks, newTask];
      }

      return updatedTasks;
    });
  }, []);

  const deleteTask = useCallback((item: Task) => {
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
  }, []);

  const archiveTask = useCallback((item: Task) => {
    LayoutAnimation.configureNext(animationConfig);
    setTasks(prevTasks =>
      (prevTasks || []).map(t => {
        if (t.id === item.id) {
          return {...t, archived: !t.archived};
        }
        return t;
      }),
    );
  }, []);

  const editTask = useCallback(
    (
      id: string,
      newTaskTitle: string,
      priority?: TaskPriority,
      category?: TaskCategory,
      deadline?: string | null,
      repeat?: TaskRepeat,
    ): boolean => {
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
              category: category !== undefined ? category : t.category,
              deadline: deadline !== undefined ? deadline : t.deadline,
              repeat: repeat !== undefined ? repeat : t.repeat,
            };
          }
          return t;
        }),
      );
      return true;
    },
    [tasks],
  );

  const undoDelete = useCallback(() => {
    if (lastDeletedTask) {
      LayoutAnimation.configureNext(animationConfig);
      setTasks(prevTasks => [...(prevTasks || []), lastDeletedTask]);
      setLastDeletedTask(null);
    }
  }, [lastDeletedTask]);

  const clearLastDeletedTask = useCallback(() => {
    setLastDeletedTask(null);
  }, []);

  return {
    tasks,
    loading,
    lastDeletedTask,
    addTask,
    toggleTask,
    deleteTask,
    archiveTask,
    editTask,
    undoDelete,
    clearLastDeletedTask,
  };
};
