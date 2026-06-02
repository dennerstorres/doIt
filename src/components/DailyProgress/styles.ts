import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 0 ${props => props.theme.spacing.medium};
  margin-top: ${props => props.theme.spacing.small};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.tiny};
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.bold};
`;

export const Percentage = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.bold};
`;

export const ProgressBarWrapper = styled.View`
  width: 100%;
`;
