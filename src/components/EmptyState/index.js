import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'styled-components/native';
import {EmptyStateContainer, EmptyStateText} from './styles';

function EmptyState() {
  const theme = useTheme();

  return (
    <EmptyStateContainer>
      <Icon name='clipboard' size={50} color={theme.colors.accent} />
      <EmptyStateText>Você ainda não tem tarefas cadastradas.</EmptyStateText>
    </EmptyStateContainer>
  );
}

export default EmptyState;
