import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled(Animated.View)`
  background-color: ${props =>
    props.done ? props.theme.colors.primary : props.theme.colors.secondary};
  width: 100%;
  height: 50px;
  justify-content: center;
  padding: ${props =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.large}`};
  margin-bottom: ${props => props.theme.spacing.tiny};
  flex-direction: row;
  align-items: center;
`;

export const TaskText = styled.Text`
  color: ${props =>
    props.done ? props.theme.colors.accent : props.theme.colors.white};
  text-decoration-line: ${props => (props.done ? 'line-through' : 'none')};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.regular};
  flex: 1;
`;

export const LeftActionContainer = styled(Animated.View)`
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  height: 50px;
`;

export const RightActionContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.error};
  justify-content: center;
  align-items: flex-end;
  height: 50px;
`;

export const ActionContent = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  padding: 0 ${props => props.theme.spacing.large};
`;

export const ActionText = styled(Animated.Text)`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.bold};
  margin-left: ${props => props.theme.spacing.small};
`;
