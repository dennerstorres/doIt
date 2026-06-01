import React, {useEffect, useRef, useCallback} from 'react';
import {Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, Message, UndoButton, UndoText} from './styles';

interface UndoActionProps {
  onUndo: () => void;
  onDismiss: () => void;
}

const UndoAction: React.FC<UndoActionProps> = ({onUndo, onDismiss}) => {
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

  const insets = useSafeAreaInsets();

  return (
    // @ts-ignore
    <Animated.View style={{opacity: fadeAnim}}>
      <Container $bottomInset={insets.bottom}>
        <Message>Tarefa excluída</Message>
        <UndoButton onPress={handleUndo} testID='undo-button'>
          <UndoText>Desfazer</UndoText>
        </UndoButton>
      </Container>
    </Animated.View>
  );
};

export default UndoAction;
