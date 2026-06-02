import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs(props => ({
  size: 'large',
  color: props.theme.colors.primary,
}))`
  margin-top: ${props => props.theme.spacing.large};
`;
