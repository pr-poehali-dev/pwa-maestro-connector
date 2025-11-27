import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import MasterDashboard from './MasterDashboard';
import MasterCalendar from './MasterCalendar';
import MasterClients from './MasterClients';
import MasterServices from './MasterServices';
import MasterSchedule from './MasterSchedule';

const MasterLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-primary">МастерБук PRO</h1>
              <p className="text-xs text-muted-foreground">Личный кабинет мастера</p>
            </div>
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <MasterDashboard onNavigate={setActiveTab} />}
        {activeTab === 'calendar' && <MasterCalendar />}
        {activeTab === 'clients' && <MasterClients />}
        {activeTab === 'services' && <MasterServices />}
        {activeTab === 'schedule' && <MasterSchedule />}
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
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'services' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Briefcase" size={22} />
              <span className="text-xs font-medium">Услуги</span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === 'schedule' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Clock" size={22} />
              <span className="text-xs font-medium">График</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MasterLayout;
