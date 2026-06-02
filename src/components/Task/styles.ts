import styled from 'styled-components/native';
import {Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  done: boolean;
}

export const Container = styled(Animated.View)<ContainerProps>`
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

interface TaskTextProps {
  done: boolean;
}

export const TaskText = styled.Text<TaskTextProps>`
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

interface RightActionContainerProps {
  type?: 'edit' | 'archive';
}

export const RightActionContainer = styled.TouchableOpacity<RightActionContainerProps>`
  background-color: ${props => {
    if (props.type === 'edit') {
      return props.theme.colors.accent;
    }
    if (props.type === 'archive') {
      return props.theme.colors.secondary;
    }
    return props.theme.colors.error;
  }};
  justify-content: center;
  align-items: flex-end;
  height: 50px;
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

interface PriorityIndicatorProps {
  $color: string;
}

export const PriorityIndicator = styled.View<PriorityIndicatorProps>`
  width: ${props => props.theme.spacing.nano};
  height: 20px;
  border-radius: ${props => props.theme.spacing.nano};
  background-color: ${props => props.$color};
  margin-right: ${props => props.theme.spacing.small};
`;

export const PriorityEditRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.nano};
`;

interface PriorityEditButtonProps {
  $active: boolean;
  $color: string;
}

export const PriorityEditButton = styled.TouchableOpacity<PriorityEditButtonProps>`
  padding: ${props => props.theme.spacing.nano}
    ${props => props.theme.spacing.tiny};
  border-radius: ${props => props.theme.spacing.small};
  background-color: ${props => (props.$active ? props.$color : 'transparent')};
  margin-right: ${props => props.theme.spacing.small};
  border: 1px solid ${props => props.$color};
`;

interface PriorityEditTextProps {
  $active: boolean;
  $color: string;
}

export const PriorityEditText = styled.Text<PriorityEditTextProps>`
  font-size: ${props => props.theme.typography.size.nano};
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props => (props.$active ? props.theme.colors.white : props.$color)};
`;

export const RepeatEditRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.nano};
`;

interface RepeatEditButtonProps {
  $active: boolean;
  $color: string;
}

export const RepeatEditButton = styled.TouchableOpacity<RepeatEditButtonProps>`
  padding: ${props => props.theme.spacing.nano}
    ${props => props.theme.spacing.tiny};
  border-radius: ${props => props.theme.spacing.small};
  background-color: ${props => (props.$active ? props.$color : 'transparent')};
  margin-right: ${props => props.theme.spacing.small};
  border: 1px solid ${props => props.$color};
`;

interface RepeatEditTextProps {
  $active: boolean;
  $color: string;
}

export const RepeatEditText = styled.Text<RepeatEditTextProps>`
  font-size: ${props => props.theme.typography.size.nano};
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props => (props.$active ? props.theme.colors.white : props.$color)};
`;

export const RepeatTag = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${props => props.theme.spacing.small};
`;

export const RepeatTagText = styled.Text`
  font-size: ${props => props.theme.typography.size.tiny};
  color: ${props => props.theme.colors.white};
  font-weight: ${props => props.theme.typography.weight.bold};
  margin-left: 2px;
`;

export const DeadlineTag = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${props => props.theme.spacing.small};
`;

interface DeadlineTagTextProps {
  isExpired: boolean;
}

export const DeadlineTagText = styled.Text<DeadlineTagTextProps>`
  font-size: ${props => props.theme.typography.size.tiny};
  color: ${props =>
    props.isExpired ? props.theme.colors.error : props.theme.colors.accent};
  font-weight: ${props => props.theme.typography.weight.bold};
  margin-left: 2px;
`;

export const DeadlineEditRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.nano};
`;

interface DeadlineEditButtonProps {
  $active: boolean;
}

export const DeadlineEditButton = styled.TouchableOpacity<DeadlineEditButtonProps>`
  flex-direction: row;
  align-items: center;
  padding: ${props => props.theme.spacing.nano}
    ${props => props.theme.spacing.tiny};
  border-radius: ${props => props.theme.spacing.small};
  background-color: ${props =>
    props.$active ? props.theme.colors.accent : 'transparent'};
  border: 1px solid ${props => props.theme.colors.accent};
`;

interface DeadlineEditTextProps {
  $active: boolean;
}

export const DeadlineEditText = styled.Text<DeadlineEditTextProps>`
  font-size: ${props => props.theme.typography.size.nano};
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props =>
    props.$active ? props.theme.colors.white : props.theme.colors.accent};
  margin-left: 2px;
`;

export const CategoryTag = styled.View`
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.accent};
  margin-left: ${props => props.theme.spacing.small};
`;

export const CategoryTagText = styled.Text`
  font-size: ${props => props.theme.typography.size.tiny};
  color: ${props => props.theme.colors.secondary};
  font-weight: ${props => props.theme.typography.weight.bold};
`;

export const CategoryEditRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.nano};
`;

export const CategoryEditScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
`;

interface CategoryEditButtonProps {
  $active: boolean;
  $color: string;
}

export const CategoryEditButton = styled.TouchableOpacity<CategoryEditButtonProps>`
  padding: ${props => props.theme.spacing.nano}
    ${props => props.theme.spacing.tiny};
  border-radius: ${props => props.theme.spacing.small};
  background-color: ${props => (props.$active ? props.$color : 'transparent')};
  margin-right: ${props => props.theme.spacing.small};
  border: 1px solid ${props => props.$color};
`;

interface CategoryEditTextProps {
  $active: boolean;
  $color: string;
}

export const CategoryEditText = styled.Text<CategoryEditTextProps>`
  font-size: ${props => props.theme.typography.size.nano};
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props => (props.$active ? props.theme.colors.white : props.$color)};
`;
