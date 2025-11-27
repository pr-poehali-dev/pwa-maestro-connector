import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const masterInfo = {
  name: 'Анна Петрова',
  avatar: '/placeholder.svg',
  category: 'Маникюр и педикюр',
};

const services = [
  {
    id: 1,
    name: 'Маникюр с покрытием',
    duration: 60,
    price: 1500,
    description: 'Классический маникюр с покрытием гель-лаком премиум качества',
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
  },
  {
    id: 2,
    name: 'Педикюр',
    duration: 90,
    price: 2000,
    description: 'Медицинский педикюр',
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
  },
  {
    id: 3,
    name: 'Групповой урок маникюра',
    duration: 120,
    price: 3000,
    description: 'Мастер-класс по маникюру в группе',
    type: 'online',
    videoLink: 'https://zoom.us/j/example',
    isGroup: true,
    maxParticipants: 10,
    currentParticipants: 7,
  },
];

const LinkGenerator = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [copiedLink, setCopiedLink] = useState('');

  const generateLink = (serviceId: number) => {
    return `${window.location.origin}/book/master1/${serviceId}`;
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-bold">Публичные ссылки</h2>
        <p className="text-sm text-muted-foreground">Отправляйте ссылки на запись клиентам</p>
      </div>

      <div className="grid gap-3">
        {services.map((service) => {
          const link = generateLink(service.id);
          return (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{service.name}</h4>
                      {service.isGroup && (
                        <Badge variant="secondary" className="text-xs">
                          <Icon name="Users" size={12} className="mr-1" />
                          Группа
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{service.duration} мин</span>
                      <span>•</span>
                      <span className="font-semibold">{service.price} ₽</span>
                      {service.isGroup && (
                        <>
                          <span>•</span>
                          <span>{service.currentParticipants}/{service.maxParticipants} мест</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={copiedLink === link ? "default" : "outline"}
                    onClick={() => copyLink(link)}
                  >
                    <Icon name={copiedLink === link ? "Check" : "Copy"} size={14} className="mr-1" />
                    {copiedLink === link ? 'Скопировано' : 'Скопировать'}
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded text-xs">
                  <Icon name="Link" size={12} className="text-muted-foreground shrink-0" />
                  <code className="flex-1 truncate">{link}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2"
                    onClick={() => {
                      setSelectedService(service);
                      setShowPreview(true);
                    }}
                  >
                    <Icon name="Eye" size={12} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Предпросмотр страницы записи</DialogTitle>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-14 h-14">
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

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{selectedService.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{selectedService.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-sm">
                          <Icon name="Clock" size={14} />
                          <span>{selectedService.duration} мин</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold">
                          <Icon name="Wallet" size={14} />
                          <span>{selectedService.price} ₽</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedService.type === 'offline' && (
                    <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                      <Icon name="MapPin" size={16} className="mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Оффлайн встреча</p>
                        <p className="text-xs text-muted-foreground">{selectedService.address}</p>
                      </div>
                    </div>
                  )}

                  {selectedService.type === 'online' && (
                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <Icon name="Video" size={16} className="mt-0.5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Онлайн консультация</p>
                        <p className="text-xs text-blue-700">Ссылка придёт за 15 минут до начала</p>
                      </div>
                    </div>
                  )}

                  {selectedService.isGroup && (
                    <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg mt-3">
                      <Icon name="Users" size={16} className="mt-0.5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Групповая запись</p>
                        <p className="text-xs text-muted-foreground">
                          Осталось {selectedService.maxParticipants - selectedService.currentParticipants} мест из {selectedService.maxParticipants}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowPreview(false)}>
                  Закрыть
                </Button>
                <Button className="flex-1" onClick={() => window.open(generateLink(selectedService.id), '_blank')}>
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  Открыть в новой вкладке
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinkGenerator;