import type { ResumeStudioState } from "../types/resume";

const API_BASE_URL = String(import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4000").replace(
  /\/$/,
  ""
);

export interface ApiUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
}

export interface WorkspacePayload {
  id: string;
  userId: string;
  data: Partial<ResumeStudioState>;
  createdAt: string;
  updatedAt: string;
}

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function request<T>(
  path: string,
  options: {
    method?: string;
    token?: string | null;
    body?: unknown;
  } = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    const message =
      typeof payload === "object" &&
      payload !== null &&
      "message" in payload &&
      typeof (payload as { message?: unknown }).message === "string"
        ? ((payload as { message: string }).message)
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export const authApi = {
  register(input: { email: string; password: string; name?: string }) {
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      body: input,
    });
  },
  login(input: { email: string; password: string }) {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: input,
    });
  },
  me(token: string) {
    return request<{ user: ApiUser }>("/me", {
      token,
    });
  },
};

export const workspaceApi = {
  get(token: string) {
    return request<{ workspace: WorkspacePayload }>("/workspace", {
      token,
    });
  },
  save(token: string, data: ResumeStudioState) {
    return request<{ workspace: WorkspacePayload }>("/workspace", {
      method: "PUT",
      token,
      body: { data },
    });
  },
};

