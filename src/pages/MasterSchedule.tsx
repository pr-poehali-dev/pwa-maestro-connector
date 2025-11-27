import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const daysOfWeek = [
  { id: 'monday', name: 'Понедельник', short: 'ПН' },
  { id: 'tuesday', name: 'Вторник', short: 'ВТ' },
  { id: 'wednesday', name: 'Среда', short: 'СР' },
  { id: 'thursday', name: 'Четверг', short: 'ЧТ' },
  { id: 'friday', name: 'Пятница', short: 'ПТ' },
  { id: 'saturday', name: 'Суббота', short: 'СБ' },
  { id: 'sunday', name: 'Воскресенье', short: 'ВС' },
];

const MasterSchedule = () => {
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: '09:00', end: '18:00' },
    tuesday: { enabled: true, start: '09:00', end: '18:00' },
    wednesday: { enabled: true, start: '09:00', end: '18:00' },
    thursday: { enabled: true, start: '09:00', end: '18:00' },
    friday: { enabled: true, start: '09:00', end: '18:00' },
    saturday: { enabled: true, start: '10:00', end: '16:00' },
    sunday: { enabled: false, start: '10:00', end: '16:00' },
  });

  const toggleDay = (dayId: string) => {
    setSchedule({
      ...schedule,
      [dayId]: {
        ...schedule[dayId as keyof typeof schedule],
        enabled: !schedule[dayId as keyof typeof schedule].enabled,
      },
    });
  };

  const updateTime = (dayId: string, field: 'start' | 'end', value: string) => {
    setSchedule({
      ...schedule,
      [dayId]: {
        ...schedule[dayId as keyof typeof schedule],
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Рабочее расписание</h2>
        <p className="text-sm text-muted-foreground">Настройте часы работы по дням недели</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">График работы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {daysOfWeek.map((day) => {
            const daySchedule = schedule[day.id as keyof typeof schedule];
            
            return (
              <div key={day.id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <div className="w-32">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={daySchedule.enabled}
                      onCheckedChange={() => toggleDay(day.id)}
                    />
                    <span className="font-medium text-sm">{day.name}</span>
                  </div>
                </div>

                {daySchedule.enabled ? (
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground w-8">С</Label>
                      <Input
                        type="time"
                        value={daySchedule.start}
                        onChange={(e) => updateTime(day.id, 'start', e.target.value)}
                        className="w-32"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground w-8">До</Label>
                      <Input
                        type="time"
                        value={daySchedule.end}
                        onChange={(e) => updateTime(day.id, 'end', e.target.value)}
                        className="w-32"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({Math.round((parseInt(daySchedule.end.split(':')[0]) - parseInt(daySchedule.start.split(':')[0])) + 
                      (parseInt(daySchedule.end.split(':')[1]) - parseInt(daySchedule.start.split(':')[1])) / 60)} ч)
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Выходной</span>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Быстрые настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Clock" size={16} className="mr-2" />
            Установить стандартный график (пн-пт 9:00-18:00)
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Copy" size={16} className="mr-2" />
            Скопировать график на следующую неделю
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Заблокированные даты</CardTitle>
            <Button size="sm">
              <Icon name="Plus" size={14} className="mr-1" />
              Добавить
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-sm text-muted-foreground">
            <Icon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
            <p>Нет заблокированных дат</p>
            <p className="text-xs mt-1">Блокируйте даты для отпусков и больничных</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Отмена
        </Button>
        <Button className="flex-1">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить расписание
        </Button>
      </div>
    </div>
  );
};

export default MasterSchedule;
