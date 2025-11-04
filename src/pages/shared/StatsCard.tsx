// src/components/shared/StatsCard.tsx

import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  variant?: 'success' | 'warning' | 'default';
}

const variantStyles: Record<string, string> = {
  success: 'border-green-500 text-green-700',
  warning: 'border-yellow-500 text-yellow-700',
  default: 'border-blue-500 text-blue-700',
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  variant = 'default',
}) => {
  const dynamicSize = value.length > 10 ? 'text-xl' : 'text-2xl';

  return (
    <Card className={cn(`p-4 border-2 rounded-lg flex flex-col gap-2`, variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <Icon className="w-6 h-6" />
      </div>

      <p className={`font-bold leading-tight ${dynamicSize} truncate`}>
        {value}
      </p>
    </Card>
  );
};

export default StatsCard;
