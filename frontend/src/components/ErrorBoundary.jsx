import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorId: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true, errorId: Math.random().toString(36).substring(7) }; 
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong. Error ID: {this.state.errorId}</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
