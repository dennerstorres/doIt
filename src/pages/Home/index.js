import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native';

import { Container, TaskAdd,  TaskText, ButtonAdd, GeneralText, WarningText,  TaskList } from './styles';

import Task from '../../components/Task';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks([
      {
        task: 'Fazer café',
        done: false
      },
      {
        task: 'Finalizar projeto',
        done: false
      },
      {
        task: 'Estudar',
        done: false
      }
    ]);
  },[]);

  function handleAddTask() {
    const newtask = { task: task, done: false };
    setTasks([...tasks, newtask]);
    setTask('');
  }

  function handleDoneTask(item) {
    var auxTasks = tasks.map(task => {
      if (task.task === item.task) {
        task.done = true
      } 
      return task
    })
    setTasks(auxTasks)
  }

  function handleDeleteTask(item) {
    var auxTasks = tasks.filter(task => task.task !== item.task)
    setTasks(auxTasks)
  }

  return (
    <Container>
      <TaskAdd>
        <TaskText placeholder='Digite a tarefa' value={task} onChangeText={(text) => setTask(text)} />
        <ButtonAdd onPress={() => handleAddTask()}>
          <Icon name='plus' size={22} color='#1f2421' />
        </ButtonAdd>
      </TaskAdd>
      
      <TaskList>
        <FlatList 
          data={tasks}
          keyExtractor={(item) => item.task}
          renderItem={({item}) => {
            if (!item.done) { 
            return(
              <Task 
                key={item.task} 
                item={item} 
                handleLeft={() => handleDoneTask(item)}
                handleRight={() => handleDeleteTask(item)} 
              />
            )
            }
          }}
        />
        {/*
          tasks.map(task => (
            <Task key={task.task} item={task}/>
          ))*/
        }  
      </TaskList> 
      
        
      
    </Container>
  );
}

export default Home;