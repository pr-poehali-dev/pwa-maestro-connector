import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import SwipeCard from '@/components/SwipeCard';

const clients = [
  {
    id: 1,
    name: 'Мария Соколова',
    phone: '+7 (999) 123-45-67',
    telegram: '@mariya_sokolova',
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
  const [editingClient, setEditingClient] = useState<any>(null);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  const handleMessageClient = (client: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (client.telegram) {
      window.open(`https://t.me/${client.telegram.replace('@', '')}`, '_blank');
    } else {
      window.open(`https://wa.me/${client.phone.replace(/\D/g, '')}`, '_blank');
    }
  };

  const filteredClients = searchQuery
    ? clients.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
      )
    : clients;

  return (
    <div className="space-y-4 pb-20">
      <div className="sticky top-[73px] z-30 bg-background pt-4 pb-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">База клиентов</h2>
            <p className="text-sm text-muted-foreground">{clients.length} клиентов всего</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 right-4 z-40">
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowNewClient(true)}
        >
          <Icon name="Plus" size={24} />
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
          <SwipeCard
            key={client.id}
            onSwipeLeft={() => setClientToDelete(client.id)}
            leftAction={{ icon: 'Trash2', label: 'Удалить', color: '#ef4444' }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedClient(client)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{client.name}</h4>
                      {client.tags.map((tag: string) => (
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

                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`tel:${client.phone}`);
                      }}
                    >
                      <Icon name="Phone" size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => handleMessageClient(client, e)}
                    >
                      <Icon name="MessageCircle" size={14} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Icon name="MoreVertical" size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          setEditingClient(client);
                        }}>
                          <Icon name="Edit" size={14} className="mr-2" />
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            setClientToDelete(client.id);
                          }}
                          className="text-destructive"
                        >
                          <Icon name="Trash2" size={14} className="mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwipeCard>
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
              <Label>Мессенджер</Label>
              <div className="flex gap-2">
                <Select defaultValue="telegram">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telegram">
                      <div className="flex items-center gap-2">
                        <Icon name="Send" size={14} />
                        Telegram
                      </div>
                    </SelectItem>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center gap-2">
                        <Icon name="MessageCircle" size={14} />
                        WhatsApp
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="@username или номер" className="flex-1" />
              </div>
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

      <Dialog open={!!editingClient} onOpenChange={(open) => !open && setEditingClient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
          </DialogHeader>

          {editingClient && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Имя и фамилия</Label>
                <Input defaultValue={editingClient.name} />
              </div>

              <div className="space-y-2">
                <Label>Телефон</Label>
                <Input defaultValue={editingClient.phone} type="tel" />
              </div>

              <div className="space-y-2">
                <Label>Мессенджер</Label>
                <div className="flex gap-2">
                  <Select defaultValue="telegram">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telegram">
                        <div className="flex items-center gap-2">
                          <Icon name="Send" size={14} />
                          Telegram
                        </div>
                      </SelectItem>
                      <SelectItem value="whatsapp">
                        <div className="flex items-center gap-2">
                          <Icon name="MessageCircle" size={14} />
                          WhatsApp
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input defaultValue={editingClient.telegram} placeholder="@username или номер" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Заметки (опционально)</Label>
                <Textarea defaultValue={editingClient.notes} rows={3} />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setEditingClient(null)}>
                  Отмена
                </Button>
                <Button className="flex-1" onClick={() => setEditingClient(null)}>
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!clientToDelete} onOpenChange={(open) => !open && setClientToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить клиента?</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить этого клиента? История посещений сохранится, но контакт будет удален.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClientToDelete(null)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={() => setClientToDelete(null)}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterClients;