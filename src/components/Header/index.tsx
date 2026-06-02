import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {Container, Title, ActionButton, BackButton} from './styles';

interface HeaderProps {
  showBackButton?: boolean;
  showStatsButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  showStatsButton = true,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <Container $topInset={insets.top}>
      {showBackButton && (
        <BackButton onPress={onBack} testID='header-back-button'>
          <Icon name='arrow-left' size={24} color='#fff' />
        </BackButton>
      )}
      <Title>doIt</Title>
      {!showBackButton && showStatsButton && (
        <ActionButton
          onPress={() => navigation.navigate('Statistics')}
          testID='header-stats-button'>
          <Icon name='bar-chart-2' size={24} color='#fff' />
        </ActionButton>
      )}
    </Container>
  );
};

export default Header;
