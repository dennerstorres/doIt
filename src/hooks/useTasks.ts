import {useState, useEffect, useCallback, useRef} from 'react';
import {Alert, LayoutAnimation, LayoutAnimationConfig} from 'react-native';
import {TaskService} from '../services/taskService';
import {createTask} from '../models/Task';
import {
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
  const tasksRef = useRef<Task[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);
  const [lastDeletedTask, setLastDeletedTask] = useState<Task | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        const storedTasks = await TaskService.getAll();
        if (isMounted) {
          setTasks(storedTasks);
          setLoading(false);
        }
      } catch (error) {
        if (__DEV__) {
          console.error('Error loading tasks:', error);
        }
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
          await TaskService.saveAll(tasks);
        } catch (error) {
          if (__DEV__) {
            console.error('Error saving tasks:', error);
          }
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
      const currentTasks = tasksRef.current || [];
      const validation = TaskService.validate(taskTitle, currentTasks);

      if (!validation.valid) {
        Alert.alert('Aviso', validation.error);
        return false;
      }

      const newTask = createTask(
        taskTitle.trim(),
        priority,
        category,
        deadline,
        repeat,
      );
      LayoutAnimation.configureNext(animationConfig);
      setTasks(prevTasks => [...(prevTasks || []), newTask]);
      return true;
    },
    [],
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
        const nextTask = TaskService.getNextOccurrence(item);
        if (nextTask) {
          return [...updatedTasks, nextTask];
        }
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
      const currentTasks = tasksRef.current || [];
      const validation = TaskService.validate(newTaskTitle, currentTasks, id);

      if (!validation.valid) {
        Alert.alert('Aviso', validation.error);
        return false;
      }

      LayoutAnimation.configureNext(animationConfig);
      setTasks(prevTasks =>
        (prevTasks || []).map(t => {
          if (t.id === id) {
            return {
              ...t,
              task: newTaskTitle.trim(),
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
    [],
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
