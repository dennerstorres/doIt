import React, {useEffect, useRef} from 'react';
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
} from './styles';

function Task({item, handleLeft, handleRight}) {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(item.done ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: item.done ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // background-color doesn't support native driver
    }).start();
  }, [item.done, animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.secondary, theme.colors.primary],
  });

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

  function RightActions({dragX, onPress}) {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <RightActionContainer onPress={onPress} activeOpacity={0.7}>
        <ActionContent style={{transform: [{scale}], opacity}}>
          <Icon name='trash' size={20} color={theme.colors.white} />
          <ActionText>Excluir</ActionText>
        </ActionContent>
      </RightActionContainer>
    );
  }

  return (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={handleLeft}
      renderRightActions={(progress, dragX) => (
        <RightActions dragX={dragX} onPress={handleRight} />
      )}>
      <Container done={item.done} style={{backgroundColor}}>
        <TaskText done={item.done}>{item.task}</TaskText>
        {item.done && (
          <Icon name='check-circle' size={20} color={theme.colors.accent} />
        )}
      </Container>
    </Swipeable>
  );
}

export default Task;
