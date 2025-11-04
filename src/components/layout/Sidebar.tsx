import { useAuth } from '@/hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  IndianRupee,
  FileText,
  Activity,
  Eye,
  CreditCard,
  Clock,
  Receipt,
} from 'lucide-react';

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  roles: ('admin' | 'principal' | 'cashier')[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['admin', 'principal', 'cashier'],
  },
  // Admin only
  {
    title: 'User Management',
    path: '/users',
    icon: <Users className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Student Management',
    path: '/students',
    icon: <GraduationCap className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Academic Management',
    path: '/academic',
    icon: <BookOpen className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Fee Structure',
    path: '/fee-structure',
    icon: <IndianRupee className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Financial Reports',
    path: '/reports',
    icon: <FileText className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    title: 'Audit Logs',
    path: '/audit-logs',
    icon: <Activity className="h-5 w-5" />,
    roles: ['admin'],
  },
  // Principal only
  {
    title: 'View Students',
    path: '/view-students',
    icon: <Eye className="h-5 w-5" />,
    roles: ['principal'],
  },
  {
    title: 'View Reports',
    path: '/view-reports',
    icon: <FileText className="h-5 w-5" />,
    roles: ['principal'],
  },
  {
    title: 'View Audit Logs',
    path: '/view-audit',
    icon: <Activity className="h-5 w-5" />,
    roles: ['principal'],
  },
  // Cashier only
  {
    title: 'Fee Collection',
    path: '/fee-collection',
    icon: <CreditCard className="h-5 w-5" />,
    roles: ['cashier'],
  },
  {
    title: 'Daily Session',
    path: '/daily-session',
    icon: <Clock className="h-5 w-5" />,
    roles: ['cashier'],
  },
  {
    title: 'Reprint Receipt',
    path: '/reprint-receipt',
    icon: <Receipt className="h-5 w-5" />,
    roles: ['cashier'],
  },
];

const Sidebar = () => {
  const { user } = useAuth();

  const filteredNavItems = navItems.filter((item) => 
    user && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <h2 className="text-lg font-bold text-sidebar-foreground">Navigation</h2>
      </div>
      <nav className="px-3">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 mb-1 rounded-md text-sidebar-foreground transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'hover:bg-sidebar-accent/50'
              )
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
