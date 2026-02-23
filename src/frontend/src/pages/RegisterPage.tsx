import RegistrationForm from '../components/RegistrationForm';
import PaymentDetails from '../components/PaymentDetails';
import { CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img
            src="/assets/generated/hero-banner.dim_1200x400.png"
            alt="Marathon registration"
            className="w-full h-[200px] md:h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-accent/80 to-primary/90 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                REGISTER NOW
              </h1>
              <p className="text-xl text-white/90 font-semibold">
                Join the Jhajha Marathon 2026
              </p>
            </div>
          </div>
        </div>

        {/* Payment Details Section */}
        <PaymentDetails />

        {/* Instructions */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-card rounded-2xl p-8 shadow-lg border-2 border-primary/20">
            <h2 className="text-2xl font-black mb-4 flex items-center space-x-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <span>Registration Instructions</span>
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Complete the payment using the UPI details or QR code above</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Fill out all required fields accurately in the registration form</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>Select your age category carefully</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary font-bold mt-1">•</span>
                <span>You will receive a confirmation with your participant ID after registration</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Registration Form */}
        <RegistrationForm />
      </div>
    </div>
  );
}
