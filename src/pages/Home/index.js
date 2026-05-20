import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {FlatList, Alert, Keyboard} from 'react-native';

import {Container, TaskAdd, TaskText, ButtonAdd, TaskList} from './styles';

import Task from '../../components/Task';
import {MIN_TASK_LENGTH, MAX_TASK_LENGTH} from '../../constants/tasks';

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
    setTasks(prevTasks => [...prevTasks, newtask]);
    setTask('');
    Keyboard.dismiss();
  }

  function handleDoneTask(item) {
    setTasks(prevTasks =>
      prevTasks.map(t => {
        if (t.id === item.id) {
          return {...t, done: true};
        }
        return t;
      }),
    );
  }

  function handleDeleteTask(item) {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== item.id));
  }

  return (
    <Container>
      <TaskAdd>
        <TaskText
          placeholder='Digite a tarefa'
          value={task}
          onChangeText={text => setTask(text)}
          maxLength={MAX_TASK_LENGTH}
        />
        <ButtonAdd onPress={() => handleAddTask()}>
          <Icon name='plus' size={22} color='#1f2421' />
        </ButtonAdd>
      </TaskAdd>

      <TaskList>
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            if (!item.done) {
              return (
                <Task
                  item={item}
                  handleLeft={() => handleDoneTask(item)}
                  handleRight={() => handleDeleteTask(item)}
                />
              );
            }
          }}
        />
        {/*
          tasks.map(task => (
            <Task key={task.task} item={task}/>
          ))*/}
      </TaskList>
    </Container>
  );
}

export default Home;
