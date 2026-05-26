import React, {useEffect, useRef} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';

import {Container, TaskText} from './styles';

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

    return (
      <View
        style={[styles.leftAction, {backgroundColor: theme.colors.primary}]}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          Concluir
        </Animated.Text>
      </View>
    );
  }

  function RightActions({progress, dragX, onPress}) {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.rightAction, {backgroundColor: theme.colors.error}]}>
        <Animated.View
          style={[styles.rightActionIcon, {transform: [{scale: scale}]}]}>
          <Icon name='trash' size={30} color={theme.colors.white} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
  return (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={handleLeft}
      renderRightActions={(progress, dragX) => (
        <RightActions progress={progress} dragX={dragX} onPress={handleRight} />
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

const styles = StyleSheet.create({
  leftAction: {
    justifyContent: 'center',
    height: 50,
    flex: 1,
  },
  rightAction: {
    justifyContent: 'center',
    height: 50,
    alignItems: 'flex-end',
  },
  actionText: {
    fontSize: 17,
    color: '#FFF',
    padding: 20,
  },
  rightActionIcon: {
    padding: 20,
  },
});

export default Task;
