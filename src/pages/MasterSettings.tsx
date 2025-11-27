import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const MasterSettings = () => {
  const [profile, setProfile] = useState({
    name: 'Анна Петрова',
    phone: '+7 (999) 123-45-67',
    email: 'anna@example.com',
    category: 'Маникюр и педикюр',
    address: 'г. Москва, ул. Примерная, д. 1',
    description: 'Профессиональный мастер маникюра с опытом работы более 5 лет. Работаю с гель-лаками премиум-класса.',
  });

  const [paymentSettings, setPaymentSettings] = useState({
    onlinePaymentEnabled: true,
    prepaymentRequired: false,
    prepaymentPercent: 30,
    yukassaConnected: true,
    stripeConnected: false,
  });

  const [subscription, setSubscription] = useState({
    plan: 'pro',
    status: 'active',
    expiresAt: '2024-12-27',
    price: 990,
    features: [
      'Неограниченное количество записей',
      'Автоматические напоминания',
      'Статистика и аналитика',
      'Онлайн-оплаты',
      'Приоритетная поддержка',
    ],
  });

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-bold">Настройки</h2>
        <p className="text-sm text-muted-foreground">Управление профилем и параметрами</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="payment">Оплаты</TabsTrigger>
          <TabsTrigger value="subscription">Подписка</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xl">АП</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button size="sm" variant="outline">
                    <Icon name="Upload" size={14} className="mr-2" />
                    Загрузить фото
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG до 5 МБ</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Имя и фамилия</Label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Категория услуг</Label>
                <Input value={profile.category} onChange={(e) => setProfile({ ...profile, category: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Адрес</Label>
                <Input value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">О себе</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Описание для клиентов</Label>
                <Textarea
                  rows={5}
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  placeholder="Расскажите о себе, опыте работы, используемых материалах..."
                />
                <p className="text-xs text-muted-foreground">
                  {profile.description.length} / 500 символов
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ссылки и социальные сети</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input placeholder="@your_instagram" />
              </div>
              <div className="space-y-2">
                <Label>Telegram</Label>
                <Input placeholder="@your_telegram" />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input placeholder="+7 (999) 123-45-67" />
              </div>
              <div className="space-y-2">
                <Label>Сайт / Портфолио</Label>
                <Input placeholder="https://your-website.com" />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить изменения
          </Button>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Онлайн-оплата услуг</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label className="font-medium">Принимать онлайн-оплаты</Label>
                  <p className="text-xs text-muted-foreground">Клиенты смогут оплачивать услуги картой</p>
                </div>
                <Switch
                  checked={paymentSettings.onlinePaymentEnabled}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, onlinePaymentEnabled: checked })}
                />
              </div>

              {paymentSettings.onlinePaymentEnabled && (
                <>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <Label className="font-medium">Обязательная предоплата</Label>
                      <p className="text-xs text-muted-foreground">Клиент оплачивает часть суммы при записи</p>
                    </div>
                    <Switch
                      checked={paymentSettings.prepaymentRequired}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, prepaymentRequired: checked })}
                    />
                  </div>

                  {paymentSettings.prepaymentRequired && (
                    <div className="space-y-2">
                      <Label>Размер предоплаты (%)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="10"
                          max="100"
                          value={paymentSettings.prepaymentPercent}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, prepaymentPercent: parseInt(e.target.value) })}
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground">
                          от стоимости услуги
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Платежные системы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="CreditCard" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">ЮKassa</p>
                    <p className="text-xs text-muted-foreground">
                      {paymentSettings.yukassaConnected ? 'Подключено' : 'Не подключено'}
                    </p>
                  </div>
                </div>
                {paymentSettings.yukassaConnected ? (
                  <Badge variant="default">Активно</Badge>
                ) : (
                  <Button size="sm">Подключить</Button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="CreditCard" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Stripe</p>
                    <p className="text-xs text-muted-foreground">
                      {paymentSettings.stripeConnected ? 'Подключено' : 'Не подключено'}
                    </p>
                  </div>
                </div>
                {paymentSettings.stripeConnected ? (
                  <Badge variant="default">Активно</Badge>
                ) : (
                  <Button size="sm" variant="outline">Подключить</Button>
                )}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Icon name="Info" className="text-blue-600 mt-0.5" size={16} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Комиссия платежных систем</p>
                    <p className="text-xs text-blue-700 mt-1">
                      ЮKassa: 2.8% + 10 ₽ с каждого платежа<br />
                      Stripe: 2.9% + 30 ₽ с каждого платежа
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить настройки
          </Button>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4 mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Тариф PRO</h3>
                  <p className="text-sm text-muted-foreground">Подписка активна</p>
                </div>
                <Badge variant="default" className="text-sm">Активна</Badge>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">{subscription.price} ₽</span>
                <span className="text-muted-foreground">/ месяц</span>
              </div>

              <div className="space-y-3 mb-6">
                {subscription.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Icon name="Check" className="text-primary" size={16} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-muted rounded-lg mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Следующее списание:</span>
                  <span className="font-medium">{subscription.expiresAt}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Отменить подписку
                </Button>
                <Button className="flex-1">
                  Продлить сейчас
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">История платежей</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Подписка PRO</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(2024, 10 - idx, 27).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{subscription.price} ₽</p>
                    <Badge variant="outline" className="text-xs">Оплачено</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Другие тарифы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">Базовый</h4>
                    <p className="text-2xl font-bold mt-1">490 ₽ <span className="text-sm font-normal text-muted-foreground">/ месяц</span></p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    До 50 записей в месяц
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    Базовая аналитика
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    Поддержка email
                  </li>
                </ul>
                <Button variant="outline" className="w-full" size="sm">
                  Перейти на Базовый
                </Button>
              </div>

              <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">Бизнес</h4>
                    <p className="text-2xl font-bold mt-1">1990 ₽ <span className="text-sm font-normal text-muted-foreground">/ месяц</span></p>
                  </div>
                  <Badge>Популярный</Badge>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    Неограниченные записи
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    Расширенная аналитика
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    API доступ
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-primary" />
                    Персональный менеджер
                  </li>
                </ul>
                <Button className="w-full" size="sm">
                  Перейти на Бизнес
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MasterSettings;
