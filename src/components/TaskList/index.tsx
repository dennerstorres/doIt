import React, {useCallback} from 'react';
import {ListRenderItem} from 'react-native';
import TaskComponent from '../Task';
import EmptyState from '../EmptyState';
import {List} from './styles';
import {Task, TaskPriority, TaskCategory, TaskRepeat} from '../../types';

interface TaskListProps {
  tasks: Task[];
  handleDoneTask: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
  handleArchiveTask: (task: Task) => void;
  handleEditTask: (
    id: string,
    task: string,
    priority: TaskPriority,
    category: TaskCategory,
    deadline: string | null,
    repeat: TaskRepeat,
  ) => boolean;
  emptyMessage?: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleDoneTask,
  handleDeleteTask,
  handleArchiveTask,
  handleEditTask,
  emptyMessage,
}) => {
  const renderItem: ListRenderItem<Task> = useCallback(
    ({item}) => (
      <TaskComponent
        item={item}
        onDone={handleDoneTask}
        onDelete={handleDeleteTask}
        onArchive={handleArchiveTask}
        onEdit={handleEditTask}
      />
    ),
    [handleDoneTask, handleDeleteTask, handleArchiveTask, handleEditTask],
  );

  return (
    <List
      // @ts-ignore
      data={tasks}
      // @ts-ignore
      keyExtractor={item => item.id}
      // @ts-ignore
      renderItem={renderItem}
      ListEmptyComponent={<EmptyState message={emptyMessage} />}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

export default TaskList;
