import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const appointments = [
  { id: 1, time: '09:00', client: 'Мария Соколова', service: 'Маникюр с покрытием', duration: 60, status: 'confirmed', date: '2024-11-27' },
  { id: 2, time: '10:30', client: 'Анна Иванова', service: 'Педикюр', duration: 90, status: 'pending', date: '2024-11-27' },
  { id: 3, time: '14:00', client: 'Елена Петрова', service: 'Маникюр с покрытием', duration: 60, status: 'confirmed', date: '2024-11-27' },
  { id: 4, time: '16:00', client: 'Ольга Смирнова', service: 'Чистка лица', duration: 60, status: 'confirmed', date: '2024-11-27' },
];

const services = [
  { id: 'all', name: 'Все услуги' },
  { id: '1', name: 'Маникюр с покрытием' },
  { id: '2', name: 'Педикюр' },
  { id: '3', name: 'Чистка лица' },
];

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const MasterCalendar = () => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [prepaymentPercent, setPrepaymentPercent] = useState(0);

  const filteredAppointments = selectedServiceFilter === 'all' 
    ? appointments 
    : appointments.filter(a => a.service === services.find(s => s.id === selectedServiceFilter)?.name);

  return (
    <div className="space-y-4 pb-20">
      <div className="sticky top-[73px] z-30 bg-background pt-4 pb-3 border-b">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold">Календарь записей</h2>
            <p className="text-sm text-muted-foreground">Среда, 27 ноября 2024</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={view === 'day' ? 'default' : 'outline'} 
              onClick={() => setView('day')}
            >
              <Icon name="Calendar" size={14} className="mr-1" />
              День
            </Button>
            <Button 
              size="sm" 
              variant={view === 'week' ? 'default' : 'outline'} 
              onClick={() => setView('week')}
            >
              <Icon name="CalendarDays" size={14} className="mr-1" />
              Неделя
            </Button>
            <Button 
              size="sm" 
              variant={view === 'month' ? 'default' : 'outline'} 
              onClick={() => setView('month')}
            >
              <Icon name="CalendarRange" size={14} className="mr-1" />
              Месяц
            </Button>
          </div>

          <Select value={selectedServiceFilter} onValueChange={setSelectedServiceFilter}>
            <SelectTrigger className="w-48 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {services.map(service => (
                <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex-1" />
          
          <div className="flex gap-1">
            <Button size="sm" variant="ghost">
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button size="sm" variant="ghost">
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {view === 'day' && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const appointment = filteredAppointments.find(a => a.time === time);
                
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
      )}

      {view === 'week' && (
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-2 mb-2">
                  <div className="text-xs text-muted-foreground font-medium"></div>
                  {weekDays.map((day, idx) => (
                    <div key={day} className="text-center">
                      <p className="text-xs font-medium">{day}</p>
                      <p className="text-lg font-bold">{24 + idx}</p>
                    </div>
                  ))}
                </div>

                {timeSlots.slice(0, 8).map((time) => (
                  <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                    <div className="text-xs text-muted-foreground font-medium py-2">{time}</div>
                    {weekDays.map((_, dayIdx) => {
                      const hasAppointment = dayIdx === 2 && filteredAppointments.some(a => a.time === time);
                      return (
                        <div
                          key={dayIdx}
                          className={`min-h-12 rounded border ${
                            hasAppointment
                              ? 'bg-primary/10 border-primary/30 p-1'
                              : 'bg-muted/30 hover:bg-muted/50 cursor-pointer'
                          }`}
                        >
                          {hasAppointment && (
                            <p className="text-xs font-medium truncate">Занято</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {view === 'month' && (
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0 w-full"
              classNames={{
                months: "w-full",
                month: "w-full",
                table: "w-full border-collapse",
                head_row: "flex w-full",
                head_cell: "flex-1 text-muted-foreground rounded-md w-full font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "flex-1 h-16 text-center text-sm relative p-0 focus-within:relative focus-within:z-20",
                day: "h-full w-full p-0 font-normal hover:bg-accent hover:text-accent-foreground rounded-md",
              }}
            />
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Записи на выбранный день:</p>
              <div className="space-y-2">
                {filteredAppointments.slice(0, 3).map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{appointment.client}</p>
                        <p className="text-xs text-muted-foreground">{appointment.time} · {appointment.service}</p>
                      </div>
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                        {appointment.status === 'confirmed' ? 'Подтв.' : 'Ожид.'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="fixed bottom-20 right-4 z-40">
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowNewAppointment(true)}
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>

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
              <Label>Услуги (можно выбрать несколько)</Label>
              <div className="space-y-2">
                {[
                  { id: '1', name: 'Маникюр с покрытием', duration: 60, price: 1500 },
                  { id: '2', name: 'Педикюр', duration: 90, price: 2000 },
                  { id: '3', name: 'Снятие покрытия', duration: 15, price: 300 },
                ].map(service => (
                  <label 
                    key={service.id} 
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                  >
                    <Checkbox 
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedServices([...selectedServices, service.id]);
                        } else {
                          setSelectedServices(selectedServices.filter(id => id !== service.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.duration} мин · {service.price} ₽</p>
                    </div>
                  </label>
                ))}
              </div>
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

            <div className="space-y-3 p-3 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Требуется предоплата</Label>
                  <p className="text-xs text-muted-foreground">Клиент оплачивает часть при записи</p>
                </div>
                <Switch 
                  checked={prepaymentPercent > 0} 
                  onCheckedChange={(checked) => setPrepaymentPercent(checked ? 30 : 0)}
                />
              </div>
              {prepaymentPercent > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Размер предоплаты (%)</Label>
                  <Input 
                    type="number" 
                    min="10" 
                    max="100" 
                    value={prepaymentPercent}
                    onChange={(e) => setPrepaymentPercent(parseInt(e.target.value) || 0)}
                  />
                </div>
              )}
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