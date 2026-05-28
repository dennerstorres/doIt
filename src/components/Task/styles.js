import styled from 'styled-components/native';
import {Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled(Animated.View)`
  background-color: ${props =>
    props.done ? props.theme.colors.primary : props.theme.colors.secondary};
  width: 100%;
  min-height: 50px;
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
  min-height: 50px;
`;

export const RightActionContainer = styled.TouchableOpacity`
  background-color: ${props =>
    props.type === 'edit'
      ? props.theme.colors.accent
      : props.theme.colors.error};
  justify-content: center;
  align-items: flex-end;
  min-height: 50px;
`;

export const EditInput = styled.TextInput`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.regular};
  flex: 1;
  padding: 0;
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

export const ActionsWrapper = styled.View`
  flex-direction: row;
`;

export const EditActions = styled.View`
  flex-direction: row;
`;

export const EditContentWrapper = styled.View`
  flex: 1;
`;

export const CancelIcon = styled(Icon)`
  margin-right: ${props => props.theme.spacing.medium};
`;

export const PriorityIndicator = styled.View`
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background-color: ${props => props.$color};
  margin-right: ${props => props.theme.spacing.small};
`;

export const PriorityEditRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.nano};
`;

export const PriorityEditButton = styled.TouchableOpacity`
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${props => (props.$active ? props.$color : 'transparent')};
  margin-right: 4px;
  border: 1px solid ${props => props.$color};
`;

export const PriorityEditText = styled.Text`
  font-size: 8px;
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props => (props.$active ? props.theme.colors.white : props.$color)};
`;
