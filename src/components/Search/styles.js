import styled from 'styled-components/native';
import {BaseInputContainer, BaseClearButton, BaseInput} from '../Shared/styles';

export const SearchContainer = styled.View`
  padding: ${props => props.theme.spacing.small}
    ${props => props.theme.spacing.large};
`;

export const InputContainer = styled(BaseInputContainer)`
  border-radius: ${props => props.theme.spacing.small};
  padding: 0 ${props => props.theme.spacing.medium};
`;

export const SearchInput = styled(BaseInput)`
  padding: 0 ${props => props.theme.spacing.small};
`;

export const ClearButton = styled(BaseClearButton)`
  padding: ${props => props.theme.spacing.tiny};
`;
