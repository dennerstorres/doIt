import React, {useState, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

import {
  Container,
  CounterContainer,
  CounterBox,
  CounterLabel,
  CounterValue,
  LoadingIndicator,
} from './styles';

import TaskList from '../../components/TaskList';
import AddTask from '../../components/AddTask';
import Search from '../../components/Search';
import Header from '../../components/Header';
import {MIN_TASK_LENGTH, MAX_TASK_LENGTH} from '../../constants/tasks';
import {saveTasks, getTasks} from '../../services/storage';

function Home() {
  const [task, setTask] = useState('');
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTasks() {
      try {
        const storedTasks = await getTasks();
        if (isMounted) {
          setTasks(storedTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        if (isMounted) {
          Alert.alert(
            'Erro',
            'Não foi possível carregar suas tarefas. Usando armazenamento temporário.',
          );
          setTasks([]); // Fallback to empty list so user can still use the app
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

  function handleAddTask() {
    const trimmedTask = task.trim();

    if (!trimmedTask) {
      Alert.alert('Aviso', 'A tarefa não pode estar vazia.');
      return;
    }

    if (trimmedTask.length < MIN_TASK_LENGTH) {
      Alert.alert(
        'Aviso',
        `A tarefa deve ter pelo menos ${MIN_TASK_LENGTH} caracteres.`,
      );
      return;
    }

    if (trimmedTask.length > MAX_TASK_LENGTH) {
      Alert.alert(
        'Aviso',
        `A tarefa deve ter no máximo ${MAX_TASK_LENGTH} caracteres.`,
      );
      return;
    }

    const taskExists = (tasks || []).some(
      t => t.task.toLowerCase() === trimmedTask.toLowerCase(),
    );

    if (taskExists) {
      Alert.alert('Aviso', 'Esta tarefa já existe.');
      return;
    }

    const newtask = {
      id: String(new Date().getTime()),
      task: trimmedTask,
      done: false,
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prevTasks => [...(prevTasks || []), newtask]);
    setTask('');
    Keyboard.dismiss();
  }

  function handleDoneTask(item) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prevTasks =>
      prevTasks.map(t => {
        if (t.id === item.id) {
          return {...t, done: !t.done};
        }
        return t;
      }),
    );
  }

  function handleDeleteTask(item) {
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
            setTasks(prevTasks => prevTasks.filter(t => t.id !== item.id));
          },
          style: 'destructive',
        },
      ],
    );
  }

  const filteredTasks = (tasks || []).filter(t =>
    t.task.toLowerCase().includes(search.toLowerCase()),
  );

  const totalTasks = (tasks || []).length;
  const completedTasks = (tasks || []).filter(t => t.done).length;

  return (
    <Container>
      <Header />
      <Search value={search} onChangeText={text => setSearch(text)} />
      <AddTask
        task={task}
        onChangeText={text => setTask(text)}
        onAdd={() => handleAddTask()}
        loading={tasks === null}
      />

      {tasks === null && <LoadingIndicator />}

      <CounterContainer>
        <CounterBox>
          <CounterLabel>Tarefas</CounterLabel>
          <CounterValue>{totalTasks}</CounterValue>
        </CounterBox>
        <CounterBox>
          <CounterLabel>Concluídas</CounterLabel>
          <CounterValue>{completedTasks}</CounterValue>
        </CounterBox>
      </CounterContainer>

      <TaskList
        tasks={filteredTasks}
        handleDoneTask={handleDoneTask}
        handleDeleteTask={handleDeleteTask}
        emptyMessage={
          search.length > 0
            ? 'Nenhuma tarefa encontrada para sua busca.'
            : undefined
        }
      />
    </Container>
  );
}

export default Home;
