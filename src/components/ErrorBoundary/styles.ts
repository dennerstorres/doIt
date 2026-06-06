import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({theme}) => theme.spacing.xlarge};
  background-color: ${({theme}) => theme.colors.background};
`;

export const Title = styled.Text`
  font-size: ${({theme}) => theme.typography.size.xlarge};
  font-weight: ${({theme}) => theme.typography.weight.bold};
  color: ${({theme}) => theme.colors.error};
  margin-bottom: ${({theme}) => theme.spacing.medium};
  text-align: center;
`;

export const Message = styled.Text`
  font-size: ${({theme}) => theme.typography.size.medium};
  color: ${({theme}) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({theme}) => theme.spacing.xlarge};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${({theme}) => theme.spacing.medium} ${({theme}) => theme.spacing.xlarge};
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.typography.size.medium};
  font-weight: ${({theme}) => theme.typography.weight.bold};
`;
