import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Icon from './ui/icon';

interface ServicePreviewProps {
  service: any;
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

const ServicePreview = ({ service, open, onClose, onEdit }: ServicePreviewProps) => {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{service.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Описание</p>
              <p className="text-base">{service.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Длительность</p>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span className="text-base font-semibold">{service.duration} мин</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Цена</p>
                <div className="flex items-center gap-2">
                  <Icon name="Wallet" size={16} />
                  <span className="text-base font-semibold">{service.price} ₽</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Категория</p>
              <Badge variant="outline">{service.category}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Формат</p>
              <div className="flex items-center gap-2">
                <Icon name={service.type === 'online' ? 'Video' : 'MapPin'} size={16} />
                <span>{service.type === 'online' ? 'Онлайн' : 'Оффлайн'}</span>
              </div>
              {service.type === 'online' && service.videoLink && (
                <p className="text-sm text-muted-foreground mt-1">{service.videoLink}</p>
              )}
              {service.type === 'offline' && service.address && (
                <p className="text-sm text-muted-foreground mt-1">{service.address}</p>
              )}
            </div>

            {service.isGroup && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Групповая услуга</p>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  <span>До {service.maxParticipants} человек</span>
                </div>
              </div>
            )}

            {service.prepaymentRequired && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Предоплата</p>
                <div className="flex items-center gap-2">
                  <Icon name="CreditCard" size={16} />
                  <span>{service.prepaymentPercent}% при записи</span>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Статистика</p>
              <div className="flex items-center gap-2">
                <Icon name="TrendingUp" size={16} />
                <span>{service.bookingsThisMonth} записей в этом месяце</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Закрыть
            </Button>
            {onEdit && (
              <Button className="flex-1" onClick={onEdit}>
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServicePreview;