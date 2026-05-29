import React, {useEffect, useRef, useState, memo} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Animated, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  TaskText,
  LeftActionContainer,
  RightActionContainer,
  ActionContent,
  ActionText,
  EditInput,
  ActionsWrapper,
  EditActions,
  EditContentWrapper,
  CancelIcon,
  PriorityIndicator,
  PriorityEditRow,
  PriorityEditButton,
  PriorityEditText,
  CategoryTag,
  CategoryTagText,
  CategoryEditRow,
  CategoryEditScroll,
  CategoryEditButton,
  CategoryEditText,
  DeadlineTag,
  DeadlineTagText,
  DeadlineEditRow,
  DeadlineEditButton,
  DeadlineEditText,
} from './styles';
import {TASK_PRIORITIES, TASK_CATEGORIES} from '../../constants/tasks';

const Task = memo(({item, onDone, onDelete, onEdit}) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(item.done ? 1 : 0)).current;
  const swipeableRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(item.task);
  const [editedPriority, setEditedPriority] = useState(
    item.priority || TASK_PRIORITIES.NONE,
  );
  const [editedCategory, setEditedCategory] = useState(
    item.category || TASK_CATEGORIES.NONE,
  );
  const [editedDeadline, setEditedDeadline] = useState(item.deadline || null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: item.done ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // background-color doesn't support native driver
    }).start();
  }, [item.done, animatedValue]);

  useEffect(() => {
    setEditedTask(item.task);
    setEditedPriority(item.priority || TASK_PRIORITIES.NONE);
    setEditedCategory(item.category || TASK_CATEGORIES.NONE);
    setEditedDeadline(item.deadline || null);
  }, [item.task, item.priority, item.category, item.deadline]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.secondary, theme.colors.primary],
  });

  const handleSaveEdit = () => {
    const success = onEdit(
      item.id,
      editedTask,
      editedPriority,
      editedCategory,
      editedDeadline,
    );
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTask(item.task);
    setEditedPriority(item.priority);
    setEditedCategory(item.category);
    setEditedDeadline(item.deadline);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedPriority(item.priority || TASK_PRIORITIES.NONE);
    setEditedCategory(item.category || TASK_CATEGORIES.NONE);
    setEditedDeadline(item.deadline || null);
    swipeableRef.current?.close();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || editedDeadline;
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEditedDeadline(currentDate.toISOString());
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

  const currentPriorityColor =
    priorityConfig.find(p => p.id === item.priority)?.color ||
    theme.colors.accent;

  const currentCategoryLabel =
    categoryConfig.find(c => c.id === item.category)?.label || 'Geral';

  const formatDate = dateStr => {
    if (!dateStr) {
      return '';
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const isExpired = dateStr => {
    if (!dateStr) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(dateStr);
    return deadlineDate < today;
  };

  function LeftActions(progress, dragX) {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <LeftActionContainer>
        <ActionContent style={{transform: [{scale}], opacity}}>
          <Icon
            name={item.done ? 'rotate-ccw' : 'check'}
            size={20}
            color={theme.colors.white}
          />
          <ActionText>{item.done ? 'Desfazer' : 'Concluir'}</ActionText>
        </ActionContent>
      </LeftActionContainer>
    );
  }

  const handleDone = () => {
    onDone(item);
  };

  const handleDelete = () => {
    onDelete(item);
  };

  function RightActions({dragX, onDelete, onEdit}) {
    const scale = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <ActionsWrapper>
        <RightActionContainer
          onPress={onEdit}
          activeOpacity={0.7}
          type='edit'
          testID='edit-action'>
          <ActionContent style={{transform: [{scale}], opacity}}>
            <Icon name='edit-2' size={20} color={theme.colors.white} />
            <ActionText>Editar</ActionText>
          </ActionContent>
        </RightActionContainer>
        <RightActionContainer
          onPress={onDelete}
          activeOpacity={0.7}
          testID='delete-action'>
          <ActionContent style={{transform: [{scale}], opacity}}>
            <Icon name='trash' size={20} color={theme.colors.white} />
            <ActionText>Excluir</ActionText>
          </ActionContent>
        </RightActionContainer>
      </ActionsWrapper>
    );
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={isEditing ? null : LeftActions}
      onSwipeableLeftOpen={handleDone}
      renderRightActions={(progress, dragX) =>
        isEditing ? null : (
          <RightActions
            dragX={dragX}
            onDelete={handleDelete}
            onEdit={startEditing}
          />
        )
      }>
      <Container done={item.done} style={{backgroundColor}}>
        {isEditing ? (
          <>
            <EditContentWrapper>
              <EditInput
                value={editedTask}
                onChangeText={setEditedTask}
                autoFocus
                onSubmitEditing={handleSaveEdit}
                returnKeyType='done'
                testID='task-edit-input'
              />
              <PriorityEditRow>
                {priorityConfig.map(p => (
                  <PriorityEditButton
                    key={p.id}
                    $active={editedPriority === p.id}
                    $color={p.color}
                    onPress={() => setEditedPriority(p.id)}
                    testID={`priority-edit-button-${p.id}`}>
                    <PriorityEditText
                      $active={editedPriority === p.id}
                      $color={p.color}>
                      {p.label}
                    </PriorityEditText>
                  </PriorityEditButton>
                ))}
              </PriorityEditRow>
              <CategoryEditRow>
                <CategoryEditScroll>
                  {categoryConfig.map(c => (
                    <CategoryEditButton
                      key={c.id}
                      $active={editedCategory === c.id}
                      $color={theme.colors.primary}
                      onPress={() => setEditedCategory(c.id)}
                      testID={`category-edit-button-${c.id}`}>
                      <CategoryEditText
                        $active={editedCategory === c.id}
                        $color={theme.colors.primary}>
                        {c.label}
                      </CategoryEditText>
                    </CategoryEditButton>
                  ))}
                </CategoryEditScroll>
              </CategoryEditRow>
              <DeadlineEditRow>
                <DeadlineEditButton
                  $active={!!editedDeadline}
                  onPress={() => setShowDatePicker(true)}
                  testID='deadline-edit-button'>
                  <Icon
                    name='calendar'
                    size={10}
                    color={
                      editedDeadline ? theme.colors.white : theme.colors.accent
                    }
                  />
                  <DeadlineEditText $active={!!editedDeadline}>
                    {formatDate(editedDeadline) || 'Prazo'}
                  </DeadlineEditText>
                </DeadlineEditButton>
                {editedDeadline && (
                  <Icon
                    name='x'
                    size={12}
                    color={theme.colors.error}
                    onPress={() => setEditedDeadline(null)}
                    style={{marginLeft: 5}}
                    testID='clear-deadline-edit'
                  />
                )}
              </DeadlineEditRow>
            </EditContentWrapper>
            <EditActions>
              <CancelIcon
                name='x'
                size={18}
                color={theme.colors.error}
                onPress={handleCancelEdit}
                testID='cancel-edit-button'
              />
              <Icon
                name='check'
                size={20}
                color={theme.colors.white}
                onPress={handleSaveEdit}
                testID='save-edit-button'
              />
            </EditActions>
          </>
        ) : (
          <>
            <PriorityIndicator $color={currentPriorityColor} />
            <TaskText done={item.done}>{item.task}</TaskText>
            {item.deadline && (
              <DeadlineTag>
                <Icon
                  name='calendar'
                  size={10}
                  color={
                    isExpired(item.deadline) && !item.done
                      ? theme.colors.error
                      : theme.colors.accent
                  }
                />
                <DeadlineTagText
                  isExpired={isExpired(item.deadline) && !item.done}>
                  {formatDate(item.deadline)}
                </DeadlineTagText>
              </DeadlineTag>
            )}
            {item.category && item.category !== TASK_CATEGORIES.NONE && (
              <CategoryTag>
                <CategoryTagText>{currentCategoryLabel}</CategoryTagText>
              </CategoryTag>
            )}
            {item.done && (
              <Icon name='check-circle' size={20} color={theme.colors.accent} />
            )}
          </>
        )}
      </Container>
      {showDatePicker && (
        <DateTimePicker
          value={editedDeadline ? new Date(editedDeadline) : new Date()}
          mode='date'
          display='default'
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}
    </Swipeable>
  );
});

export default Task;
