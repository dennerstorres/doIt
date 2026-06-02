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
  StreakContainer,
  StreakText,
  LoadingIndicator,
  SortContainer,
  SortButton,
  SortText,
} from './styles';

import TaskList from '../../components/TaskList';
import AddTask from '../../components/AddTask';
import Search from '../../components/Search';
import DailyProgress from '../../components/DailyProgress';
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
import {TaskPriority, TaskCategory, TaskRepeat} from '../../types';

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
    archiveTask,
    editTask,
    undoDelete,
    clearLastDeletedTask,
  } = useTasks();

  function handleAddTask(
    priority: TaskPriority,
    category: TaskCategory,
    deadline: string | null,
    repeat: TaskRepeat,
  ) {
    const success = addTask(task, priority, category, deadline, repeat);
    if (success) {
      setTask('');
      Keyboard.dismiss();
    }
  }

  const filteredTasks = useMemo(() => {
    const baseTasks = (tasks || []).filter(t => !t.archived);
    const filtered = filterTasksBySearch(baseTasks, search);
    return sortTasks(filtered, sortType);
  }, [tasks, search, sortType]);

  const stats = useMemo(() => getTaskStats(tasks || []), [tasks]);

  const {
    total: totalTasks,
    completed: completedTasks,
    dailyProgress,
    streak,
  } = stats;

  return (
    <Container style={{paddingBottom: insets.bottom}}>
      <Header />
      <Search value={search} onChangeText={text => setSearch(text)} />
      <AddTask
        task={task}
        onChangeText={text => setTask(text)}
        onAdd={(priority, category, deadline, repeat) =>
          handleAddTask(priority, category, deadline, repeat)
        }
        loading={loading}
      />

      {loading && <LoadingIndicator />}

      <CounterContainer>
        <CounterBox>
          <CounterLabel>Tarefas</CounterLabel>
          <CounterValue>{totalTasks}</CounterValue>
        </CounterBox>

        {streak > 0 && (
          <StreakContainer>
            <Icon name='zap' size={16} color={theme.colors.warning} />
            <StreakText>
              {streak} {streak === 1 ? 'dia' : 'dias'}
            </StreakText>
          </StreakContainer>
        )}

        <CounterBox>
          <CounterLabel>Concluídas</CounterLabel>
          <CounterValue>{completedTasks}</CounterValue>
        </CounterBox>
      </CounterContainer>

      <DailyProgress progress={dailyProgress} />

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
        handleArchiveTask={archiveTask}
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
