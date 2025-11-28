import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const MasterAuth = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const navigate = useNavigate();

  const handleSendCode = () => {
    if (phone.length >= 10) {
      setStep('code');
    }
  };

  const handleLogin = () => {
    navigate('/master/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={32} className="text-primary" />
          </div>
          <CardTitle className="text-2xl">Такт</CardTitle>
          <CardDescription>
            {step === 'phone' ? 'Вход для мастеров' : 'Введите код подтверждения'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'phone' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button 
                className="w-full h-12" 
                onClick={handleSendCode}
                disabled={phone.length < 10}
              >
                Получить код
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="code">Код из SMS</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="0000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-12 text-center text-2xl tracking-widest"
                  maxLength={4}
                />
                <p className="text-xs text-muted-foreground text-center">
                  Код отправлен на {phone}
                </p>
              </div>
              <Button 
                className="w-full h-12" 
                onClick={handleLogin}
                disabled={code.length < 4}
              >
                Войти
              </Button>
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => setStep('phone')}
              >
                Изменить номер
              </Button>
            </>
          )}

          <div className="pt-4 text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate('/')}
            >
              ← Вернуться на главную
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MasterAuth;
