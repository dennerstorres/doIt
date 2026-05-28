import styled from 'styled-components/native';
import {BaseInputContainer, BaseClearButton, BaseInput} from '../Shared/styles';

export const TaskAdd = styled.View`
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.medium};
`;

export const InputContainer = styled(BaseInputContainer)`
  flex: 1;
`;

export const TaskText = styled(BaseInput)`
  height: 40px;
  padding-left: ${props => props.theme.spacing.medium};
`;

export const ClearButton = styled(BaseClearButton)`
  padding: 0 ${props => props.theme.spacing.small};
  height: 100%;
`;

export const ButtonAdd = styled.TouchableOpacity`
  height: 40px;
  width: 50px;
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const Counter = styled.Text`
  font-size: ${props => props.theme.typography.size.small};
  color: ${props => props.theme.colors.secondary};
  text-align: right;
  margin-top: ${props => props.theme.spacing.tiny};
  margin-right: 50px;
`;

export const PriorityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.small};
  padding: 0 ${props => props.theme.spacing.tiny};
`;

export const PriorityLabel = styled.Text`
  font-size: ${props => props.theme.typography.size.small};
  color: ${props => props.theme.colors.text};
  margin-right: ${props => props.theme.spacing.small};
`;

export const PriorityButton = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.tiny}
    ${props => props.theme.spacing.small};
  border-radius: 4px;
  background-color: ${props =>
    props.$active ? props.$color : props.theme.colors.background};
  margin-right: ${props => props.theme.spacing.tiny};
  border: 1px solid ${props => props.$color};
`;

export const PriorityText = styled.Text`
  font-size: 10px;
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props => (props.$active ? props.theme.colors.white : props.$color)};
`;
