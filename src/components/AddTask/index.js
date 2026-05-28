import React, {useState} from 'react';
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
  PriorityContainer,
  PriorityLabel,
  PriorityButton,
  PriorityText,
} from './styles';
import {MAX_TASK_LENGTH, TASK_PRIORITIES} from '../../constants/tasks';

function AddTask({task, onChangeText, onAdd, loading}) {
  const theme = useTheme();
  const [priority, setPriority] = useState(TASK_PRIORITIES.NONE);
  const showCounter = task.length > 40;

  const handleAdd = () => {
    onAdd(priority);
    setPriority(TASK_PRIORITIES.NONE);
  };

  const priorityConfig = [
    {id: TASK_PRIORITIES.NONE, label: 'Nenhuma', color: theme.colors.accent},
    {id: TASK_PRIORITIES.LOW, label: 'Baixa', color: theme.colors.info},
    {id: TASK_PRIORITIES.MEDIUM, label: 'Média', color: theme.colors.warning},
    {id: TASK_PRIORITIES.HIGH, label: 'Alta', color: theme.colors.error},
  ];

  return (
    <View>
      <TaskAdd>
        <InputContainer>
          <TaskText
            placeholder='O que você vai fazer hoje?'
            value={task}
            onChangeText={onChangeText}
            maxLength={MAX_TASK_LENGTH}
            onSubmitEditing={handleAdd}
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
        <ButtonAdd onPress={handleAdd} disabled={loading}>
          <Icon name='plus' size={22} color={theme.colors.text} />
        </ButtonAdd>
      </TaskAdd>
      <PriorityContainer>
        <PriorityLabel>Prioridade:</PriorityLabel>
        {priorityConfig.map(p => (
          <PriorityButton
            key={p.id}
            $active={priority === p.id}
            $color={p.color}
            onPress={() => setPriority(p.id)}
            disabled={loading}
            testID={`priority-button-${p.id}`}>
            <PriorityText $active={priority === p.id} $color={p.color}>
              {p.label}
            </PriorityText>
          </PriorityButton>
        ))}
      </PriorityContainer>

      {showCounter && (
        <Counter>
          {task.length}/{MAX_TASK_LENGTH}
        </Counter>
      )}
    </View>
  );
}

export default AddTask;
