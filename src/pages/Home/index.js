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
} from './styles';

import TaskList from '../../components/TaskList';
import AddTask from '../../components/AddTask';
import {MIN_TASK_LENGTH, MAX_TASK_LENGTH} from '../../constants/tasks';
import {saveTasks} from '../../services/storage';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks([
      {
        id: '1',
        task: 'Fazer café',
        done: false,
      },
      {
        id: '2',
        task: 'Finalizar projeto',
        done: false,
      },
      {
        id: '3',
        task: 'Estudar',
        done: false,
      },
    ]);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
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

    const taskExists = tasks.some(
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
    setTasks(prevTasks => [...prevTasks, newtask]);
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(prevTasks => prevTasks.filter(t => t.id !== item.id));
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.done).length;

  return (
    <Container>
      <AddTask
        task={task}
        onChangeText={text => setTask(text)}
        onAdd={() => handleAddTask()}
      />

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
        tasks={tasks}
        handleDoneTask={handleDoneTask}
        handleDeleteTask={handleDeleteTask}
      />
    </Container>
  );
}

export default Home;
