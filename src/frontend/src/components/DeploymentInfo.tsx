import { Link2, QrCode, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function DeploymentInfo() {
  const [copied, setCopied] = useState(false);
  
  // Jhajha Marathon official link
  const marathonUrl = 'https://jhajhamarathon.com';

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(marathonUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-2xl shadow-2xl p-8 border-2 border-primary/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black mb-2 flex items-center justify-center space-x-3">
                <Link2 className="h-8 w-8 text-primary" />
                <span>Jhajha Marathon</span>
              </h2>
              <p className="text-muted-foreground font-semibold">
                Share the marathon website with friends and family
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* QR Code Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-primary/20">
                  <img
                    src="/assets/generated/jhajha-marathon-qr.dim_400x400.png"
                    alt="Scan QR code to visit Jhajha Marathon website"
                    className="w-72 h-72 object-contain"
                  />
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <QrCode className="h-4 w-4" />
                  <span className="font-semibold">Scan to visit Jhajha Marathon</span>
                </div>
              </div>

              {/* URL Section */}
              <div className="space-y-6">
                <div className="bg-background/50 rounded-xl p-6 border-2 border-primary/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <Link2 className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-black">Official Website</h3>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-primary break-all mb-4">
                    {marathonUrl}
                  </p>
                  <button
                    onClick={handleCopyUrl}
                    className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="h-5 w-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-accent/10 rounded-xl p-4 border-2 border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-accent">Tip:</span> Share this link on social media or scan the QR code with your phone to quickly access the Jhajha Marathon registration page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
