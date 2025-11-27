import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const appointments = [
  { id: 1, time: '09:00', client: 'Мария Соколова', service: 'Маникюр с покрытием', duration: 60, status: 'confirmed' },
  { id: 2, time: '10:30', client: 'Анна Иванова', service: 'Педикюр', duration: 90, status: 'pending' },
  { id: 3, time: '14:00', client: 'Елена Петрова', service: 'Маникюр с покрытием', duration: 60, status: 'confirmed' },
  { id: 4, time: '16:00', client: 'Ольга Смирнова', service: 'Чистка лица', duration: 60, status: 'confirmed' },
];

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const MasterCalendar = () => {
  const [view, setView] = useState<'day' | 'week'>('day');
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Календарь записей</h2>
          <p className="text-sm text-muted-foreground">Среда, 27 ноября 2024</p>
        </div>
        <Button onClick={() => setShowNewAppointment(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Новая запись
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={view === 'day' ? 'default' : 'outline'} onClick={() => setView('day')}>
          <Icon name="Calendar" size={16} className="mr-2" />
          День
        </Button>
        <Button variant={view === 'week' ? 'default' : 'outline'} onClick={() => setView('week')}>
          <Icon name="CalendarDays" size={16} className="mr-2" />
          Неделя
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon">
          <Icon name="ChevronLeft" size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            {timeSlots.map((time) => {
              const appointment = appointments.find(a => a.time === time);
              
              return (
                <div key={time} className="flex items-stretch min-h-16 border-b last:border-b-0">
                  <div className="w-16 flex items-center justify-center text-sm text-muted-foreground font-medium border-r">
                    {time}
                  </div>
                  
                  <div className="flex-1 p-2">
                    {appointment ? (
                      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{appointment.client}</p>
                              <p className="text-xs text-muted-foreground truncate">{appointment.service}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {appointment.duration} мин
                                </Badge>
                                <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                                  {appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидание'}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                <Icon name="Phone" size={12} />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                <Icon name="MoreVertical" size={12} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedTime(time);
                          setShowNewAppointment(true);
                        }}
                        className="w-full h-full flex items-center justify-center text-xs text-muted-foreground hover:bg-muted/50 rounded transition-colors"
                      >
                        Свободно
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showNewAppointment} onOpenChange={setShowNewAppointment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новая запись</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Клиент</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Мария Соколова</SelectItem>
                  <SelectItem value="2">Анна Иванова</SelectItem>
                  <SelectItem value="3">Елена Петрова</SelectItem>
                  <SelectItem value="new">+ Добавить нового клиента</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Услуга</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите услугу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Маникюр с покрытием (60 мин, 1500 ₽)</SelectItem>
                  <SelectItem value="2">Педикюр (90 мин, 2000 ₽)</SelectItem>
                  <SelectItem value="3">Чистка лица (60 мин, 3000 ₽)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Дата</Label>
                <Input type="date" defaultValue="2024-11-27" />
              </div>
              <div className="space-y-2">
                <Label>Время</Label>
                <Select defaultValue={selectedTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Заметка (опционально)</Label>
              <Input placeholder="Примечание к записи" />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowNewAppointment(false)}>
                Отмена
              </Button>
              <Button className="flex-1" onClick={() => setShowNewAppointment(false)}>
                Создать запись
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterCalendar;
