import React, {useState, useMemo} from 'react';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  Container,
  CounterContainer,
  CounterBox,
  CounterLabel,
  CounterValue,
  LoadingIndicator,
  SortContainer,
  SortButton,
  SortText,
} from './styles';

import TaskList from '../../components/TaskList';
import AddTask from '../../components/AddTask';
import Search from '../../components/Search';
import Header from '../../components/Header';
import UndoAction from '../../components/UndoAction';
import {useTasks} from '../../hooks/useTasks';
import {
  filterTasksBySearch,
  getTaskStats,
  sortTasks,
  SORT_TYPES,
  SortType,
} from '../../utils/taskUtils';
import {TaskPriority} from '../../types';

const Home: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [task, setTask] = useState('');
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState<SortType>(SORT_TYPES.DEFAULT);

  const {
    tasks,
    loading,
    lastDeletedTask,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    undoDelete,
    clearLastDeletedTask,
  } = useTasks();

  function handleAddTask(priority: TaskPriority) {
    const success = addTask(task, priority);
    if (success) {
      setTask('');
      Keyboard.dismiss();
    }
  }

  const filteredTasks = useMemo(() => {
    const baseTasks = tasks || [];
    const filtered = filterTasksBySearch(baseTasks, search);
    return sortTasks(filtered, sortType);
  }, [tasks, search, sortType]);

  const {total: totalTasks, completed: completedTasks} = useMemo(
    () => getTaskStats(tasks || []),
    [tasks],
  );

  return (
    <Container style={{paddingBottom: insets.bottom}}>
      <Header />
      <Search value={search} onChangeText={text => setSearch(text)} />
      <AddTask
        task={task}
        onChangeText={text => setTask(text)}
        onAdd={priority => handleAddTask(priority)}
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

      <SortContainer>
        <SortButton
          onPress={() => setSortType(SORT_TYPES.DEFAULT)}
          $active={sortType === SORT_TYPES.DEFAULT}
          testID='sort-button-default'>
          <Icon
            name='list'
            size={14}
            color={
              sortType === SORT_TYPES.DEFAULT
                ? theme.colors.white
                : theme.colors.text
            }
          />
          <SortText $active={sortType === SORT_TYPES.DEFAULT}>Padrão</SortText>
        </SortButton>
        <SortButton
          onPress={() => setSortType(SORT_TYPES.DATE_DESC)}
          $active={sortType === SORT_TYPES.DATE_DESC}
          testID='sort-button-date-desc'>
          <Icon
            name='calendar'
            size={14}
            color={
              sortType === SORT_TYPES.DATE_DESC
                ? theme.colors.white
                : theme.colors.text
            }
          />
          <SortText $active={sortType === SORT_TYPES.DATE_DESC}>Novas</SortText>
        </SortButton>
        <SortButton
          onPress={() => setSortType(SORT_TYPES.ALPHABETICAL)}
          $active={sortType === SORT_TYPES.ALPHABETICAL}
          testID='sort-button-alphabetical'>
          <Icon
            name='type'
            size={14}
            color={
              sortType === SORT_TYPES.ALPHABETICAL
                ? theme.colors.white
                : theme.colors.text
            }
          />
          <SortText $active={sortType === SORT_TYPES.ALPHABETICAL}>
            A-Z
          </SortText>
        </SortButton>
      </SortContainer>

      <TaskList
        tasks={filteredTasks}
        handleDoneTask={toggleTask}
        handleDeleteTask={deleteTask}
        handleEditTask={editTask}
        emptyMessage={
          search.length > 0
            ? 'Nenhuma tarefa encontrada para sua busca.'
            : undefined
        }
      />

      {lastDeletedTask && (
        <UndoAction onUndo={undoDelete} onDismiss={clearLastDeletedTask} />
      )}
    </Container>
  );
};

export default Home;
