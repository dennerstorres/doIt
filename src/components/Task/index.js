import React, {useEffect, useRef, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';

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
  CancelIcon,
} from './styles';

function Task({item, handleLeft, handleRight, handleEdit}) {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(item.done ? 1 : 0)).current;
  const swipeableRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(item.task);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: item.done ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // background-color doesn't support native driver
    }).start();
  }, [item.done, animatedValue]);

  useEffect(() => {
    setEditedTask(item.task);
  }, [item.task]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.secondary, theme.colors.primary],
  });

  const handleSaveEdit = () => {
    const success = handleEdit(item.id, editedTask);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTask(item.task);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    swipeableRef.current?.close();
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
      onSwipeableLeftOpen={handleLeft}
      renderRightActions={(progress, dragX) =>
        isEditing ? null : (
          <RightActions
            dragX={dragX}
            onDelete={handleRight}
            onEdit={startEditing}
          />
        )
      }>
      <Container done={item.done} style={{backgroundColor}}>
        {isEditing ? (
          <>
            <EditInput
              value={editedTask}
              onChangeText={setEditedTask}
              autoFocus
              onSubmitEditing={handleSaveEdit}
              returnKeyType='done'
              testID='task-edit-input'
            />
            <EditActions>
              <CancelIcon
                name='x'
                size={20}
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
            <TaskText done={item.done}>{item.task}</TaskText>
            {item.done && (
              <Icon name='check-circle' size={20} color={theme.colors.accent} />
            )}
          </>
        )}
      </Container>
    </Swipeable>
  );
}

export default Task;
