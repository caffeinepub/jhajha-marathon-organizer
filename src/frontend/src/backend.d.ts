import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Participant {
    id: bigint;
    name: string;
    email: string;
    address: string;
    registrationTimestamp: Time;
    phone: string;
    ageCategory: AgeCategory;
}
export interface Prize {
    placement: string;
    description: string;
    category: string;
    amount: bigint;
}
export type Time = bigint;
export enum AgeCategory {
    between18And35 = "between18And35",
    over50 = "over50",
    under18 = "under18",
    between36And50 = "between36And50"
}
export interface backendInterface {
    getAllParticipants(): Promise<Array<Participant>>;
    getAllPrizes(): Promise<Array<Prize>>;
    getParticipantById(id: bigint): Promise<Participant>;
    getPrizesByCategory(): Promise<Array<Prize>>;
    registerParticipant(name: string, address: string, email: string, phone: string, ageCategory: AgeCategory): Promise<bigint>;
}
