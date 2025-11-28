import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ShareDialog from '@/components/ShareDialog';

interface Appointment {
  id: number;
  time: string;
  client: string;
  service: string;
  duration: number;
  status: string;
  date: string;
}

interface AppointmentDetailsDialogProps {
  selectedAppointment: Appointment | null;
  onClose: () => void;
  onMove: (appointment: Appointment) => void;
  onRepeat: (appointment: Appointment) => void;
  onCancel: (id: number) => void;
  showCalendarShare: boolean;
  onShareClose: () => void;
}

const AppointmentDetailsDialog = ({
  selectedAppointment,
  onClose,
  onMove,
  onRepeat,
  onCancel,
  showCalendarShare,
  onShareClose,
}: AppointmentDetailsDialogProps) => {
  return (
    <>
      <Dialog open={!!selectedAppointment} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Детали записи</DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">{selectedAppointment.client}</p>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.service}</p>
                  </div>
                  <Badge variant={selectedAppointment.status === 'confirmed' ? 'default' : 'secondary'}>
                    {selectedAppointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидание'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Дата</p>
                      <p className="text-sm font-medium">27 ноября 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Время</p>
                      <p className="text-sm font-medium">{selectedAppointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Timer" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Длительность</p>
                      <p className="text-sm font-medium">{selectedAppointment.duration} мин</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Wallet" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Стоимость</p>
                      <p className="text-sm font-medium">1500 ₽</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => { onClose(); }}>
                  <Icon name="Phone" size={16} className="mr-2" />
                  Позвонить
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => { onClose(); }}>
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Написать
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    onMove(selectedAppointment);
                    onClose();
                  }}
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Перенести запись
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    onRepeat(selectedAppointment);
                    onClose();
                  }}
                >
                  <Icon name="Copy" size={16} className="mr-2" />
                  Повторить запись
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={() => {
                    onCancel(selectedAppointment.id);
                    onClose();
                  }}
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Отменить запись
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ShareDialog
        title="Мой календарь записей"
        description="Поделитесь своим календарем с клиентами"
        url={`${window.location.origin}/calendar/master1`}
        previewUrl={`${window.location.origin}/calendar/master1`}
        open={showCalendarShare}
        onClose={onShareClose}
      />
    </>
  );
};

export default AppointmentDetailsDialog;