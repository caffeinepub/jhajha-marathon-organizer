import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Participant, Prize, AgeCategory } from '../backend';

export function useGetAllParticipants() {
  const { actor, isFetching } = useActor();

  return useQuery<Participant[]>({
    queryKey: ['participants'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllParticipants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPrizes() {
  const { actor, isFetching } = useActor();

  return useQuery<Prize[]>({
    queryKey: ['prizes'],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Backend actor not initialized');
      }
      const prizes = await actor.getPrizesByCategory();
      return prizes;
    },
    enabled: !!actor && !isFetching,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useRegisterParticipant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      address: string;
      email: string;
      phone: string;
      ageCategory: AgeCategory;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.registerParticipant(
        data.name,
        data.address,
        data.email,
        data.phone,
        data.ageCategory
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] });
    },
  });
}
