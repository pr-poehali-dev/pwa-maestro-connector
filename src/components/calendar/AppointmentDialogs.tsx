import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { haptics } from '@/utils/haptics';

interface Appointment {
  id: number;
  time: string;
  client: string;
  service: string;
  duration: number;
  status: string;
  date: string;
}

interface Service {
  id: string;
  name: string;
  duration?: number;
  price?: number;
}

interface Client {
  id: string;
  name: string;
}

interface AppointmentDialogsProps {
  showNewAppointment: boolean;
  onNewAppointmentClose: () => void;
  selectedTime: string;
  clients: Client[];
  services: Service[];
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
  prepaymentPercent: number;
  onPrepaymentChange: (percent: number) => void;
  
  appointmentToCancel: number | null;
  onCancelConfirm: () => void;
  onCancelClose: () => void;
  
  appointmentToRepeat: Appointment | null;
  onRepeatClose: () => void;
  onRepeatConfirm: () => void;
  timeSlots: string[];
  
  appointmentToMove: Appointment | null;
  onMoveClose: () => void;
  onMoveConfirm: () => void;
}

const AppointmentDialogs = ({
  showNewAppointment,
  onNewAppointmentClose,
  selectedTime,
  clients,
  services,
  selectedServices,
  onServicesChange,
  prepaymentPercent,
  onPrepaymentChange,
  appointmentToCancel,
  onCancelConfirm,
  onCancelClose,
  appointmentToRepeat,
  onRepeatClose,
  onRepeatConfirm,
  timeSlots,
  appointmentToMove,
  onMoveClose,
  onMoveConfirm,
}: AppointmentDialogsProps) => {
  return (
    <>
      <Dialog open={showNewAppointment} onOpenChange={(open) => !open && onNewAppointmentClose()}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Новая запись</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Клиент</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Услуги</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                {services.filter(s => s.id !== 'all').map(service => (
                  <div key={service.id} className={`flex items-center justify-between p-2 hover:bg-muted rounded ${(service as any).active === false ? 'opacity-50' : ''}`}>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedServices.includes(service.id)}
                        disabled={(service as any).active === false}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onServicesChange([...selectedServices, service.id]);
                          } else {
                            onServicesChange(selectedServices.filter(id => id !== service.id));
                          }
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {service.name}
                          {(service as any).active === false && <span className="ml-2 text-xs text-muted-foreground">(неактивна)</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {service.duration} мин • {service.price} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Дата</Label>
                <Input type="date" defaultValue="2024-11-27" />
              </div>
              <div className="space-y-2">
                <Label>Время</Label>
                <Select defaultValue={selectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите время" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Заметки (опционально)</Label>
              <Textarea placeholder="Дополнительная информация" rows={3} />
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Требуется предоплата</Label>
                    <p className="text-xs text-muted-foreground">Клиент оплачивает часть при записи</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Размер предоплаты</Label>
                    <span className="text-sm font-semibold">{prepaymentPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={prepaymentPercent}
                    onChange={(e) => onPrepaymentChange(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => {
                haptics.light();
                onNewAppointmentClose();
              }}>
                Отмена
              </Button>
              <Button className="flex-1" onClick={() => {
                haptics.success();
                onNewAppointmentClose();
              }}>
                Создать запись
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!appointmentToCancel} onOpenChange={(open) => !open && onCancelClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Отменить запись?</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите отменить эту запись? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              haptics.light();
              onCancelClose();
            }}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={() => {
              haptics.error();
              onCancelConfirm();
            }}>
              Да, отменить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!appointmentToRepeat} onOpenChange={(open) => !open && onRepeatClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Повторить запись</DialogTitle>
            <DialogDescription>
              Выберите новую дату и время для повторения записи
            </DialogDescription>
          </DialogHeader>
          
          {appointmentToRepeat && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Клиент: {appointmentToRepeat.client}</p>
                <p className="text-sm text-muted-foreground">Услуга: {appointmentToRepeat.service}</p>
                <p className="text-sm text-muted-foreground">Длительность: {appointmentToRepeat.duration} мин</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Новая дата</Label>
                  <Input type="date" defaultValue="2024-11-28" />
                </div>
                <div className="space-y-2">
                  <Label>Новое время</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  haptics.light();
                  onRepeatClose();
                }}>
                  Отмена
                </Button>
                <Button onClick={() => {
                  haptics.success();
                  onRepeatConfirm();
                }}>
                  Создать запись
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!appointmentToMove} onOpenChange={(open) => !open && onMoveClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Перенести запись</DialogTitle>
            <DialogDescription>
              Выберите новую дату и время для записи
            </DialogDescription>
          </DialogHeader>
          
          {appointmentToMove && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Клиент: {appointmentToMove.client}</p>
                <p className="text-sm text-muted-foreground">Услуга: {appointmentToMove.service}</p>
                <p className="text-sm text-muted-foreground">Длительность: {appointmentToMove.duration} мин</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Новая дата</Label>
                  <Input type="date" defaultValue={appointmentToMove.date} />
                </div>
                <div className="space-y-2">
                  <Label>Новое время</Label>
                  <Select defaultValue={appointmentToMove.time}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  haptics.light();
                  onMoveClose();
                }}>
                  Отмена
                </Button>
                <Button onClick={() => {
                  haptics.success();
                  onMoveConfirm();
                }}>
                  Перенести
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentDialogs;