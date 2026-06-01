import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {Task} from '../../types';

export const List = styled.FlatList`
  width: 100%;
  margin-top: ${props => props.theme.spacing.medium};
` as unknown as typeof FlatList;
