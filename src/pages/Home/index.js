import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
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
  TaskAdd,
  TaskText,
  ButtonAdd,
  TaskList,
  CounterContainer,
  CounterBox,
  CounterLabel,
  CounterValue,
} from './styles';

import Task from '../../components/Task';
import EmptyState from '../../components/EmptyState';
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
      <TaskAdd>
        <TaskText
          placeholder='O que você vai fazer hoje?'
          value={task}
          onChangeText={text => setTask(text)}
          maxLength={MAX_TASK_LENGTH}
        />
        <ButtonAdd onPress={() => handleAddTask()}>
          <Icon name='plus' size={22} color='#1f2421' />
        </ButtonAdd>
      </TaskAdd>

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
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Task
            item={item}
            handleLeft={() => handleDoneTask(item)}
            handleRight={() => handleDeleteTask(item)}
          />
        )}
        ListEmptyComponent={<EmptyState />}
      />
    </Container>
  );
}

export default Home;
