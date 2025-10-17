'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/why-robotics', label: 'Why robotics?' },
    { href: '/guardian-dashboard', label: 'Guardian Dashboard' },
    { href: '/safety-log', label: 'Incident Log' },
  ];

  return (
    <nav className="px-4 pb-4 space-y-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded tracking-tight transition-colors ${
              isActive
                ? 'bg-gray-100 text-black font-medium'
                : 'hover:bg-gray-50'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
