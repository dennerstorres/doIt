import React, {Component, ErrorInfo, ReactNode} from 'react';
import {Container, Title, Message, Button, ButtonText} from './styles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  handleRestart = () => {
    this.setState({hasError: false});
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container testID="error-boundary-fallback">
          <Title>Oops!</Title>
          <Message>
            Algo deu errado. Por favor, tente reiniciar o aplicativo.
          </Message>
          <Button onPress={this.handleRestart} testID="restart-button">
            <ButtonText>Tentar Novamente</ButtonText>
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
