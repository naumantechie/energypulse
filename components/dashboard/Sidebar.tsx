'use-client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, Map, BarChart3, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Countries', href: '/countries', icon: Globe },
    { label: 'World Map', href: '/map', icon: Map },
    { label: 'Compare', href: 'compare', icon: BarChart3 },
];

export function Sidebar() {
    const pathName = usePathname();

    return (
        <aside className="w-64-border-r border-border bg card flex felx-col">
            {/* Logo */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-green-500" />
                    <span className="font-bold text-lg">EnergyPulse</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Renewable Intelligence
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathName === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                                isActive
                                    ? 'bg-green-500/10 text-green-500 font-medium'
                                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                    Data updates every 15 minutes
                </p>
            </div>
        </aside>
    );
}
