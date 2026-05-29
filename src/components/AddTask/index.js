import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  DeadlineContainer,
  DeadlineLabel,
  DeadlineButton,
  DeadlineText,
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
  const [deadline, setDeadline] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showCounter = task.length > 40;

  const handleAdd = () => {
    onAdd(priority, category, deadline ? deadline.toISOString() : null);
    setPriority(TASK_PRIORITIES.NONE);
    setCategory(TASK_CATEGORIES.NONE);
    setDeadline(null);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDeadline(currentDate);
    }
  };

  const toggleDatePicker = () => {
    if (deadline && !showDatePicker) {
      setDeadline(null);
    } else {
      setShowDatePicker(true);
    }
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

  const formatDate = date => {
    if (!date) {
      return 'Definir data';
    }
    return date.toLocaleDateString('pt-BR');
  };

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

      <DeadlineContainer>
        <DeadlineLabel>Prazo:</DeadlineLabel>
        <DeadlineButton
          $active={!!deadline}
          onPress={toggleDatePicker}
          disabled={loading}
          testID='deadline-button'>
          <Icon
            name={deadline ? 'calendar' : 'plus'}
            size={14}
            color={deadline ? theme.colors.white : theme.colors.accent}
          />
          <DeadlineText $active={!!deadline}>
            {formatDate(deadline)}
          </DeadlineText>
        </DeadlineButton>
        {deadline && (
          <ClearButton
            onPress={() => setDeadline(null)}
            style={{minHeight: 20, padding: 5}}>
            <Icon name='x' size={14} color={theme.colors.error} />
          </ClearButton>
        )}
      </DeadlineContainer>

      {showDatePicker && (
        <DateTimePicker
          value={deadline || new Date()}
          mode='date'
          display='default'
          onChange={onChangeDate}
          minimumDate={new Date()}
          testID='date-picker'
        />
      )}

      {showCounter && (
        <Counter>
          {task.length}/{MAX_TASK_LENGTH}
        </Counter>
      )}
    </View>
  );
}

export default AddTask;
