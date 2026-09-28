export const PLANS = {
  completo: { title: 'Plano Completo', price: 47.90 },
} as const;

export type PlanKey = keyof typeof PLANS;
