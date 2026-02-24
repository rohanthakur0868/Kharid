import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center bg-red-50 rounded-xl m-4 border border-red-100">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong.</h2>
                    <p className="text-gray-600 mb-4">We encountered an error loading this section.</p>
                    <button
                        onClick={() => {
                            localStorage.removeItem('cart');
                            window.location.reload();
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
                    >
                        Reset Cart & Reload
                    </button>
                    <details className="mt-4 text-left text-xs text-gray-400">
                        {this.state.error && this.state.error.toString()}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
