import React from "react";
import { Alert, Box, Button } from "@mui/material";

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    React.PropsWithChildren,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, errorInfo: unknown) {
        //Sentry
        console.error("ErrorBoundary caught error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ mt: 4 }}>
                    <Alert
                        severity="error"
                        action={
                            <Button color="inherit" size="small" onClick={this.handleReload}>
                                Reload
                            </Button>
                        }
                    >
                        مشکلی در برنامه رخ داده است. لطفاً دوباره تلاش کنید.
                    </Alert>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
