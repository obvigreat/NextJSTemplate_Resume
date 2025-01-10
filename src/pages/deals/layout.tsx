import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { 
  DocumentPlusIcon, 
  FolderIcon, 
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

interface DealsLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'All Deals', href: '/deals', icon: FolderIcon },
  { name: 'New Deal', href: '/deals/new', icon: DocumentPlusIcon },
  { name: 'Analytics', href: '/deals/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/deals/settings', icon: Cog6ToothIcon },
];

const DealsLayout: FC<DealsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <h1 className="text-2xl font-bold text-gray-900">M&A Deals</h1>
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                  >
                    <item.icon
                      className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1">
            <div className="py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DealsLayout; 