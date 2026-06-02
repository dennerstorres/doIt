import styled from 'styled-components/native';

interface ProgressProps {
  $width: string;
  $color: string;
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 20,
  },
})`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Section = styled.View`
  width: 100%;
  padding: ${props => props.theme.spacing.medium};
`;

export const SectionTitle = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.large};
  font-weight: ${props => props.theme.typography.weight.bold};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

export const Card = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.spacing.small};
  padding: ${props => props.theme.spacing.large};
  margin-bottom: ${props => props.theme.spacing.medium};
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const MainStatContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const MainStatValue = styled.Text`
  color: ${props => props.theme.colors.primary};
  font-size: 48px;
  font-weight: ${props => props.theme.typography.weight.bold};
`;

export const MainStatLabel = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.medium};
  margin-top: ${props => props.theme.spacing.tiny};
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.small};
`;

export const SpacedRow = styled(Row)`
  margin-top: ${props => props.theme.spacing.xlarge};
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.medium};
`;

export const Value = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.medium};
  font-weight: ${props => props.theme.typography.weight.bold};
`;

export const SpacedProgressBarContainer = styled.View`
  margin-top: ${props => props.theme.spacing.xlarge};
`;

export const StatItem = styled.View`
  margin-bottom: ${props => props.theme.spacing.medium};
`;

export const EmptyMessage = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.size.medium};
  text-align: center;
  margin-top: ${props => props.theme.spacing.huge};
`;
