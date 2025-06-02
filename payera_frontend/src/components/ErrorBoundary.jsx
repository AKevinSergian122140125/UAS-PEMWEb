import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-danger text-white">
                  <h4 className="mb-0">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Oops! Something went wrong
                  </h4>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-3">
                    We're sorry, but something unexpected happened. Please try refreshing the page.
                  </p>
                  
                  <div className="d-flex gap-2 mb-3">
                    <button 
                      className="btn btn-primary"
                      onClick={() => window.location.reload()}
                    >
                      <i className="bi bi-arrow-clockwise me-1"></i>
                      Refresh Page
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                    >
                      Try Again
                    </button>
                  </div>

                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="mt-3">
                      <summary className="btn btn-outline-info btn-sm">
                        Show Error Details (Development)
                      </summary>
                      <div className="mt-2">
                        <pre className="bg-light p-3 rounded small">
                          {this.state.error && this.state.error.toString()}
                          <br />
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
