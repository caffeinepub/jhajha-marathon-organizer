import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { AgeCategory } from '../backend';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import RegistrationSuccess from './RegistrationSuccess';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  ageCategory: AgeCategory;
}

export default function RegistrationForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [registeredId, setRegisteredId] = useState<bigint | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const registerMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!actor) throw new Error('Actor not initialized');

      const participantId = await actor.registerParticipant(
        data.name,
        data.address,
        data.email,
        data.phone,
        data.ageCategory
      );

      return participantId;
    },
    onSuccess: (participantId) => {
      setRegisteredId(participantId);
      queryClient.invalidateQueries({ queryKey: ['participants'] });
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    registerMutation.mutate(data);
  };

  if (registeredId !== null) {
    return <RegistrationSuccess participantId={registeredId} onClose={() => setRegisteredId(null)} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl shadow-xl p-8 border-2 border-primary/10">
        <h2 className="text-3xl font-black mb-8 text-center">Participant Registration</h2>

        {/* Personal Information */}
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-black text-primary mb-4">Personal Information</h3>

          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Full Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.name.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email Address <span className="text-destructive">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold mb-2">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="+91 1234567890"
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.phone.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-bold mb-2">
              Address <span className="text-destructive">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              {...register('address', { required: 'Address is required' })}
              className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              placeholder="Enter your complete address"
            />
            {errors.address && (
              <p className="text-destructive text-sm mt-1 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.address.message}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="ageCategory" className="block text-sm font-bold mb-2">
              Age Category <span className="text-destructive">*</span>
            </label>
            <select
              id="ageCategory"
              {...register('ageCategory', { required: 'Age category is required' })}
              className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="">Select your age category</option>
              <option value={AgeCategory.under18}>Under 18</option>
              <option value={AgeCategory.between18And35}>18 - 35 years</option>
              <option value={AgeCategory.between36And50}>36 - 50 years</option>
              <option value={AgeCategory.over50}>Over 50 years</option>
            </select>
            {errors.ageCategory && (
              <p className="text-destructive text-sm mt-1 flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.ageCategory.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {registerMutation.isError && (
          <div className="mb-6 p-4 bg-destructive/10 border-2 border-destructive rounded-lg">
            <p className="text-destructive font-semibold flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>Registration failed. Please try again.</span>
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-gradient-to-r from-primary via-accent to-primary text-white font-black text-lg py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {registerMutation.isPending ? (
            <span className="flex items-center justify-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Registering...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>COMPLETE REGISTRATION</span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
