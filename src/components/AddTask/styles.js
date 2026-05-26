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
