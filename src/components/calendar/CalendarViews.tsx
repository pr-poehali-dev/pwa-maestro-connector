import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import SwipeCard from '@/components/SwipeCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

interface CalendarViewsProps {
  view: 'day' | 'week' | 'month';
  filteredAppointments: Appointment[];
  timeSlots: string[];
  weekDays: string[];
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  onCancelAppointment: (id: number) => void;
  onRepeatAppointment: (appointment: Appointment) => void;
  onMoveAppointment: (appointment: Appointment) => void;
  onNewAppointmentClick: (time?: string) => void;
}

const CalendarViews = ({
  view,
  filteredAppointments,
  timeSlots,
  weekDays,
  selectedDate,
  onDateSelect,
  onAppointmentClick,
  onCancelAppointment,
  onRepeatAppointment,
  onMoveAppointment,
  onNewAppointmentClick,
}: CalendarViewsProps) => {
  return (
    <>
      {view === 'day' && (
        <Card>
          <CardContent className="p-4">
            <div className="mb-4 pb-3 border-b">
              <h3 className="text-lg font-semibold">
                {selectedDate ? selectedDate.toLocaleDateString('ru-RU', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                }) : 'Сегодня'}
              </h3>
            </div>
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const appointment = filteredAppointments.find(a => a.time === time);
                
                return (
                  <div key={time} className="flex items-stretch min-h-14 sm:min-h-16 border-b last:border-b-0">
                    <div className="w-12 sm:w-16 flex items-center justify-center text-xs sm:text-sm text-muted-foreground font-medium border-r">
                      {time}
                    </div>
                    
                    <div className="flex-1 p-1.5 sm:p-2">
                      {appointment ? (
                        <SwipeCard
                          onSwipeLeft={() => onCancelAppointment(appointment.id)}
                          onSwipeRight={() => onRepeatAppointment(appointment)}
                          leftAction={{ icon: 'X', label: 'Отменить', color: '#ef4444' }}
                          rightAction={{ icon: 'Copy', label: 'Повторить', color: '#3b82f6' }}
                          className="h-full"
                        >
                          <Card 
                            className="h-full hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => {
                              haptics.light();
                              onAppointmentClick(appointment);
                            }}
                          >
                            <CardContent className="p-2 sm:p-3">
                              <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-xs sm:text-sm truncate">{appointment.client}</p>
                                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{appointment.service}</p>
                                  <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
                                    <Badge variant="outline" className="text-[9px] sm:text-xs px-1 py-0 h-4 sm:h-5">
                                      <Icon name="Clock" size={8} className="mr-0.5 sm:mr-1" />
                                      {appointment.duration} мин
                                    </Badge>
                                    <Badge variant="outline" className="text-[9px] sm:text-xs px-1 py-0 h-4 sm:h-5 hidden sm:inline-flex">
                                      <Icon name="MapPin" size={8} className="mr-0.5 sm:mr-1" />
                                      Оффлайн
                                    </Badge>
                                    {(appointment as any).prepaymentRequired && (
                                      <Badge variant="secondary" className="text-[9px] sm:text-xs px-1 py-0 h-4 sm:h-5">
                                        <Icon name="CreditCard" size={8} className="mr-0.5 sm:mr-1" />
                                        30%
                                      </Badge>
                                    )}
                                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'} className="text-[9px] sm:text-xs px-1 py-0 h-4 sm:h-5">
                                      {appointment.status === 'confirmed' ? 'Подтв.' : 'Ожид.'}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="hidden sm:flex gap-1">
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={(e) => {
                                    e.stopPropagation();
                                    haptics.light();
                                  }}>
                                    <Icon name="Phone" size={12} />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={(e) => {
                                    e.stopPropagation();
                                    haptics.light();
                                  }}>
                                    <Icon name="MessageCircle" size={12} />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={(e) => e.stopPropagation()}>
                                        <Icon name="MoreVertical" size={12} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={(e) => { 
                                        e.stopPropagation(); 
                                        haptics.medium();
                                        onMoveAppointment(appointment); 
                                      }}>
                                        <Icon name="Calendar" size={14} className="mr-2" />
                                        Перенести запись
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={(e) => { 
                                        e.stopPropagation(); 
                                        haptics.medium();
                                        onRepeatAppointment(appointment); 
                                      }}>
                                        <Icon name="Copy" size={14} className="mr-2" />
                                        Повторить запись
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={(e) => { 
                                          e.stopPropagation(); 
                                          haptics.heavy();
                                          onCancelAppointment(appointment.id); 
                                        }}
                                        className="text-destructive"
                                      >
                                        <Icon name="X" size={14} className="mr-2" />
                                        Отменить запись
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </SwipeCard>
                      ) : (
                        <button
                          onClick={() => {
                            haptics.light();
                            onNewAppointmentClick(time);
                          }}
                          className="w-full h-full flex items-center justify-center text-xs text-muted-foreground hover:bg-muted/50 rounded transition-colors"
                        >
                          Свободно
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {view === 'week' && (
        <Card>
          <CardContent className="p-2 sm:p-4">
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <div className="min-w-[600px] sm:min-w-[800px] px-2 sm:px-0">
                <div className="grid grid-cols-8 gap-2 mb-2">
                  <div className="text-xs text-muted-foreground font-medium"></div>
                  {weekDays.map((day, idx) => (
                    <div key={day} className="text-center">
                      <p className="text-xs font-medium">{day}</p>
                      <p className="text-lg font-bold">{24 + idx}</p>
                    </div>
                  ))}
                </div>

                {timeSlots.slice(0, 8).map((time) => (
                  <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                    <div className="text-xs text-muted-foreground font-medium py-2">{time}</div>
                    {weekDays.map((_, dayIdx) => {
                      const appointment = dayIdx === 2 ? filteredAppointments.find(a => a.time === time) : null;
                      return (
                        <div
                          key={dayIdx}
                          className={`min-h-14 rounded border ${
                            appointment
                              ? 'bg-primary/10 border-primary/30 p-1 cursor-pointer hover:shadow-md transition-shadow'
                              : 'bg-muted/30 hover:bg-muted/50 cursor-pointer'
                          }`}
                          onClick={() => appointment ? onAppointmentClick(appointment) : onNewAppointmentClick(time)}
                        >
                          {appointment && (
                            <div className="space-y-0.5">
                              <p className="text-[10px] font-semibold truncate leading-tight">{appointment.client}</p>
                              <p className="text-[9px] text-muted-foreground truncate leading-tight">{appointment.service}</p>
                              <Badge variant="outline" className="text-[8px] h-3 px-1 py-0">
                                {appointment.duration}м
                              </Badge>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {view === 'month' && (
        <Card>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                onDateSelect(date);
                if (date) {
                  const event = new CustomEvent('switchToDay');
                  window.dispatchEvent(event);
                }
              }}
              className="rounded-md border-0 w-full"
              classNames={{
                months: "w-full",
                month: "w-full",
                table: "w-full border-collapse",
                head_row: "flex w-full",
                head_cell: "flex-1 text-muted-foreground rounded-md w-full font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "flex-1 h-16 text-center text-sm relative p-0 focus-within:relative focus-within:z-20",
                day: "h-full w-full p-0 font-normal hover:bg-accent hover:text-accent-foreground rounded-md",
              }}
            />
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Записи на выбранный день:</p>
              <div className="space-y-2">
                {filteredAppointments.slice(0, 3).map((appointment) => (
                  <Card 
                    key={appointment.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onAppointmentClick(appointment)}
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{appointment.client}</p>
                        <p className="text-xs text-muted-foreground">{appointment.time} · {appointment.service}</p>
                      </div>
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                        {appointment.status === 'confirmed' ? 'Подтв.' : 'Ожид.'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="fixed bottom-20 right-4 z-40">
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => onNewAppointmentClick()}
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </>
  );
};

export default CalendarViews;