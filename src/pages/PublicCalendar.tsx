import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/ui/icon';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

const PublicCalendar = () => {
  const { masterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get('view') as 'day' | 'week' | 'month' | null;
  const [view, setView] = useState<'day' | 'week' | 'month'>(viewParam || 'day');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (viewParam && ['day', 'week', 'month'].includes(viewParam)) {
      setView(viewParam as 'day' | 'week' | 'month');
    }
  }, [viewParam]);

  const master = {
    name: 'Анна Петрова',
    category: 'Маникюр и педикюр',
    rating: 4.9,
    reviews: 127,
  };

  const availableSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: false },
    { time: '11:00', available: true },
    { time: '12:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>

        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {master.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{master.name}</h1>
                  <p className="text-sm text-muted-foreground">{master.category}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{master.rating}</span>
                    <span className="text-xs text-muted-foreground">({master.reviews} отзывов)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-3">Выберите дату</h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">
                  Доступное время на {selectedDate?.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={slot.available ? "outline" : "secondary"}
                      disabled={!slot.available}
                      className="h-12"
                      onClick={() => navigate(`/book/${masterId}?date=${selectedDate?.toISOString()}&time=${slot.time}`)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicCalendar;