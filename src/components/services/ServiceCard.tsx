import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import SwipeCard from '@/components/SwipeCard';

interface ServiceCardProps {
  service: any;
  onView: (service: any) => void;
  onEdit: (service: any) => void;
  onDuplicate: (service: any) => void;
  onDelete: (id: number) => void;
  onShare: (service: any) => void;
}

const ServiceCard = ({
  service,
  onView,
  onEdit,
  onDuplicate,
  onDelete,
  onShare,
}: ServiceCardProps) => {
  return (
    <SwipeCard
      key={service.id}
      onSwipeLeft={() => onDelete(service.id)}
      onSwipeRight={() => onDuplicate(service)}
      leftAction={{ icon: 'Trash2', label: 'Удалить', color: '#ef4444' }}
      rightAction={{ icon: 'Copy', label: 'Копировать', color: '#3b82f6' }}
    >
      <Card 
        className={`hover:shadow-md transition-shadow cursor-pointer ${!service.active ? 'opacity-50' : ''}`}
        onClick={() => onView(service)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            {(service as any).image && (
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={(service as any).image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{service.name}</h4>
                <Badge variant="outline" className="text-xs">{service.category}</Badge>
                {!service.active && <Badge variant="secondary" className="text-xs">Неактивна</Badge>}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>

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
                {service.prepaymentRequired && (
                  <Badge variant="secondary" className="text-xs">
                    <Icon name="CreditCard" size={12} className="mr-1" />
                    {service.prepaymentPercent}% предоплата
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant="ghost"
                disabled={!service.active}
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(service);
                }}
              >
                <Icon name="Share2" size={14} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" variant="ghost">
                    <Icon name="MoreVertical" size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onEdit(service);
                  }}>
                    <Icon name="Edit" size={14} className="mr-2" />
                    Редактировать
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(service);
                  }}>
                    <Icon name="Copy" size={14} className="mr-2" />
                    Копировать
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(service.id);
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
  );
};

export default ServiceCard;