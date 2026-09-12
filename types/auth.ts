export type UserRole = "customer" | "admin";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
}

export interface AuthResponse {
  data: {
    user: PublicUser;
    accessToken: string;
  };
}

export interface MeResponse {
  data: PublicUser;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
