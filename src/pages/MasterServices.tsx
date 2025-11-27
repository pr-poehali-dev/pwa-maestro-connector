import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 1,
    name: 'Маникюр с покрытием',
    category: 'Маникюр',
    duration: 60,
    price: 1500,
    description: 'Классический маникюр с покрытием гель-лаком',
    active: true,
    bookingsThisMonth: 24,
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
    prepaymentRequired: true,
    prepaymentPercent: 30,
  },
  {
    id: 2,
    name: 'Педикюр',
    category: 'Педикюр',
    duration: 90,
    price: 2000,
    description: 'Медицинский педикюр',
    active: true,
    bookingsThisMonth: 18,
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
    prepaymentRequired: false,
    prepaymentPercent: 0,
  },
  {
    id: 3,
    name: 'Групповой урок маникюра',
    category: 'Обучение',
    duration: 120,
    price: 3000,
    description: 'Мастер-класс по маникюру в группе',
    active: true,
    bookingsThisMonth: 8,
    type: 'online',
    videoLink: 'https://zoom.us/j/example',
    isGroup: true,
    maxParticipants: 10,
    prepaymentRequired: true,
    prepaymentPercent: 100,
  },
  {
    id: 4,
    name: 'Снятие покрытия',
    category: 'Маникюр',
    duration: 15,
    price: 300,
    description: 'Безопасное снятие гель-лака',
    active: true,
    bookingsThisMonth: 12,
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
    prepaymentRequired: false,
    prepaymentPercent: 0,
  },
];

const categories = ['Маникюр', 'Педикюр', 'Наращивание', 'Дизайн', 'Другое'];

const MasterServices = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showNewService, setShowNewService] = useState(false);

  return (
    <div className="space-y-4 pb-20">
      <div className="sticky top-[73px] z-30 bg-background pt-4 pb-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Мои услуги</h2>
            <p className="text-sm text-muted-foreground">{services.length} активных услуг</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 right-4 z-40">
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowNewService(true)}
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>

      <div className="grid gap-3">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{service.name}</h4>
                    <Badge variant="outline" className="text-xs">{service.category}</Badge>
                    {!service.active && <Badge variant="secondary" className="text-xs">Неактивна</Badge>}
                  </div>

                  <p className="text-sm text-muted-foreground">{service.description}</p>

                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{service.duration} мин</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold">
                      <Icon name="Wallet" size={14} />
                      <span>{service.price} ₽</span>
                    </div>
                    {service.isGroup && (
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Users" size={12} className="mr-1" />
                        До {service.maxParticipants} чел
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      <Icon name={service.type === 'online' ? 'Video' : 'MapPin'} size={12} className="mr-1" />
                      {service.type === 'online' ? 'Онлайн' : 'Оффлайн'}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedService(service)}
                  >
                    <Icon name="Edit" size={14} className="mr-1" />
                    Изменить
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/book/master1/${service.id}`, '_blank');
                    }}
                  >
                    <Icon name="Link" size={14} className="mr-1" />
                    Ссылка
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showNewService || !!selectedService} onOpenChange={(open) => {
        if (!open) {
          setShowNewService(false);
          setSelectedService(null);
        }
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedService ? 'Редактировать услугу' : 'Новая услуга'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Название услуги</Label>
              <Input 
                placeholder="Например: Маникюр с покрытием" 
                defaultValue={selectedService?.name}
              />
            </div>

            <div className="space-y-2">
              <Label>Категория</Label>
              <Select defaultValue={selectedService?.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Тип услуги</Label>
              <Select defaultValue={selectedService?.type || 'offline'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offline">
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={14} />
                      Оффлайн встреча
                    </div>
                  </SelectItem>
                  <SelectItem value="online">
                    <div className="flex items-center gap-2">
                      <Icon name="Video" size={14} />
                      Онлайн встреча
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedService?.type === 'offline' && (
              <div className="space-y-2">
                <Label>Адрес встречи</Label>
                <Input 
                  placeholder="г. Москва, ул. Примерная, д. 1" 
                  defaultValue={selectedService?.address}
                />
              </div>
            )}

            {selectedService?.type === 'online' && (
              <div className="space-y-2">
                <Label>Ссылка на видеовстречу (опционально)</Label>
                <Input 
                  placeholder="https://zoom.us/j/..." 
                  defaultValue={selectedService?.videoLink}
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Длительность (минут)</Label>
                <Select defaultValue={selectedService?.duration.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 минут</SelectItem>
                    <SelectItem value="30">30 минут</SelectItem>
                    <SelectItem value="45">45 минут</SelectItem>
                    <SelectItem value="60">60 минут</SelectItem>
                    <SelectItem value="90">90 минут</SelectItem>
                    <SelectItem value="120">120 минут</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Стоимость (₽)</Label>
                <Input 
                  type="number" 
                  placeholder="1500" 
                  defaultValue={selectedService?.price}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Описание (опционально)</Label>
              <Textarea 
                placeholder="Краткое описание услуги для клиентов" 
                rows={3}
                defaultValue={selectedService?.description}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <Label>Групповая услуга</Label>
                <p className="text-xs text-muted-foreground">Несколько клиентов одновременно</p>
              </div>
              <Switch defaultChecked={selectedService?.isGroup ?? false} />
            </div>

            {selectedService?.isGroup && (
              <div className="space-y-2">
                <Label>Максимум участников</Label>
                <Input 
                  type="number" 
                  min="2" 
                  max="50" 
                  placeholder="10" 
                  defaultValue={selectedService?.maxParticipants}
                />
              </div>
            )}

            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Требуется предоплата</Label>
                    <p className="text-xs text-muted-foreground">Клиент оплачивает часть при записи</p>
                  </div>
                  <Switch defaultChecked={selectedService?.prepaymentRequired ?? false} />
                </div>
                <div className="space-y-2">
                  <Label>Размер предоплаты (%)</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      placeholder="30" 
                      defaultValue={selectedService?.prepaymentPercent || 0}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      0% = без предоплаты
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Укажите 0, если предоплата не требуется
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <Label>Активна</Label>
                <p className="text-xs text-muted-foreground">Клиенты могут записаться на эту услугу</p>
              </div>
              <Switch defaultChecked={selectedService?.active ?? true} />
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => {
                  setShowNewService(false);
                  setSelectedService(null);
                }}
              >
                Отмена
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setShowNewService(false);
                  setSelectedService(null);
                }}
              >
                {selectedService ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterServices;