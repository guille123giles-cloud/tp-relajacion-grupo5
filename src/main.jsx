import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fee2e2', color: '#991b1b', fontFamily: 'sans-serif', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>¡Ups! Algo se rompió en la página.</h1>
          <p>Por favor envíale una captura de esta pantalla al asistente de IA para que lo arregle de inmediato:</p>
          <pre style={{ marginTop: '20px', background: '#fef2f2', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <pre style={{ marginTop: '10px', background: '#fef2f2', padding: '15px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px' }}>
            {this.state.info && this.state.info.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
