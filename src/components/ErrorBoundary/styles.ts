import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
  padding: ${({theme}) => theme.spacing.xlarge};
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.typography.size.xlarge};
  font-weight: ${({theme}) => theme.typography.weight.bold};
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.medium};
  text-align: center;
`;

export const Message = styled.Text`
  font-size: ${({theme}) => theme.typography.size.large};
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.huge};
  text-align: center;
`;

export const RetryButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  padding-vertical: ${({theme}) => theme.spacing.medium};
  padding-horizontal: ${({theme}) => theme.spacing.xlarge};
  border-radius: ${({theme}) => theme.spacing.tiny};
`;

export const RetryButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.typography.size.medium};
  font-weight: ${({theme}) => theme.typography.weight.bold};
`;
