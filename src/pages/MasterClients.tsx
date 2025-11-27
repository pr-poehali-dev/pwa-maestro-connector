import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const clients = [
  {
    id: 1,
    name: 'Мария Соколова',
    phone: '+7 (999) 123-45-67',
    totalVisits: 12,
    totalSpent: 18000,
    lastVisit: '2024-11-20',
    tags: ['VIP', 'Постоянный'],
    notes: 'Предпочитает утренние записи',
  },
  {
    id: 2,
    name: 'Анна Иванова',
    phone: '+7 (999) 234-56-78',
    totalVisits: 5,
    totalSpent: 7500,
    lastVisit: '2024-11-15',
    tags: ['Постоянный'],
    notes: '',
  },
  {
    id: 3,
    name: 'Елена Петрова',
    phone: '+7 (999) 345-67-89',
    totalVisits: 3,
    totalSpent: 4500,
    lastVisit: '2024-11-10',
    tags: [],
    notes: 'Аллергия на некоторые средства',
  },
  {
    id: 4,
    name: 'Ольга Смирнова',
    phone: '+7 (999) 456-78-90',
    totalVisits: 1,
    totalSpent: 3000,
    lastVisit: '2024-11-05',
    tags: ['Новый'],
    notes: '',
  },
];

const MasterClients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showNewClient, setShowNewClient] = useState(false);

  const filteredClients = searchQuery
    ? clients.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
      )
    : clients;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">База клиентов</h2>
          <p className="text-sm text-muted-foreground">{clients.length} клиентов всего</p>
        </div>
        <Button onClick={() => setShowNewClient(true)}>
          <Icon name="UserPlus" size={16} className="mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="relative">
        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Поиск по имени или телефону..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedClient(client)}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{client.name}</h4>
                    {client.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Phone" size={12} />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        <span>{client.totalVisits} визитов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Wallet" size={12} />
                        <span>{client.totalSpent.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Icon name="Phone" size={14} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Icon name="MessageSquare" size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Карточка клиента</DialogTitle>
          </DialogHeader>

          {selectedClient && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg">{selectedClient.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                  <div className="flex gap-1 mt-2">
                    {selectedClient.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedClient.totalVisits}</p>
                  <p className="text-xs text-muted-foreground">Визитов</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{selectedClient.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Потрачено ₽</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold">{selectedClient.lastVisit}</p>
                  <p className="text-xs text-muted-foreground">Последний визит</p>
                </div>
              </div>

              {selectedClient.notes && (
                <div className="space-y-2">
                  <Label>Заметки</Label>
                  <p className="text-sm p-3 bg-muted rounded-lg">{selectedClient.notes}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label className="font-semibold">История посещений</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {[1, 2, 3].map((_, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start text-sm">
                          <div>
                            <p className="font-medium">Маникюр с покрытием</p>
                            <p className="text-xs text-muted-foreground">20.11.2024 в 10:00</p>
                          </div>
                          <p className="font-semibold">1500 ₽</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Позвонить
                </Button>
                <Button className="flex-1">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Записать
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showNewClient} onOpenChange={setShowNewClient}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новый клиент</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Имя и фамилия</Label>
              <Input placeholder="Иван Иванов" />
            </div>

            <div className="space-y-2">
              <Label>Телефон</Label>
              <Input placeholder="+7 (999) 123-45-67" type="tel" />
            </div>

            <div className="space-y-2">
              <Label>Email (опционально)</Label>
              <Input placeholder="email@example.com" type="email" />
            </div>

            <div className="space-y-2">
              <Label>Заметки (опционально)</Label>
              <Textarea placeholder="Дополнительная информация о клиенте" rows={3} />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowNewClient(false)}>
                Отмена
              </Button>
              <Button className="flex-1" onClick={() => setShowNewClient(false)}>
                Добавить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterClients;
