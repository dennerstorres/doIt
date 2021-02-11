import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';

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
        task: 'Dormir',
        done: false
      }
    ]);
  },[]);

  function handleAddTask() {
    const newtask = { task: task, done: false };
    setTasks([...tasks, newtask]);
    setTask('');
  }

  return (
    <Container>
      <GeneralText>
        Tarefas
      </GeneralText>
      <TaskAdd>
        <TaskText placeholder='Digite a tarefa' value={task} onChangeText={(text) => setTask(text)} />
        <ButtonAdd onPress={() => handleAddTask()}>
          <Icon name='plus' size={22} color='#1f2421' />
        </ButtonAdd>
      </TaskAdd>
      
      <TaskList>
        {
          tasks.map(task => (
            <Task key={task.task} item={task}/>
          ))
        }  
      </TaskList> 
      
        
      
    </Container>
  );
}

export default Home;