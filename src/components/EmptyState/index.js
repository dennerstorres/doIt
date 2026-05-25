import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {EmptyStateContainer, EmptyStateText} from './styles';

function EmptyState({message = 'Você ainda não tem tarefas cadastradas.'}) {
  return (
    <EmptyStateContainer>
      <Icon name='clipboard' size={50} color='#9cc5a1' />
      <EmptyStateText>{message}</EmptyStateText>
    </EmptyStateContainer>
  );
}

export default EmptyState;
