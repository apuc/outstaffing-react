import React, {Component} from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {error};
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <div>Что-то пошло не так =( {error}</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary