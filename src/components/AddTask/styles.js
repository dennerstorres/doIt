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
  min-height: 40px;
  padding-left: ${props => props.theme.spacing.medium};
`;

export const ClearButton = styled(BaseClearButton)`
  padding: 0 ${props => props.theme.spacing.small};
  min-height: 40px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  min-height: 40px;
  width: ${props => props.theme.spacing.huge};
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const Counter = styled.Text`
  font-size: ${props => props.theme.typography.size.small};
  color: ${props => props.theme.colors.secondary};
  text-align: right;
  margin-top: ${props => props.theme.spacing.tiny};
  margin-right: ${props => props.theme.spacing.huge};
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
  border-radius: ${props => props.theme.spacing.small};
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

export const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.theme.spacing.small};
  padding: 0 ${props => props.theme.spacing.tiny};
`;

export const CategoryLabel = styled.Text`
  font-size: ${props => props.theme.typography.size.small};
  color: ${props => props.theme.colors.text};
  margin-right: ${props => props.theme.spacing.small};
`;

export const CategoryScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
`;

export const CategoryButton = styled.TouchableOpacity`
  padding: ${props => props.theme.spacing.tiny}
    ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.spacing.small};
  background-color: ${props =>
    props.$active ? props.theme.colors.primary : props.theme.colors.background};
  margin-right: ${props => props.theme.spacing.tiny};
  border: 1px solid ${props => props.theme.colors.primary};
`;

export const CategoryText = styled.Text`
  font-size: 10px;
  font-weight: ${props => props.theme.typography.weight.bold};
  color: ${props =>
    props.$active ? props.theme.colors.white : props.theme.colors.primary};
`;
