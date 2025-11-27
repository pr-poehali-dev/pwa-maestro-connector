import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

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

interface MasterDashboardProps {
  onNavigate: (tab: string) => void;
}

const MasterDashboard = ({ onNavigate }: MasterDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Добро пожаловать, Анна!</h2>
          <p className="text-muted-foreground">Вот что происходит сегодня</p>
        </div>
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>АП</AvatarFallback>
        </Avatar>
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

        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">Создать запись</h3>
                <p className="text-sm opacity-90">Добавьте новую запись клиента в несколько кликов</p>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full" 
                onClick={() => onNavigate('calendar')}
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Новая запись
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MasterDashboard;