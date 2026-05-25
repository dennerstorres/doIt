import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {
  TaskAdd,
  InputContainer,
  TaskText,
  ButtonAdd,
  ClearButton,
  Counter,
} from './styles';
import {MAX_TASK_LENGTH} from '../../constants/tasks';

function AddTask({task, onChangeText, onAdd, loading}) {
  const theme = useTheme();
  const showCounter = task.length > 40;

  return (
    <View>
      <TaskAdd>
        <InputContainer>
          <TaskText
            placeholder='O que você vai fazer hoje?'
            value={task}
            onChangeText={onChangeText}
            maxLength={MAX_TASK_LENGTH}
            onSubmitEditing={onAdd}
            returnKeyType='done'
            autoCorrect={false}
            autoCapitalize='sentences'
            editable={!loading}
          />
          {task.length > 0 && (
            <ClearButton onPress={() => onChangeText('')} disabled={loading}>
              <Icon name='x' size={18} color={theme.colors.accent} />
            </ClearButton>
          )}
        </InputContainer>
        <ButtonAdd onPress={onAdd} disabled={loading}>
          <Icon name='plus' size={22} color={theme.colors.text} />
        </ButtonAdd>
      </TaskAdd>
      {showCounter && (
        <Counter>
          {task.length}/{MAX_TASK_LENGTH}
        </Counter>
      )}
    </View>
  );
}

export default AddTask;
