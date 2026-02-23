import { CreditCard, QrCode, User, IndianRupee } from 'lucide-react';

export default function PaymentDetails() {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="bg-gradient-to-br from-card via-card to-accent/5 rounded-2xl shadow-2xl p-8 border-2 border-primary/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2 flex items-center justify-center space-x-3">
            <CreditCard className="h-8 w-8 text-primary" />
            <span>Payment Details</span>
          </h2>
          <p className="text-muted-foreground font-semibold">
            Complete your registration by making the payment
          </p>
        </div>

        {/* Entry Fee Banner */}
        <div className="mb-8 bg-gradient-to-r from-primary via-accent to-primary rounded-xl shadow-lg overflow-hidden border-2 border-primary">
          <div className="bg-white/10 backdrop-blur-sm p-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <IndianRupee className="h-8 w-8 text-white" />
              <h3 className="text-4xl font-black text-white">₹100</h3>
            </div>
            <p className="text-lg font-bold text-white/90">Entry Fee per Participant</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* QR Code Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-primary/20">
              <img
                src="/assets/generated/phonepe-qr.dim_800x800.png"
                alt="PhonePe Payment QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <QrCode className="h-4 w-4" />
              <span className="font-semibold">Scan with any UPI app</span>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <div className="bg-background/50 rounded-xl p-6 border-2 border-primary/10">
              <div className="flex items-center space-x-2 mb-3">
                <User className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-black">Payee Name</h3>
              </div>
              <p className="text-2xl font-bold text-primary">Raman Kumar Asbariya</p>
            </div>

            <div className="bg-background/50 rounded-xl p-6 border-2 border-primary/10">
              <div className="flex items-center space-x-2 mb-3">
                <CreditCard className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-black">UPI ID</h3>
              </div>
              <p className="text-2xl font-bold text-primary break-all">7069180465@ybl</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('7069180465@ybl');
                }}
                className="mt-3 text-sm text-accent hover:text-accent/80 font-semibold underline transition-colors"
              >
                Click to copy UPI ID
              </button>
            </div>

            <div className="bg-accent/10 rounded-xl p-4 border-2 border-accent/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-accent">Note:</span> After payment, please complete the registration form below to confirm your participation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
