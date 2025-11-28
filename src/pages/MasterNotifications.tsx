import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const notificationHistory = [
  {
    id: 1,
    type: 'reminder',
    client: 'Мария Соколова',
    message: 'Напоминание о записи завтра в 10:00',
    channel: 'telegram',
    status: 'sent',
    timestamp: '2024-11-26 18:00',
  },
  {
    id: 2,
    type: 'reminder',
    client: 'Анна Иванова',
    message: 'Напоминание о записи через 2 часа',
    channel: 'sms',
    status: 'sent',
    timestamp: '2024-11-27 10:00',
  },
  {
    id: 3,
    type: 'confirmation',
    client: 'Елена Петрова',
    message: 'Подтверждение записи на 27.11 в 15:00',
    channel: 'telegram',
    status: 'sent',
    timestamp: '2024-11-26 14:30',
  },
];

const messageTemplates = [
  {
    id: 1,
    name: 'Напоминание за 24 часа',
    text: 'Здравствуйте, {client_name}! Напоминаем о записи завтра в {time}. Услуга: {service}. Жду вас по адресу: {address}',
  },
  {
    id: 2,
    name: 'Напоминание за 2 часа',
    text: 'Здравствуйте, {client_name}! Напоминаю о записи сегодня в {time}. До встречи!',
  },
  {
    id: 3,
    name: 'Подтверждение записи',
    text: 'Здравствуйте, {client_name}! Ваша запись подтверждена на {date} в {time}. Услуга: {service}. Стоимость: {price} ₽',
  },
  {
    id: 4,
    name: 'Отмена записи',
    text: 'Здравствуйте, {client_name}! К сожалению, ваша запись на {date} в {time} отменена. Свяжитесь со мной для переноса.',
  },
];

interface MasterNotificationsProps {
  onNavigate?: (tab: string) => void;
}

const MasterNotifications = ({ onNavigate }: MasterNotificationsProps) => {
  const [settings, setSettings] = useState({
    autoReminders: true,
    reminder24h: true,
    reminder2h: true,
    confirmationMessage: true,
    cancelMessage: true,
    telegramEnabled: true,
    smsEnabled: false,
  });

  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplateEdit, setShowTemplateEdit] = useState(false);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        {onNavigate && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('settings')}
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Уведомления и напоминания</h2>
          <p className="text-sm text-muted-foreground">Автоматические уведомления для ваших клиентов</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Каналы отправки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="MessageCircle" className="text-primary" size={20} />
              </div>
              <div>
                <Label className="font-medium">Telegram</Label>
                <p className="text-xs text-muted-foreground">Бесплатные сообщения через бот</p>
              </div>
            </div>
            <Switch
              checked={settings.telegramEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, telegramEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Smartphone" className="text-primary" size={20} />
              </div>
              <div>
                <Label className="font-medium">SMS</Label>
                <p className="text-xs text-muted-foreground">Платные сообщения (1-3 ₽/шт)</p>
              </div>
            </div>
            <Switch
              checked={settings.smsEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, smsEnabled: checked })}
            />
          </div>

          {settings.telegramEnabled && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Icon name="Info" className="text-blue-600 mt-0.5" size={16} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">Подключите Telegram-бот</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Попросите клиентов написать @YourMasterBot и указать номер телефона
                  </p>
                  <Button variant="link" className="h-auto p-0 text-xs text-blue-600 mt-2">
                    Инструкция по настройке
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Автоматические напоминания</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="font-medium">Включить автоматические напоминания</Label>
              <p className="text-xs text-muted-foreground">Клиенты получат напоминания перед записью</p>
            </div>
            <Switch
              checked={settings.autoReminders}
              onCheckedChange={(checked) => setSettings({ ...settings, autoReminders: checked })}
            />
          </div>

          {settings.autoReminders && (
            <div className="space-y-3 ml-4 pl-4 border-l-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">За 24 часа до записи</Label>
                  <p className="text-xs text-muted-foreground">Отправка в 18:00 накануне</p>
                </div>
                <Switch
                  checked={settings.reminder24h}
                  onCheckedChange={(checked) => setSettings({ ...settings, reminder24h: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">За 2 часа до записи</Label>
                  <p className="text-xs text-muted-foreground">Короткое напоминание</p>
                </div>
                <Switch
                  checked={settings.reminder2h}
                  onCheckedChange={(checked) => setSettings({ ...settings, reminder2h: checked })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Другие уведомления</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Подтверждение записи</Label>
            <Switch
              checked={settings.confirmationMessage}
              onCheckedChange={(checked) => setSettings({ ...settings, confirmationMessage: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Уведомление об отмене</Label>
            <Switch
              checked={settings.cancelMessage}
              onCheckedChange={(checked) => setSettings({ ...settings, cancelMessage: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Шаблоны сообщений</CardTitle>
            <Button size="sm" onClick={() => {
              setSelectedTemplate(null);
              setShowTemplateEdit(true);
            }}>
              <Icon name="Plus" size={14} className="mr-1" />
              Новый
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {messageTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-2">{template.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{template.text}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowTemplateEdit(true);
                    }}
                  >
                    <Icon name="Edit" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Доступные переменные:</strong> {'{client_name}'}, {'{date}'}, {'{time}'}, {'{service}'}, {'{price}'}, {'{address}'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">История отправки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {notificationHistory.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={notification.channel === 'telegram' ? 'MessageCircle' : 'Smartphone'} className="text-primary" size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium">{notification.client}</p>
                  <Badge variant={notification.status === 'sent' ? 'default' : 'secondary'} className="text-xs">
                    {notification.status === 'sent' ? 'Отправлено' : 'Ошибка'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button className="w-full">
        <Icon name="Save" size={16} className="mr-2" />
        Сохранить настройки
      </Button>

      <Dialog open={showTemplateEdit} onOpenChange={setShowTemplateEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTemplate ? 'Редактировать шаблон' : 'Новый шаблон'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Название шаблона</Label>
              <Input placeholder="Например: Напоминание за 24 часа" defaultValue={selectedTemplate?.name} />
            </div>

            <div className="space-y-2">
              <Label>Текст сообщения</Label>
              <Textarea
                placeholder="Используйте переменные: {client_name}, {date}, {time}, {service}, {price}"
                rows={5}
                defaultValue={selectedTemplate?.text}
              />
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">
                <strong>Пример:</strong>
              </p>
              <p className="text-xs">
                Здравствуйте, Мария! Напоминаем о записи завтра в 10:00. Услуга: Маникюр с покрытием. Жду вас!
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowTemplateEdit(false)}>
                Отмена
              </Button>
              <Button className="flex-1" onClick={() => setShowTemplateEdit(false)}>
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterNotifications;