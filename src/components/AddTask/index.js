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
  CategoryContainer,
  CategoryLabel,
  CategoryScroll,
  CategoryButton,
  CategoryText,
} from './styles';
import {
  MAX_TASK_LENGTH,
  TASK_PRIORITIES,
  TASK_CATEGORIES,
} from '../../constants/tasks';

function AddTask({task, onChangeText, onAdd, loading}) {
  const theme = useTheme();
  const [priority, setPriority] = useState(TASK_PRIORITIES.NONE);
  const [category, setCategory] = useState(TASK_CATEGORIES.NONE);
  const showCounter = task.length > 40;

  const handleAdd = () => {
    onAdd(priority, category);
    setPriority(TASK_PRIORITIES.NONE);
    setCategory(TASK_CATEGORIES.NONE);
  };

  const priorityConfig = [
    {id: TASK_PRIORITIES.NONE, label: 'Nenhuma', color: theme.colors.accent},
    {id: TASK_PRIORITIES.LOW, label: 'Baixa', color: theme.colors.info},
    {id: TASK_PRIORITIES.MEDIUM, label: 'Média', color: theme.colors.warning},
    {id: TASK_PRIORITIES.HIGH, label: 'Alta', color: theme.colors.error},
  ];

  const categoryConfig = [
    {id: TASK_CATEGORIES.NONE, label: 'Geral'},
    {id: TASK_CATEGORIES.WORK, label: 'Trabalho'},
    {id: TASK_CATEGORIES.PERSONAL, label: 'Pessoal'},
    {id: TASK_CATEGORIES.SHOPPING, label: 'Compras'},
    {id: TASK_CATEGORIES.HEALTH, label: 'Saúde'},
    {id: TASK_CATEGORIES.STUDY, label: 'Estudo'},
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

      <CategoryContainer>
        <CategoryLabel>Categoria:</CategoryLabel>
        <CategoryScroll>
          {categoryConfig.map(c => (
            <CategoryButton
              key={c.id}
              $active={category === c.id}
              onPress={() => setCategory(c.id)}
              disabled={loading}
              testID={`category-button-${c.id}`}>
              <CategoryText $active={category === c.id}>{c.label}</CategoryText>
            </CategoryButton>
          ))}
        </CategoryScroll>
      </CategoryContainer>

      {showCounter && (
        <Counter>
          {task.length}/{MAX_TASK_LENGTH}
        </Counter>
      )}
    </View>
  );
}

export default AddTask;
