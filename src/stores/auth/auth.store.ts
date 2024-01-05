import { StateCreator, create } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.services";
import { devtools, persist } from "zustand/middleware";
import { customSessionStorage } from "../../storage/session.storage";

export interface AuthState {
  status: AuthStatus;
  user?: User;
  token?: string;

  login: (email: string, password: string) => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthorized",
  token: undefined,
  user: undefined,

  login: async(email: string, password: string) => {
    const { token, ...user } = await AuthService.login(email, password);

    set({status: "authorized", token, user})

  }
})

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeApi,
      {name: "auth-store", storage: customSessionStorage}
    )
  )
);

