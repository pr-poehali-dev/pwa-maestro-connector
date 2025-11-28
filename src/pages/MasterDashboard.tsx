import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const upcomingAppointments = [
  {
    id: 1,
    clientName: 'Мария Соколова',
    service: 'Маникюр с покрытием',
    time: '10:00',
    date: 'Сегодня',
    duration: 60,
    price: 1500,
    status: 'confirmed',
  },
  {
    id: 2,
    clientName: 'Анна Иванова',
    service: 'Педикюр',
    time: '12:00',
    date: 'Сегодня',
    duration: 90,
    price: 2000,
    status: 'pending',
  },
  {
    id: 3,
    clientName: 'Елена Петрова',
    service: 'Маникюр с покрытием',
    time: '15:00',
    date: 'Сегодня',
    duration: 60,
    price: 1500,
    status: 'confirmed',
  },
];

const stats = [
  {
    title: 'Записей сегодня',
    value: '5',
    change: '+2 к вчера',
    icon: 'Calendar',
    trend: 'up',
  },
  {
    title: 'Выручка за сегодня',
    value: '7 500 ₽',
    change: '+15%',
    icon: 'TrendingUp',
    trend: 'up',
  },
  {
    title: 'Загрузка',
    value: '68%',
    change: 'Рабочий день',
    icon: 'Clock',
    trend: 'neutral',
  },
  {
    title: 'Новых клиентов',
    value: '3',
    change: 'За неделю',
    icon: 'Users',
    trend: 'up',
  },
];

const revenueData = [
  { day: '1', revenue: 15000 },
  { day: '5', revenue: 22000 },
  { day: '10', revenue: 18000 },
  { day: '15', revenue: 28000 },
  { day: '20', revenue: 35000 },
  { day: '25', revenue: 42000 },
  { day: '30', revenue: 48000 },
];

interface MasterDashboardProps {
  onNavigate: (tab: string) => void;
}

const MasterDashboard = ({ onNavigate }: MasterDashboardProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Добро пожаловать, Анна!</h2>
        <p className="text-muted-foreground">Вот что происходит сегодня</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Icon name={stat.icon as any} className="text-primary" size={20} />
                {stat.trend === 'up' && (
                  <Icon name="TrendingUp" className="text-green-500" size={16} />
                )}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Ближайшие записи</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('calendar')}>
              Все записи
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{appointment.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{appointment.clientName}</p>
                        <p className="text-xs text-muted-foreground">{appointment.service}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Timer" size={12} />
                        <span>{appointment.duration} мин</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Wallet" size={12} />
                        <span>{appointment.price} ₽</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидание'}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Icon name="Phone" size={14} />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Icon name="MessageSquare" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Популярные услуги</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Маникюр с покрытием</p>
                <p className="text-xs text-muted-foreground">24 записи в этом месяце</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">36 000 ₽</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Педикюр</p>
                <p className="text-xs text-muted-foreground">18 записей в этом месяце</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">36 000 ₽</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Покрытие гель-лак</p>
                <p className="text-xs text-muted-foreground">15 записей в этом месяце</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">22 500 ₽</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Выручка за месяц</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">48 000 ₽ • +12% к прошлому месяцу</p>
              </div>
              <Badge variant="outline" className="gap-1">
                <Icon name="TrendingUp" size={12} className="text-green-500" />
                <span className="text-green-500">+12%</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="day" 
                  className="text-xs" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-xs" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()} ₽`, 'Выручка']}
                  labelFormatter={(label) => `День ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Button 
        size="lg" 
        className="fixed bottom-20 right-4 z-40 shadow-lg md:h-14 md:w-14 md:rounded-full md:p-0 w-[calc(100%-2rem)] left-4 md:left-auto"
        onClick={() => onNavigate('calendar')}
      >
        <Icon name="Plus" size={20} className="md:mr-0 mr-2" />
        <span className="md:hidden">Новая запись</span>
      </Button>
    </div>
  );
};

export default MasterDashboard;