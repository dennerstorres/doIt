import React, {useState} from 'react';
import {Keyboard} from 'react-native';

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
import {useTasks} from '../../hooks/useTasks';
import {
  filterTasksBySearch,
  getTaskStats,
  sortTasks,
} from '../../utils/taskUtils';

function Home() {
  const [task, setTask] = useState('');
  const [search, setSearch] = useState('');
  const {tasks, loading, addTask, toggleTask, deleteTask} = useTasks();

  function handleAddTask() {
    const success = addTask(task);
    if (success) {
      setTask('');
      Keyboard.dismiss();
    }
  }

  const filteredTasks = sortTasks(filterTasksBySearch(tasks || [], search));
  const {total: totalTasks, completed: completedTasks} = getTaskStats(tasks);

  return (
    <Container>
      <Header />
      <Search value={search} onChangeText={text => setSearch(text)} />
      <AddTask
        task={task}
        onChangeText={text => setTask(text)}
        onAdd={() => handleAddTask()}
        loading={loading}
      />

      {loading && <LoadingIndicator />}

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
        handleDoneTask={toggleTask}
        handleDeleteTask={deleteTask}
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
