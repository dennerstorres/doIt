import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';

import {Container, TaskAdd, TaskText, ButtonAdd, TaskList} from './styles';

import Task from '../../components/Task';

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
    const newtask = {
      id: String(new Date().getTime()),
      task: task,
      done: false,
    };
    setTasks([...tasks, newtask]);
    setTask('');
  }

  function handleDoneTask(item) {
    const auxTasks = tasks.map(t => {
      if (t.id === item.id) {
        return {...t, done: true};
      }
      return t;
    });
    setTasks(auxTasks);
  }

  function handleDeleteTask(item) {
    const auxTasks = tasks.filter(t => t.id !== item.id);
    setTasks(auxTasks);
  }

  return (
    <Container>
      <TaskAdd>
        <TaskText
          placeholder='Digite a tarefa'
          value={task}
          onChangeText={text => setTask(text)}
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
