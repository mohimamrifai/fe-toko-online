export interface Address {
  id: string;
  label: string | null;
  recipientName: string;
  phone: string;
  fullAddress: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressPayload {
  label?: string;
  recipientName: string;
  phone: string;
  fullAddress: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface UpdateAddressPayload {
  label?: string;
  recipientName?: string;
  phone?: string;
  fullAddress?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  isDefault?: boolean;
}

export interface AddressListResponse {
  data: Address[];
}

export interface AddressResponse {
  data: Address;
}
