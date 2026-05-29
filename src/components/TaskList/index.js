import React, {useCallback} from 'react';
import Task from '../Task';
import EmptyState from '../EmptyState';
import {List} from './styles';

function TaskList({
  tasks,
  handleDoneTask,
  handleDeleteTask,
  handleEditTask,
  emptyMessage,
}) {
  const renderItem = useCallback(
    ({item}) => (
      <Task
        item={item}
        onDone={handleDoneTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    ),
    [handleDoneTask, handleDeleteTask, handleEditTask],
  );

  return (
    <List
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyState message={emptyMessage} />}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

export default TaskList;
