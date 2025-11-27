import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';

const masterInfo = {
  name: 'Анна Петрова',
  avatar: '/placeholder.svg',
  category: 'Маникюр и педикюр',
};

const service = {
  name: 'Маникюр с покрытием',
  duration: 60,
  price: 1500,
  description: 'Классический маникюр с покрытием гель-лаком премиум качества',
  type: 'offline',
  address: 'г. Москва, ул. Примерная, д. 1',
  isGroup: false,
  maxParticipants: 1,
  currentParticipants: 0,
};

const availableSlots = [
  { date: '2024-11-28', times: ['10:00', '12:00', '14:00', '16:00'] },
  { date: '2024-11-29', times: ['09:00', '11:00', '15:00', '17:00'] },
  { date: '2024-11-30', times: ['10:00', '13:00', '16:00'] },
];

const PublicBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date('2024-11-28'));
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const dateSlots = availableSlots.find(
    (slot) => slot.date === selectedDate?.toISOString().split('T')[0]
  );

  const handleSubmit = () => {
    alert(`Запись создана!\\nДата: ${selectedDate?.toLocaleDateString('ru-RU')}\\nВремя: ${selectedTime}\\nКлиент: ${clientData.name}`);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-white border-b border-border py-3 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-lg font-bold text-primary">Онлайн-запись</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-lg">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={masterInfo.avatar} />
                <AvatarFallback>{masterInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{masterInfo.name}</h2>
                <p className="text-sm text-muted-foreground">{masterInfo.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-1">{service.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
            <div className="flex items-center gap-3 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                <span>{service.duration} мин</span>
              </div>
              <div className="flex items-center gap-1 font-semibold">
                <Icon name="Wallet" size={14} />
                <span>{service.price} ₽</span>
              </div>
            </div>

            {service.type === 'offline' && (
              <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <Icon name="MapPin" size={16} className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Оффлайн встреча</p>
                  <p className="text-xs text-muted-foreground">{service.address}</p>
                </div>
              </div>
            )}

            {service.type === 'online' && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <Icon name="Video" size={16} className="mt-0.5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Онлайн консультация</p>
                  <p className="text-xs text-blue-700">Ссылка придёт за 15 минут до начала</p>
                </div>
              </div>
            )}

            {service.isGroup && (
              <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg mt-3">
                <Icon name="Users" size={16} className="mt-0.5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Групповая запись</p>
                  <p className="text-xs text-muted-foreground">
                    Осталось {service.maxParticipants - service.currentParticipants} мест из {service.maxParticipants}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Выберите дату и время</h3>

            <div className="mb-3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto"
                disabled={(date) => {
                  const dateStr = date.toISOString().split('T')[0];
                  return !availableSlots.some(slot => slot.date === dateStr);
                }}
              />
            </div>

            {dateSlots && (
              <div>
                <Label className="mb-3 block">Доступное время:</Label>
                <div className="grid grid-cols-3 gap-2">
                  {dateSlots.times.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => {
                        setSelectedTime(time);
                        setStep(2);
                      }}
                      className="w-full"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {step === 2 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Ваши данные</h3>

              <div className="space-y-3 mb-4">
                <div className="space-y-2">
                  <Label>Имя *</Label>
                  <Input
                    placeholder="Ваше имя"
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Телефон *</Label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email (опционально)</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg mb-4">
                <h4 className="font-medium text-sm mb-3">Детали записи:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Услуга:</span>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата:</span>
                    <span className="font-medium">{selectedDate?.toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Время:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-muted-foreground">К оплате:</span>
                    <span className="font-bold text-lg">{service.price} ₽</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!clientData.name || !clientData.phone}
              >
                Подтвердить запись
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default PublicBooking;