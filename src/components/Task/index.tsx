import React, {useEffect, useRef, useState, memo, useCallback} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Animated, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

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
  RepeatEditRow,
  RepeatEditButton,
  RepeatEditText,
  RepeatTag,
  RepeatTagText,
} from './styles';
import {
  TASK_PRIORITIES,
  TASK_CATEGORIES,
  TASK_REPEATS,
} from '../../constants/tasks';
import {
  Task as TaskType,
  TaskPriority,
  TaskCategory,
  TaskRepeat,
} from '../../types';

interface TaskProps {
  item: TaskType;
  onDone: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
  onArchive: (task: TaskType) => void;
  onEdit: (
    id: string,
    task: string,
    priority: TaskPriority,
    category: TaskCategory,
    deadline: string | null,
    repeat: TaskRepeat,
  ) => boolean;
}

const Task = memo<TaskProps>(({item, onDone, onDelete, onArchive, onEdit}) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(item.done ? 1 : 0)).current;
  const swipeableRef = useRef<Swipeable>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(item.task);
  const [editedPriority, setEditedPriority] = useState<TaskPriority>(
    item.priority || TASK_PRIORITIES.NONE,
  );
  const [editedCategory, setEditedCategory] = useState<TaskCategory>(
    item.category || TASK_CATEGORIES.NONE,
  );
  const [editedDeadline, setEditedDeadline] = useState<string | null>(
    item.deadline || null,
  );
  const [editedRepeat, setEditedRepeat] = useState<TaskRepeat>(
    item.repeat || TASK_REPEATS.NONE,
  );
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
    setEditedRepeat(item.repeat || TASK_REPEATS.NONE);
  }, [item.task, item.priority, item.category, item.deadline, item.repeat]);

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
      editedRepeat,
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
    setEditedRepeat(item.repeat);
    setIsEditing(false);
  };

  const startEditing = useCallback(() => {
    setIsEditing(true);
    setEditedPriority(item.priority || TASK_PRIORITIES.NONE);
    setEditedCategory(item.category || TASK_CATEGORIES.NONE);
    setEditedDeadline(item.deadline || null);
    setEditedRepeat(item.repeat || TASK_REPEATS.NONE);
    swipeableRef.current?.close();
  }, [item.priority, item.category, item.deadline, item.repeat]);

  const onChangeDate = (event: Event, selectedDate?: Date) => {
    const currentDate =
      selectedDate || (editedDeadline ? new Date(editedDeadline) : new Date());
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEditedDeadline(currentDate.toISOString());
    }
  };

  const priorityConfig: Array<{
    id: TaskPriority;
    label: string;
    color: string;
  }> = [
    {id: TASK_PRIORITIES.NONE, label: 'Nenhuma', color: theme.colors.accent},
    {id: TASK_PRIORITIES.LOW, label: 'Baixa', color: theme.colors.info},
    {id: TASK_PRIORITIES.MEDIUM, label: 'Média', color: theme.colors.warning},
    {id: TASK_PRIORITIES.HIGH, label: 'Alta', color: theme.colors.error},
  ];

  const categoryConfig: Array<{id: TaskCategory; label: string}> = [
    {id: TASK_CATEGORIES.NONE, label: 'Geral'},
    {id: TASK_CATEGORIES.WORK, label: 'Trabalho'},
    {id: TASK_CATEGORIES.PERSONAL, label: 'Pessoal'},
    {id: TASK_CATEGORIES.SHOPPING, label: 'Compras'},
    {id: TASK_CATEGORIES.HEALTH, label: 'Saúde'},
    {id: TASK_CATEGORIES.STUDY, label: 'Estudo'},
  ];

  const repeatConfig: Array<{id: TaskRepeat; label: string}> = [
    {id: TASK_REPEATS.NONE, label: 'Não repetir'},
    {id: TASK_REPEATS.DAILY, label: 'Diário'},
    {id: TASK_REPEATS.WEEKLY, label: 'Semanal'},
    {id: TASK_REPEATS.MONTHLY, label: 'Mensal'},
  ];

  const currentPriorityColor =
    priorityConfig.find(p => p.id === item.priority)?.color ||
    theme.colors.accent;

  const currentCategoryLabel =
    categoryConfig.find(c => c.id === item.category)?.label || 'Geral';

  const currentRepeatLabel =
    repeatConfig.find(r => r.id === item.repeat)?.label || '';

  const formatDate = useCallback((dateStr: string | null) => {
    if (!dateStr) {
      return '';
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  }, []);

  const isExpired = useCallback((dateStr: string | null) => {
    if (!dateStr) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(dateStr);
    return deadlineDate < today;
  }, []);

  const renderLeftActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation,
    ) => {
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
        // @ts-ignore
        <LeftActionContainer>
          {/* @ts-ignore */}
          <ActionContent style={{transform: [{scale}], opacity}}>
            <Icon
              name={item.done ? 'rotate-ccw' : 'check'}
              size={20}
              color={theme.colors.white}
            />
            {/* @ts-ignore */}
            <ActionText>{item.done ? 'Desfazer' : 'Concluir'}</ActionText>
          </ActionContent>
        </LeftActionContainer>
      );
    },
    [item.done, theme.colors.white],
  );

  const handleDone = useCallback(() => {
    onDone(item);
  }, [onDone, item]);

  const handleDeleteItem = useCallback(() => {
    onDelete(item);
  }, [onDelete, item]);

  const handleArchiveItem = useCallback(() => {
    onArchive(item);
  }, [onArchive, item]);

  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation,
    ) => {
      const scale = dragX.interpolate({
        inputRange: [-300, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      const opacity = dragX.interpolate({
        inputRange: [-300, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <ActionsWrapper>
          <RightActionContainer
            onPress={startEditing}
            activeOpacity={0.7}
            type='edit'
            testID='edit-action'>
            {/* @ts-ignore */}
            <ActionContent style={{transform: [{scale}], opacity}}>
              <Icon name='edit-2' size={20} color={theme.colors.white} />
              {/* @ts-ignore */}
              <ActionText>Editar</ActionText>
            </ActionContent>
          </RightActionContainer>
          <RightActionContainer
            onPress={handleArchiveItem}
            activeOpacity={0.7}
            type='archive'
            testID='archive-action'>
            {/* @ts-ignore */}
            <ActionContent style={{transform: [{scale}], opacity}}>
              <Icon name='archive' size={20} color={theme.colors.white} />
              {/* @ts-ignore */}
              <ActionText>
                {item.archived ? 'Desarquivar' : 'Arquivar'}
              </ActionText>
            </ActionContent>
          </RightActionContainer>
          <RightActionContainer
            onPress={handleDeleteItem}
            activeOpacity={0.7}
            testID='delete-action'>
            {/* @ts-ignore */}
            <ActionContent style={{transform: [{scale}], opacity}}>
              <Icon name='trash' size={20} color={theme.colors.white} />
              {/* @ts-ignore */}
              <ActionText>Excluir</ActionText>
            </ActionContent>
          </RightActionContainer>
        </ActionsWrapper>
      );
    },
    [
      item.archived,
      handleArchiveItem,
      handleDeleteItem,
      startEditing,
      theme.colors.white,
    ],
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={isEditing ? undefined : renderLeftActions}
      onSwipeableLeftOpen={handleDone}
      renderRightActions={isEditing ? undefined : renderRightActions}>
      {/* @ts-ignore */}
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
              <RepeatEditRow>
                {repeatConfig.map(r => (
                  <RepeatEditButton
                    key={r.id}
                    $active={editedRepeat === r.id}
                    $color={theme.colors.secondary}
                    onPress={() => setEditedRepeat(r.id)}
                    testID={`repeat-edit-button-${r.id}`}>
                    <RepeatEditText
                      $active={editedRepeat === r.id}
                      $color={theme.colors.secondary}>
                      {r.label}
                    </RepeatEditText>
                  </RepeatEditButton>
                ))}
              </RepeatEditRow>
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
            {item.repeat && item.repeat !== TASK_REPEATS.NONE && (
              <RepeatTag>
                <Icon name='refresh-cw' size={10} color={theme.colors.white} />
                <RepeatTagText>{currentRepeatLabel}</RepeatTagText>
              </RepeatTag>
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
