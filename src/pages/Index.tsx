import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NewsletterTemplate, defaultContent, NewsletterContent } from '@/components/newsletter/NewsletterTemplate';
import { generateEmailHtml } from '@/utils/generateEmailHtml';
import { toast } from 'sonner';
import { Copy, Monitor, Smartphone, Check, Edit2, Eye, Code, FileText, RotateCcw } from 'lucide-react';

const Index = () => {
  const [content, setContent] = useState<NewsletterContent>(defaultContent);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const [panelMode, setPanelMode] = useState<'preview' | 'html'>('preview');
  const [customHtml, setCustomHtml] = useState<string | null>(null);

  const generatedHtml = useMemo(() => generateEmailHtml(content, logoUrl), [content, logoUrl]);
  const emailHtml = customHtml ?? generatedHtml;

  // Sync generated HTML when switching to HTML panel and no custom edits exist
  useEffect(() => {
    if (panelMode === 'html' && customHtml === null) {
      // no-op, emailHtml already falls back to generatedHtml
    }
  }, [panelMode, customHtml, generatedHtml]);

  const handleCopyHtml = async () => {
    const html = emailHtml;
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
              <h1 className="text-xl font-bold text-foreground">Marketing Demo: HarikThompson CPAs</h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">

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

              {/* Panel Mode Toggle: Preview / HTML */}
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => setPanelMode('preview')}
                  className={`px-3 py-2 flex items-center gap-1 text-sm transition-colors ${
                    panelMode === 'preview'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground hover:bg-secondary'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button
                  onClick={() => setPanelMode('html')}
                  className={`px-3 py-2 flex items-center gap-1 text-sm transition-colors ${
                    panelMode === 'html'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground hover:bg-secondary'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit HTML</span>
                </button>
              </div>

              {/* Edit Mode Toggle (only in preview mode) */}
              {panelMode === 'preview' && (
                <Button
                  variant={editMode ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? <Eye className="w-4 h-4 mr-1" /> : <Edit2 className="w-4 h-4 mr-1" />}
                  {editMode ? 'Preview' : 'Edit'}
                </Button>
              )}

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

      {/* Newsletter Preview or HTML Editor */}
      <div className="py-8 px-4">
        {panelMode === 'preview' ? (
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
                Click on any text to edit it. Changes will be reflected in the exported HTML.
              </div>
            )}
            <NewsletterTemplate
              content={content}
              onContentChange={setContent}
              editable={editMode}
              logoUrl={logoUrl}
            />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                <span className="text-sm font-medium text-muted-foreground">
                  Email HTML Source {customHtml !== null && <span className="text-accent ml-1">(edited)</span>}
                </span>
                <div className="flex items-center gap-2">
                  {customHtml !== null && (
                    <Button
                      onClick={() => { setCustomHtml(null); toast.success('Reset to generated HTML'); }}
                      size="sm"
                      variant="ghost"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  )}
                  <Button onClick={handleCopyHtml} size="sm" variant="ghost">
                    {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
              <textarea
                value={emailHtml}
                onChange={(e) => setCustomHtml(e.target.value)}
                className="w-full h-[70vh] p-4 font-mono text-sm bg-background text-foreground resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Index;
