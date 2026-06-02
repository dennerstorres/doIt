import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Container, LoadingIndicator} from './styles';
import Header from '../../components/Header';
import TaskList from '../../components/TaskList';
import {useTasks} from '../../hooks/useTasks';

const History: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {
    tasks,
    loading,
    toggleTask,
    deleteTask,
    archiveTask,
    editTask,
  } = useTasks();

  const archivedTasks = useMemo(() => {
    return (tasks || []).filter(t => t.archived);
  }, [tasks]);

  return (
    <Container style={{paddingBottom: insets.bottom}}>
      <Header
        showBackButton
        onBack={() => navigation.goBack()}
        showStatsButton={false}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <TaskList
          tasks={archivedTasks}
          handleDoneTask={toggleTask}
          handleDeleteTask={deleteTask}
          handleArchiveTask={archiveTask}
          handleEditTask={editTask}
          emptyMessage='Nenhuma tarefa arquivada.'
        />
      )}
    </Container>
  );
};

export default History;
