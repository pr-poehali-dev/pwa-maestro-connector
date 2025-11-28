import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface ServiceFormDialogProps {
  open: boolean;
  onClose: () => void;
  editingService: any;
  selectedService: any;
  categories: string[];
  isGroupService: boolean;
  setIsGroupService: (value: boolean) => void;
  prepaymentRequired: boolean;
  setPrepaymentRequired: (value: boolean) => void;
  setSelectedService: (service: any) => void;
  serviceImage: string | null;
  setServiceImage: (image: string | null) => void;
}

const ServiceFormDialog = ({
  open,
  onClose,
  editingService,
  selectedService,
  categories,
  isGroupService,
  setIsGroupService,
  prepaymentRequired,
  setPrepaymentRequired,
  setSelectedService,
  serviceImage,
  setServiceImage,
}: ServiceFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        onClose();
      }
    }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingService ? 'Редактировать услугу' : selectedService ? 'Копировать услугу' : 'Новая услуга'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Название услуги</Label>
            <Input 
              placeholder="Например: Маникюр с покрытием" 
              defaultValue={editingService?.name || selectedService?.name}
            />
          </div>

          <div className="space-y-2">
            <Label>Изображение услуги (опционально)</Label>
            <div className="flex gap-2">
              {serviceImage || editingService?.image || selectedService?.image ? (
                <div className="relative w-full h-32 rounded-lg border overflow-hidden">
                  <img 
                    src={serviceImage || editingService?.image || selectedService?.image} 
                    alt="Service" 
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setServiceImage(null)}
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              ) : (
                <label className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Icon name="Upload" size={24} className="text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Загрузить изображение</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setServiceImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Категория</Label>
            <Select defaultValue={editingService?.category || selectedService?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Тип услуги</Label>
            <Select defaultValue={editingService?.type || selectedService?.type || 'offline'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="offline">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={14} />
                    Оффлайн встреча
                  </div>
                </SelectItem>
                <SelectItem value="online">
                  <div className="flex items-center gap-2">
                    <Icon name="Video" size={14} />
                    Онлайн встреча
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(editingService?.type === 'offline' || selectedService?.type === 'offline') && (
            <div className="space-y-2">
              <Label>Адрес встречи</Label>
              <Input 
                placeholder="г. Москва, ул. Примерная, д. 1" 
                defaultValue={editingService?.address || selectedService?.address}
              />
            </div>
          )}

          {(editingService?.type === 'online' || selectedService?.type === 'online') && (
            <div className="space-y-2">
              <Label>Ссылка на видеовстречу (опционально)</Label>
              <Input 
                placeholder="https://zoom.us/j/..." 
                defaultValue={editingService?.videoLink || selectedService?.videoLink}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Длительность (минут)</Label>
              <Select defaultValue={(editingService?.duration || selectedService?.duration)?.toString()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 минут</SelectItem>
                  <SelectItem value="30">30 минут</SelectItem>
                  <SelectItem value="45">45 минут</SelectItem>
                  <SelectItem value="60">60 минут</SelectItem>
                  <SelectItem value="90">90 минут</SelectItem>
                  <SelectItem value="120">120 минут</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Стоимость (₽)</Label>
              <Input 
                type="number" 
                placeholder="1500" 
                defaultValue={editingService?.price || selectedService?.price}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Описание (опционально)</Label>
            <Textarea 
              placeholder="Краткое описание услуги для клиентов" 
              rows={3}
              defaultValue={editingService?.description || selectedService?.description}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <Label>Групповая услуга</Label>
              <p className="text-xs text-muted-foreground">Несколько клиентов одновременно</p>
            </div>
            <Switch 
              checked={editingService ? editingService.isGroup : selectedService ? selectedService.isGroup : isGroupService}
              onCheckedChange={(checked) => {
                if (selectedService) {
                  setSelectedService({ ...selectedService, isGroup: checked });
                } else {
                  setIsGroupService(checked);
                }
              }}
            />
          </div>

          {(selectedService?.isGroup || isGroupService) && (
            <div className="space-y-2">
              <Label>Максимум участников</Label>
              <Input 
                type="number" 
                min="2" 
                max="50" 
                placeholder="10" 
                defaultValue={selectedService?.maxParticipants}
              />
            </div>
          )}

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Требуется предоплата</Label>
                  <p className="text-xs text-muted-foreground">Клиент оплачивает часть при записи</p>
                </div>
                <Switch 
                  checked={selectedService ? selectedService.prepaymentRequired : prepaymentRequired}
                  onCheckedChange={(checked) => {
                    if (selectedService) {
                      setSelectedService({ ...selectedService, prepaymentRequired: checked });
                    } else {
                      setPrepaymentRequired(checked);
                    }
                  }}
                />
              </div>
              {(selectedService?.prepaymentRequired || prepaymentRequired) && (
                <div className="space-y-2">
                  <Label>Размер предоплаты (%)</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      min="10" 
                      max="100" 
                      placeholder="30" 
                      defaultValue={selectedService?.prepaymentPercent || 30}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      от 10% до 100%
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <Label>Активна</Label>
              <p className="text-xs text-muted-foreground">Клиенты могут записаться на эту услугу</p>
            </div>
            <Switch defaultChecked={selectedService?.active ?? true} />
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onClose}
            >
              Отмена
            </Button>
            <Button 
              className="flex-1"
              onClick={onClose}
            >
              {selectedService ? 'Сохранить' : 'Создать'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
