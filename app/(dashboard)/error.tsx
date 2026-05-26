'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function DashboardError({ error, reset }: Props) {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500" />
            <div>
                <h2 className="text-xl font-bold">Something went wrong</h2>
                <p className="text-muted-foreground text-sm mt-1">
                    {error.message || 'An unexpected error occurred'}
                </p>
            </div>
            <Button onClick={reset} variant="outline">
                Try again
            </Button>
        </div>
    );
}
