import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import TactLogo from '@/components/TactLogo';
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
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;
  
  const profile = {
    name: 'Анна Петрова',
    avatar: '/placeholder.svg',
    category: 'Маникюр и педикюр',
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <TactLogo size={32} />
                <h1 className="text-lg font-bold text-primary">Tact</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
            
            <Popover open={showProfile} onOpenChange={setShowProfile}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 px-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">{profile.name}</p>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="end">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="text-lg">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.category}</p>
                    </div>
                  </div>
                  <div className="border-t pt-2 space-y-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab('settings');
                        setShowProfile(false);
                      }}
                    >
                      <Icon name="Settings" size={16} className="mr-2" />
                      Настройки профиля
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-destructive hover:text-destructive"
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Выйти
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            </div>
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