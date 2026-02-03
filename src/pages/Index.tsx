import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { NewsletterTemplate, defaultContent, NewsletterContent } from '@/components/newsletter/NewsletterTemplate';
import { generateEmailHtml } from '@/utils/generateEmailHtml';
import { toast } from 'sonner';
import { Copy, Monitor, Smartphone, Check, Edit2, Eye } from 'lucide-react';

const Index = () => {
  const [content, setContent] = useState<NewsletterContent>(defaultContent);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | undefined>();

  const handleCopyHtml = async () => {
    const html = generateEmailHtml(content, logoUrl);
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast.success('HTML copied to clipboard! Paste it into your ESP service.');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error('Failed to copy HTML. Please try again.');
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
        toast.success('Logo uploaded! Note: For email, you\'ll need to host this image and update the URL.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header Controls */}
      <div className="sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">Newsletter Template Builder</h1>
              <p className="text-sm text-muted-foreground">Kevin Thompson, CPAs and Advisors</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Logo Upload */}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button variant="outline" size="sm" asChild>
                  <span>{logoUrl ? 'Change Logo' : 'Upload Logo'}</span>
                </Button>
              </label>

              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-3 py-2 flex items-center gap-1 text-sm transition-colors ${
                    viewMode === 'desktop' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background text-foreground hover:bg-secondary'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-2 flex items-center gap-1 text-sm transition-colors ${
                    viewMode === 'mobile' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background text-foreground hover:bg-secondary'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>

              {/* Edit Mode Toggle */}
              <Button
                variant={editMode ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? <Eye className="w-4 h-4 mr-1" /> : <Edit2 className="w-4 h-4 mr-1" />}
                {editMode ? 'Preview' : 'Edit'}
              </Button>

              {/* Copy HTML Button */}
              <Button
                onClick={handleCopyHtml}
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? 'Copied!' : 'Copy HTML'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Preview */}
      <div className="py-8 px-4">
        <div 
          className={`mx-auto transition-all duration-300 ${
            viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-[650px]'
          }`}
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          {editMode && (
            <div className="bg-accent/20 border border-accent rounded-t-lg px-4 py-2 text-sm text-accent-foreground">
              ✏️ Click on any text to edit it. Changes will be reflected in the exported HTML.
            </div>
          )}
          <NewsletterTemplate
            content={content}
            onContentChange={setContent}
            editable={editMode}
            logoUrl={logoUrl}
          />
        </div>
      </div>

      {/* Instructions Footer */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-background rounded-lg border p-6">
          <h2 className="font-semibold text-foreground mb-3">How to use this newsletter:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Upload your logo using the "Upload Logo" button</li>
            <li>Click "Edit" to customize any text content</li>
            <li>Toggle between Desktop and Mobile views to preview responsiveness</li>
            <li>When ready, click "Copy HTML" to copy the email-ready HTML</li>
            <li>Paste the HTML into your ESP (Mailchimp, Constant Contact, etc.)</li>
            <li>Replace placeholder links ({"{{CTA_LINK}}"}, {"{{UNSUBSCRIBE_LINK}}"}, etc.) with your actual URLs</li>
          </ol>
          
          <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
            <strong>Note:</strong> The exported HTML uses table-based layouts and inline CSS for maximum email client compatibility (Outlook, Gmail, Apple Mail, etc.)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
