import React, {Component, ErrorInfo, ReactNode} from 'react';
import {logger} from '../../utils/logger';
import {
  Container,
  Title,
  Message,
  RetryButton,
  RetryButtonText,
} from './styles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return {hasError: true};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({hasError: false});
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Title>Ops! Algo deu errado.</Title>
          <Message>
            Ocorreu um erro inesperado no aplicativo. Por favor, tente
            novamente.
          </Message>
          <RetryButton onPress={this.handleRetry}>
            <RetryButtonText>Tentar Novamente</RetryButtonText>
          </RetryButton>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
