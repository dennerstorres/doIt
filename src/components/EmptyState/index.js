import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {EmptyStateContainer, EmptyStateText} from './styles';

function EmptyState({message = 'Você ainda não tem tarefas cadastradas.'}) {
  const theme = useTheme();

  return (
    <EmptyStateContainer>
      <Icon name='clipboard' size={50} color={theme.colors.accent} />
      <EmptyStateText>{message}</EmptyStateText>
    </EmptyStateContainer>
  );
}

export default EmptyState;
