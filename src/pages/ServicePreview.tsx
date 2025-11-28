import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useParams, useNavigate } from 'react-router-dom';

const ServicePreview = () => {
  const { masterId, serviceId } = useParams();
  const navigate = useNavigate();
  
  // Перенаправляем сразу на букинг
  React.useEffect(() => {
    navigate(`/book/${masterId}/${serviceId}`, { replace: true });
  }, [masterId, serviceId, navigate]);

  const service = {
    name: 'Маникюр с покрытием',
    category: 'Маникюр',
    description: 'Профессиональный маникюр с долговечным гелевым покрытием. Включает обработку кутикулы, придание формы ногтям и нанесение покрытия.',
    duration: 60,
    price: 1500,
    type: 'offline' as const,
    address: 'г. Москва, ул. Примерная, д. 1',
    master: {
      name: 'Анна Петрова',
      rating: 4.9,
      reviews: 127,
    },
    image: null,
  };

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
          {service.image && (
            <div className="w-full h-64 bg-muted flex items-center justify-center">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{service.name}</h1>
                  <Badge variant="outline" className="mt-2">{service.category}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{service.price} ₽</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{service.duration} минут</p>
                  <p className="text-xs text-muted-foreground">Длительность</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={service.type === 'online' ? 'Video' : 'MapPin'} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{service.type === 'online' ? 'Онлайн' : 'Оффлайн'}</p>
                  <p className="text-xs text-muted-foreground">Формат</p>
                </div>
              </div>
            </div>

            {service.type === 'offline' && service.address && (
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Icon name="MapPin" size={20} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Адрес</p>
                  <p className="text-sm text-muted-foreground">{service.address}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {service.master.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{service.master.name}</p>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{service.master.rating}</span>
                    <span className="text-xs text-muted-foreground">({service.master.reviews} отзывов)</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              className="w-full h-12 text-base"
              onClick={() => navigate(`/book/${masterId}/${serviceId}`)}
            >
              <Icon name="Calendar" size={20} className="mr-2" />
              Записаться
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicePreview;