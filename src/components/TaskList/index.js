import React from 'react';
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
  return (
    <List
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Task
          item={item}
          handleLeft={() => handleDoneTask(item)}
          handleRight={() => handleDeleteTask(item)}
          handleEdit={handleEditTask}
        />
      )}
      ListEmptyComponent={<EmptyState message={emptyMessage} />}
    />
  );
}

export default TaskList;
