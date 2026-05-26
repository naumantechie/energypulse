import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';

export default function CountryNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <Globe className="h-12 w-12 text-muted-foreground">
                <div>
                    <h2 className="text-xl font-bold">Country Not Found</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        We don't have data for that country yet
                    </p>
                </div>
                <Link href="/countries">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Countries
                    </Button>
                </Link>
            </Globe>
        </div>
    );
}
