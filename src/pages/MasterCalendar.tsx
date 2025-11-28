import { useState, useEffect } from 'react';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarViews from '@/components/calendar/CalendarViews';
import AppointmentDialogs from '@/components/calendar/AppointmentDialogs';
import AppointmentDetailsDialog from '@/components/calendar/AppointmentDetailsDialog';

const appointments = [
  { id: 1, time: '09:00', client: 'Мария Соколова', service: 'Маникюр с покрытием', duration: 60, status: 'confirmed', date: '2024-11-27' },
  { id: 2, time: '10:30', client: 'Анна Иванова', service: 'Педикюр', duration: 90, status: 'pending', date: '2024-11-27' },
  { id: 3, time: '14:00', client: 'Елена Петрова', service: 'Маникюр с покрытием', duration: 60, status: 'confirmed', date: '2024-11-27' },
  { id: 4, time: '16:00', client: 'Ольга Смирнова', service: 'Чистка лица', duration: 60, status: 'confirmed', date: '2024-11-27' },
];

const services = [
  { id: 'all', name: 'Все услуги', active: true },
  { id: '1', name: 'Маникюр с покрытием', duration: 60, price: 1500, active: true },
  { id: '2', name: 'Педикюр', duration: 90, price: 2000, active: true },
  { id: '3', name: 'Чистка лица', duration: 60, price: 3000, active: false },
];

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const clients = [
  { id: 'all', name: 'Все клиенты' },
  { id: '1', name: 'Мария Соколова' },
  { id: '2', name: 'Анна Иванова' },
  { id: '3', name: 'Елена Петрова' },
  { id: '4', name: 'Ольга Смирнова' },
];

const MasterCalendar = () => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
  const [selectedClientFilter, setSelectedClientFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [prepaymentPercent, setPrepaymentPercent] = useState(0);
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  const [appointmentToRepeat, setAppointmentToRepeat] = useState<typeof appointments[0] | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointments[0] | null>(null);
  const [appointmentToMove, setAppointmentToMove] = useState<typeof appointments[0] | null>(null);
  const [showCalendarShare, setShowCalendarShare] = useState(false);

  const handleCancelAppointment = (id: number) => {
    setAppointmentToCancel(id);
  };

  const handleRepeatAppointment = (appointment: typeof appointments[0]) => {
    setAppointmentToRepeat(appointment);
  };

  useEffect(() => {
    const handleSwitchToDay = () => {
      setView('day');
    };
    
    window.addEventListener('switchToDay', handleSwitchToDay);
    return () => window.removeEventListener('switchToDay', handleSwitchToDay);
  }, []);

  let filteredAppointments = appointments;
  
  if (selectedServiceFilter !== 'all') {
    const serviceName = services.find(s => s.id === selectedServiceFilter)?.name;
    filteredAppointments = filteredAppointments.filter(a => a.service === serviceName);
  }
  
  if (selectedClientFilter !== 'all') {
    const clientName = clients.find(c => c.id === selectedClientFilter)?.name;
    filteredAppointments = filteredAppointments.filter(a => a.client === clientName);
  }

  return (
    <div className="space-y-4 pb-20">
      <CalendarHeader
        view={view}
        onViewChange={setView}
        selectedServiceFilter={selectedServiceFilter}
        onServiceFilterChange={setSelectedServiceFilter}
        selectedClientFilter={selectedClientFilter}
        onClientFilterChange={setSelectedClientFilter}
        onShareClick={() => setShowCalendarShare(true)}
        services={services}
        clients={clients}
      />

      <CalendarViews
        view={view}
        filteredAppointments={filteredAppointments}
        timeSlots={timeSlots}
        weekDays={weekDays}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        onAppointmentClick={setSelectedAppointment}
        onCancelAppointment={handleCancelAppointment}
        onRepeatAppointment={handleRepeatAppointment}
        onMoveAppointment={setAppointmentToMove}
        onNewAppointmentClick={(time) => {
          if (time) setSelectedTime(time);
          setShowNewAppointment(true);
        }}
      />

      <AppointmentDialogs
        showNewAppointment={showNewAppointment}
        onNewAppointmentClose={() => setShowNewAppointment(false)}
        selectedTime={selectedTime}
        clients={clients}
        services={services}
        selectedServices={selectedServices}
        onServicesChange={setSelectedServices}
        prepaymentPercent={prepaymentPercent}
        onPrepaymentChange={setPrepaymentPercent}
        appointmentToCancel={appointmentToCancel}
        onCancelConfirm={() => setAppointmentToCancel(null)}
        onCancelClose={() => setAppointmentToCancel(null)}
        appointmentToRepeat={appointmentToRepeat}
        onRepeatClose={() => setAppointmentToRepeat(null)}
        onRepeatConfirm={() => setAppointmentToRepeat(null)}
        timeSlots={timeSlots}
        appointmentToMove={appointmentToMove}
        onMoveClose={() => setAppointmentToMove(null)}
        onMoveConfirm={() => setAppointmentToMove(null)}
      />

      <AppointmentDetailsDialog
        selectedAppointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onMove={(appointment) => {
          setAppointmentToMove(appointment);
          setSelectedAppointment(null);
        }}
        onRepeat={(appointment) => {
          handleRepeatAppointment(appointment);
          setSelectedAppointment(null);
        }}
        onCancel={(id) => {
          handleCancelAppointment(id);
          setSelectedAppointment(null);
        }}
        showCalendarShare={showCalendarShare}
        onShareClose={() => setShowCalendarShare(false)}
        calendarView={view}
      />
    </div>
  );
};

export default MasterCalendar;