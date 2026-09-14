export const SHIPPING_OPTIONS = [
  {
    courier: "JNE Reguler",
    cost: 15000,
  },
  {
    courier: "J&T Reguler",
    cost: 12000,
  },
] as const;

export type ShippingCourier = (typeof SHIPPING_OPTIONS)[number]["courier"];

export function getShippingCost(courier: string) {
  return SHIPPING_OPTIONS.find((option) => option.courier === courier)?.cost ?? 0;
}
