import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {EmptyStateContainer, EmptyStateText} from './styles';

function EmptyState() {
  return (
    <EmptyStateContainer>
      <Icon name='clipboard' size={50} color='#9cc5a1' />
      <EmptyStateText>Você ainda não tem tarefas cadastradas.</EmptyStateText>
    </EmptyStateContainer>
  );
}

export default EmptyState;
