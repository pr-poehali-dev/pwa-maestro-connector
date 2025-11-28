import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ServicePreview from '@/components/ServicePreview';
import ShareDialog from '@/components/ShareDialog';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceFormDialog from '@/components/services/ServiceFormDialog';
import ServiceDeleteDialog from '@/components/services/ServiceDeleteDialog';

const services = [
  {
    id: 1,
    name: 'Маникюр с покрытием',
    category: 'Маникюр',
    duration: 60,
    price: 1500,
    description: 'Классический маникюр с покрытием гель-лаком',
    active: true,
    bookingsThisMonth: 24,
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
    prepaymentRequired: true,
    prepaymentPercent: 30,
  },
  {
    id: 2,
    name: 'Педикюр',
    category: 'Педикюр',
    duration: 90,
    price: 2000,
    description: 'Медицинский педикюр',
    active: true,
    bookingsThisMonth: 18,
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
    prepaymentRequired: false,
    prepaymentPercent: 0,
  },
  {
    id: 3,
    name: 'Групповой урок маникюра',
    category: 'Обучение',
    duration: 120,
    price: 3000,
    description: 'Мастер-класс по маникюру в группе',
    active: true,
    bookingsThisMonth: 8,
    type: 'online',
    videoLink: 'https://zoom.us/j/example',
    isGroup: true,
    maxParticipants: 10,
    prepaymentRequired: true,
    prepaymentPercent: 100,
  },
  {
    id: 4,
    name: 'Снятие покрытия',
    category: 'Маникюр',
    duration: 15,
    price: 300,
    description: 'Безопасное снятие гель-лака',
    active: true,
    bookingsThisMonth: 12,
    type: 'offline',
    address: 'г. Москва, ул. Примерная, д. 1',
    isGroup: false,
    prepaymentRequired: false,
    prepaymentPercent: 0,
  },
];

const categories = ['Маникюр', 'Педикюр', 'Наращивание', 'Дизайн', 'Другое'];

const MasterServices = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showNewService, setShowNewService] = useState(false);
  const [isGroupService, setIsGroupService] = useState(false);
  const [prepaymentRequired, setPrepaymentRequired] = useState(false);
  const [viewService, setViewService] = useState<any>(null);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const [serviceToShare, setServiceToShare] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [serviceImage, setServiceImage] = useState<string | null>(null);

  const handleDuplicateService = (service: any) => {
    setSelectedService({ ...service, name: `${service.name} (копия)`, id: Date.now() });
  };

  const handleCloseForm = () => {
    setShowNewService(false);
    setSelectedService(null);
    setEditingService(null);
    setIsGroupService(false);
    setPrepaymentRequired(false);
    setServiceImage(null);
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="sticky top-[73px] z-30 bg-background pt-4 pb-3 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Мои услуги</h2>
            <p className="text-sm text-muted-foreground">{services.length} активных услуг</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 right-4 z-40">
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg"
          onClick={() => setShowNewService(true)}
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>

      <div className="grid gap-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onView={setViewService}
            onEdit={setEditingService}
            onDuplicate={handleDuplicateService}
            onDelete={setServiceToDelete}
            onShare={setServiceToShare}
          />
        ))}
      </div>

      <ServiceFormDialog
        open={showNewService || !!selectedService || !!editingService}
        onClose={handleCloseForm}
        editingService={editingService}
        selectedService={selectedService}
        categories={categories}
        isGroupService={isGroupService}
        setIsGroupService={setIsGroupService}
        prepaymentRequired={prepaymentRequired}
        setPrepaymentRequired={setPrepaymentRequired}
        setSelectedService={setSelectedService}
        serviceImage={serviceImage}
        setServiceImage={setServiceImage}
      />

      <ServicePreview
        service={viewService}
        open={!!viewService}
        onClose={() => setViewService(null)}
        onEdit={() => {
          setSelectedService(null);
          setEditingService(viewService);
          setViewService(null);
        }}
      />

      <ShareDialog
        title={serviceToShare?.name || ''}
        description="Поделитесь услугой с клиентами"
        url={`${window.location.origin}/service/master1/${serviceToShare?.id}`}
        previewUrl={`${window.location.origin}/service/master1/${serviceToShare?.id}`}
        open={!!serviceToShare}
        onClose={() => setServiceToShare(null)}
      />

      <ServiceDeleteDialog
        open={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={() => setServiceToDelete(null)}
      />
    </div>
  );
};

export default MasterServices;