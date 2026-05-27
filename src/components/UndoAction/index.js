import React, {useEffect, useRef, useCallback} from 'react';
import {Animated} from 'react-native';
import {Container, Message, UndoButton, UndoText} from './styles';

function UndoAction({onUndo, onDismiss}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleDismiss = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  }, [fadeAnim, onDismiss]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [fadeAnim, handleDismiss]);

  const handleUndo = () => {
    onUndo();
  };

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <Container>
        <Message>Tarefa excluída</Message>
        <UndoButton onPress={handleUndo} testID='undo-button'>
          <UndoText>Desfazer</UndoText>
        </UndoButton>
      </Container>
    </Animated.View>
  );
}

export default UndoAction;
