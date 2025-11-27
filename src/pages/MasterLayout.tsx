import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import MasterDashboard from './MasterDashboard';
import MasterCalendar from './MasterCalendar';
import MasterClients from './MasterClients';
import MasterServices from './MasterServices';
import MasterSchedule from './MasterSchedule';
import MasterNotifications from './MasterNotifications';
import MasterSettings from './MasterSettings';
import LinkGenerator from './LinkGenerator';

const notifications = [
  { id: 1, type: 'new_booking', text: 'Новая запись от Марии Соколовой', time: '5 мин назад', unread: true },
  { id: 2, type: 'reminder_sent', text: 'Напоминание отправлено Анне Ивановой', time: '1 час назад', unread: true },
  { id: 3, type: 'cancellation', text: 'Отмена записи от Елены Петровой', time: '2 часа назад', unread: false },
];

const MasterLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-primary">МастерБук PRO</h1>
              <p className="text-xs text-muted-foreground">Личный кабинет мастера</p>
            </div>
            <Popover open={showNotifications} onOpenChange={setShowNotifications}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="Bell" size={20} />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Уведомления</h4>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={() => setActiveTab('notifications')}>
                      Все
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className={`p-3 rounded-lg border ${
                        notification.unread ? 'bg-primary/5 border-primary/20' : 'bg-muted'
                      }`}>
                        <div className="flex items-start gap-2">
                          <Icon name={notification.type === 'new_booking' ? 'Calendar' : 'Bell'} size={14} className="mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium line-clamp-2">{notification.text}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <MasterDashboard onNavigate={setActiveTab} />}
        {activeTab === 'calendar' && <MasterCalendar />}
        {activeTab === 'clients' && <MasterClients />}
        {activeTab === 'services' && <MasterServices />}
        {activeTab === 'links' && <LinkGenerator />}
        {activeTab === 'schedule' && <MasterSchedule />}
        {activeTab === 'notifications' && <MasterNotifications />}
        {activeTab === 'settings' && <MasterSettings />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 shadow-lg">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="LayoutDashboard" size={22} />
              <span className="text-xs font-medium">Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'calendar' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Calendar" size={22} />
              <span className="text-xs font-medium">Календарь</span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'clients' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Users" size={22} />
              <span className="text-xs font-medium">Клиенты</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                activeTab === 'services' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Briefcase" size={22} />
              <span className="text-xs font-medium">Услуги</span>
            </button>

            <button
              onClick={() => setActiveTab('links')}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                activeTab === 'links' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Link" size={22} />
              <span className="text-xs font-medium">Ссылки</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center gap-1 px-2 py-2 transition-colors ${
                activeTab === 'settings' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Settings" size={22} />
              <span className="text-xs font-medium">Настройки</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MasterLayout;