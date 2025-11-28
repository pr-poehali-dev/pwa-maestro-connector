import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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
    <div className="sticky top-[73px] z-30 bg-background pt-4 pb-3 border-b">
      <div className="mb-3">
        <h2 className="text-2xl font-bold">Календарь записей</h2>
        <p className="text-xs text-muted-foreground">Среда, 27 ноября 2024</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={view === 'day' ? 'default' : 'outline'} 
            onClick={() => onViewChange('day')}
          >
            <Icon name="Calendar" size={14} className="mr-1" />
            День
          </Button>
          <Button 
            size="sm" 
            variant={view === 'week' ? 'default' : 'outline'} 
            onClick={() => onViewChange('week')}
          >
            <Icon name="CalendarDays" size={14} className="mr-1" />
            Неделя
          </Button>
          <Button 
            size="sm" 
            variant={view === 'month' ? 'default' : 'outline'} 
            onClick={() => onViewChange('month')}
          >
            <Icon name="CalendarRange" size={14} className="mr-1" />
            Месяц
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="ghost"
              onClick={onShareClick}
            >
              <Icon name="Share2" size={14} />
            </Button>
            <Button size="sm" variant="ghost">
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button size="sm" variant="ghost">
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <Icon name="Filter" size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium">Услуга:</span>
            <Select value={selectedServiceFilter} onValueChange={onServiceFilterChange}>
              <SelectTrigger className="h-7 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <span className="text-xs font-medium ml-2">Клиент:</span>
            <Select value={selectedClientFilter} onValueChange={onClientFilterChange}>
              <SelectTrigger className="h-7 w-[180px]">
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
  );
};

export default CalendarHeader;
