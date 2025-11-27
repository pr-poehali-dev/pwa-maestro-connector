import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';

const categories = [
  { id: 1, name: 'Маникюр', icon: 'Sparkles', count: 124 },
  { id: 2, name: 'Парикмахер', icon: 'Scissors', count: 98 },
  { id: 3, name: 'Косметолог', icon: 'Heart', count: 76 },
  { id: 4, name: 'Массаж', icon: 'Hand', count: 54 },
  { id: 5, name: 'Психолог', icon: 'Brain', count: 43 },
  { id: 6, name: 'Юрист', icon: 'Scale', count: 67 },
];

const masters = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: '/placeholder.svg',
    rating: 4.9,
    reviews: 127,
    category: 'Маникюр',
    services: [
      { name: 'Маникюр с покрытием', duration: 60, price: 1500 },
      { name: 'Педикюр', duration: 90, price: 2000 },
    ],
  },
  {
    id: 2,
    name: 'Елена Смирнова',
    avatar: '/placeholder.svg',
    rating: 5.0,
    reviews: 89,
    category: 'Парикмахер',
    services: [
      { name: 'Стрижка женская', duration: 45, price: 2500 },
      { name: 'Окрашивание', duration: 120, price: 5000 },
    ],
  },
  {
    id: 3,
    name: 'Мария Иванова',
    avatar: '/placeholder.svg',
    rating: 4.8,
    reviews: 156,
    category: 'Косметолог',
    services: [
      { name: 'Чистка лица', duration: 60, price: 3000 },
      { name: 'Массаж лица', duration: 45, price: 2500 },
    ],
  },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00',
];

const Index = () => {
  const [selectedMaster, setSelectedMaster] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setBookingStep(2);
  };

  const handleDateTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingStep(3);
  };

  const handleBookingConfirm = () => {
    alert('Запись успешно создана! В реальном приложении здесь будет отправка данных на сервер.');
    setSelectedMaster(null);
    setBookingStep(1);
    setSelectedService(null);
    setSelectedTime('');
  };

  const resetBooking = () => {
    setSelectedMaster(null);
    setBookingStep(1);
    setSelectedService(null);
    setSelectedTime('');
  };

  const filteredMasters = searchQuery
    ? masters.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : masters;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">МастерБук</h1>
        </div>
      </header>

      {activeTab === 'home' && (
        <main className="container mx-auto px-4 py-6 space-y-6">
          <section className="space-y-4">
            <div className="text-center space-y-2 py-4">
              <h2 className="text-3xl font-bold">Найди своего мастера</h2>
              <p className="text-muted-foreground">Быстрая онлайн-запись к проверенным специалистам</p>
            </div>

            <div className="relative max-w-2xl mx-auto">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск по имени мастера или услуге..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Лучшие мастера</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMasters.map((master) => (
                <Card key={master.id} className="hover:shadow-lg transition-shadow cursor-pointer hover-scale">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={master.avatar} alt={master.name} />
                        <AvatarFallback>{master.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{master.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">{master.category}</Badge>
                        <div className="flex items-center gap-1 mt-2">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{master.rating}</span>
                          <span className="text-xs text-muted-foreground">({master.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                      {master.services.map((service, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{service.name}</span>
                          <span className="font-semibold">{service.price} ₽</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedMaster(master);
                        setBookingStep(1);
                      }}
                    >
                      Записаться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeTab === 'search' && (
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-12 space-y-4">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Поиск мастеров</h2>
            <p className="text-muted-foreground">Функция в разработке</p>
          </div>
        </main>
      )}

      {activeTab === 'bookings' && (
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-12 space-y-4">
            <Icon name="Calendar" size={64} className="mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Мои записи</h2>
            <p className="text-muted-foreground">У вас пока нет записей</p>
            <Button onClick={() => setActiveTab('home')}>Найти мастера</Button>
          </div>
        </main>
      )}

      {activeTab === 'profile' && (
        <main className="container mx-auto px-4 py-6">
          <div className="text-center py-12 space-y-4">
            <Icon name="User" size={64} className="mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Профиль</h2>
            <p className="text-muted-foreground">Войдите, чтобы управлять записями</p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Button>Войти как клиент</Button>
              <Button variant="outline" onClick={() => window.location.href = '/master'}>
                Войти как мастер
              </Button>
            </div>
          </div>
        </main>
      )}

      <Dialog open={!!selectedMaster} onOpenChange={(open) => !open && resetBooking()}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {bookingStep === 1 && 'Выберите услугу'}
              {bookingStep === 2 && 'Выберите дату и время'}
              {bookingStep === 3 && 'Подтвердите запись'}
            </DialogTitle>
          </DialogHeader>

          {selectedMaster && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedMaster.avatar} alt={selectedMaster.name} />
                  <AvatarFallback>{selectedMaster.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{selectedMaster.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{selectedMaster.rating}</span>
                  </div>
                </div>
              </div>

              {bookingStep === 1 && (
                <div className="space-y-3">
                  {selectedMaster.services.map((service: any, idx: number) => (
                    <Card
                      key={idx}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleServiceSelect(service)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.duration} мин</p>
                        </div>
                        <p className="font-semibold text-lg">{service.price} ₽</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {bookingStep === 2 && selectedService && (
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">{selectedService.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedService.duration} мин · {selectedService.price} ₽</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Выберите дату</h4>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border mx-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Выберите время</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          className="w-full"
                          onClick={() => handleDateTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 3 && selectedService && selectedDate && selectedTime && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Услуга:</span>
                      <span className="font-medium">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Дата:</span>
                      <span className="font-medium">{selectedDate.toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Время:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="text-muted-foreground">Стоимость:</span>
                      <span className="font-semibold text-lg">{selectedService.price} ₽</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Input placeholder="Ваше имя" />
                    <Input placeholder="Телефон" type="tel" />
                    <Input placeholder="Email (опционально)" type="email" />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setBookingStep(2)}>
                      Назад
                    </Button>
                    <Button className="flex-1" onClick={handleBookingConfirm}>
                      Подтвердить
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs font-medium">Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'search' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Search" size={24} />
              <span className="text-xs font-medium">Поиск</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'bookings' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Calendar" size={24} />
              <span className="text-xs font-medium">Записи</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs font-medium">Профиль</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;