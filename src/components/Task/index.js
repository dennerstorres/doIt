import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, TaskText } from './styles';

function Task({item, handleLeft, handleRight}) {
  
  function LeftActions(progress, dragX){

    const scale = dragX.interpolate({
      inputRange:[0, 100],
      outputRange:[0, 1],
      extrapolate: 'clamp'
    })

    return(
      <View style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>Concluir</Animated.Text>
      </View>
    );
  }

  function RightActions({progress, dragX, onPress}){

    const scale = dragX.interpolate({
      inputRange:[-100, 0],
      outputRange:[1, 0],
      extrapolate: 'clamp'
    })

    return(
      <TouchableOpacity onPress={onPress} style={styles.rightAction}>
        <Animated.View style={[{padding: 20},  { transform: [{ scale: scale}]} ]}>
          <Icon name="trash" size={30} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    );
  }
  return(
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={handleLeft}
      renderRightActions={(progress, dragX)=> 
        <RightActions progress={progress} dragX={dragX} onPress={handleRight} />} 
    >
      <Container done={item.done}>
        <TaskText>{item.task}</TaskText>
      </Container>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction:{
    backgroundColor: '#49a078',
    justifyContent: 'center',
    height: 50,
    flex: 1
  },
  rightAction:{
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    height: 50,
    alignItems: 'flex-end'
  },
  actionText:{
    fontSize: 17,
    color: '#FFF',
    padding: 20,
  }
});

export default Task;