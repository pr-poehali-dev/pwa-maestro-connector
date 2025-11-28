import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { haptics } from '@/utils/haptics';

interface CalendarHeaderProps {
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  selectedServiceFilter: string;
  onServiceFilterChange: (value: string) => void;
  selectedClientFilter: string;
  onClientFilterChange: (value: string) => void;
  onShareClick: () => void;
  services: Array<{ id: string; name: string }>;
  clients: Array<{ id: string; name: string }>;
}

const CalendarHeader = ({
  view,
  onViewChange,
  selectedServiceFilter,
  onServiceFilterChange,
  selectedClientFilter,
  onClientFilterChange,
  onShareClick,
  services,
  clients,
}: CalendarHeaderProps) => {
  return (
    <div className="sticky top-[73px] z-30 bg-background pt-2 sm:pt-4 pb-2 sm:pb-3 border-b">
      <div className="mb-2 sm:mb-3">
        <h2 className="text-lg sm:text-2xl font-bold">Календарь записей</h2>
        <p className="text-[10px] sm:text-xs text-muted-foreground">Среда, 27 ноября 2024</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button 
            size="sm" 
            variant={view === 'day' ? 'default' : 'outline'} 
            onClick={() => {
              haptics.selection();
              onViewChange('day');
            }}
            className="h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
          >
            <Icon name="Calendar" size={12} className="mr-0.5 sm:mr-1" />
            <span className="hidden xs:inline">День</span>
          </Button>
          <Button 
            size="sm" 
            variant={view === 'week' ? 'default' : 'outline'} 
            onClick={() => {
              haptics.selection();
              onViewChange('week');
            }}
            className="h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
          >
            <Icon name="CalendarDays" size={12} className="mr-0.5 sm:mr-1" />
            <span className="hidden xs:inline">Неделя</span>
          </Button>
          <Button 
            size="sm" 
            variant={view === 'month' ? 'default' : 'outline'} 
            onClick={() => {
              haptics.selection();
              onViewChange('month');
            }}
            className="h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
          >
            <Icon name="CalendarRange" size={12} className="mr-0.5 sm:mr-1" />
            <span className="hidden xs:inline">Месяц</span>
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex gap-0.5 sm:gap-1">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => {
                haptics.light();
                onShareClick();
              }}
              className="h-8 w-8 sm:h-9 sm:w-9 p-0"
            >
              <Icon name="Share2" size={14} />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 sm:h-9 sm:w-9 p-0" onClick={() => haptics.selection()}>
              <Icon name="ChevronLeft" size={14} />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 sm:h-9 sm:w-9 p-0" onClick={() => haptics.selection()}>
              <Icon name="ChevronRight" size={14} />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 flex-1">
              <Icon name="Filter" size={14} className="text-muted-foreground flex-shrink-0" />
              <span className="text-xs font-medium flex-shrink-0">Услуга:</span>
              <Select value={selectedServiceFilter} onValueChange={onServiceFilterChange}>
                <SelectTrigger className="h-8 text-xs flex-1 min-w-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs font-medium flex-shrink-0">Клиент:</span>
              <Select value={selectedClientFilter} onValueChange={onClientFilterChange}>
                <SelectTrigger className="h-8 text-xs flex-1 min-w-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;