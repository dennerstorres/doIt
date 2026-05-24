import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {TaskAdd, TaskText, ButtonAdd} from './styles';
import {MAX_TASK_LENGTH} from '../../constants/tasks';

function AddTask({task, onChangeText, onAdd}) {
  const theme = useTheme();

  return (
    <TaskAdd>
      <TaskText
        placeholder='O que você vai fazer hoje?'
        value={task}
        onChangeText={onChangeText}
        maxLength={MAX_TASK_LENGTH}
      />
      <ButtonAdd onPress={onAdd}>
        <Icon name='plus' size={22} color={theme.colors.text} />
      </ButtonAdd>
    </TaskAdd>
  );
}

export default AddTask;
