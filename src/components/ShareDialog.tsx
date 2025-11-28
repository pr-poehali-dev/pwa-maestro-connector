import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import Icon from './ui/icon';

interface ShareDialogProps {
  title: string;
  description?: string;
  url: string;
  open: boolean;
  onClose: () => void;
  preview?: React.ReactNode;
  previewUrl?: string;
}

const ShareDialog = ({ title, description, url, open, onClose, preview, previewUrl }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [shareText, setShareText] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const textToShare = shareText || title;
    const encodedText = encodeURIComponent(textToShare);
    
    const shareUrls: Record<string, string> = {
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedText}`,
      max: `https://max.im/share?url=${encodedUrl}&text=${encodedText}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Поделиться</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4">
          {previewUrl && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                const link = document.createElement('a');
                link.href = previewUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Открыть предпросмотр
            </Button>
          )}

          <div className="space-y-2">
            <Label>Текст для публикации (опционально)</Label>
            <Textarea 
              placeholder="Добавьте описание к посту..."
              rows={3}
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Поделиться в соцсетях</p>
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center gap-2 h-auto py-3"
                onClick={() => handleShare('telegram')}
              >
                <Icon name="Send" size={20} />
                <span className="text-xs">Telegram</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center gap-2 h-auto py-3"
                onClick={() => handleShare('whatsapp')}
              >
                <Icon name="MessageCircle" size={20} />
                <span className="text-xs">WhatsApp</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center gap-2 h-auto py-3"
                onClick={() => handleShare('vk')}
              >
                <Icon name="Share2" size={20} />
                <span className="text-xs">VK</span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="flex flex-col items-center gap-2 h-auto py-3"
                onClick={() => handleShare('max')}
              >
                <Icon name="MessageSquare" size={20} />
                <span className="text-xs">Max</span>
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Или скопируйте ссылку</p>
            <div className="flex gap-2">
              <Input 
                value={url} 
                readOnly 
                className="flex-1"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button onClick={handleCopy}>
                {copied ? (
                  <>
                    <Icon name="Check" size={16} className="mr-2" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Icon name="Copy" size={16} className="mr-2" />
                    Копировать
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;