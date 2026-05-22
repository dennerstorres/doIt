import React from 'react';
import Task from '../Task';
import EmptyState from '../EmptyState';
import {List} from './styles';

function TaskList({tasks, handleDoneTask, handleDeleteTask}) {
  return (
    <List
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Task
          item={item}
          handleLeft={() => handleDoneTask(item)}
          handleRight={() => handleDeleteTask(item)}
        />
      )}
      ListEmptyComponent={<EmptyState />}
    />
  );
}

export default TaskList;
