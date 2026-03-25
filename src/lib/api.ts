
const API_BASE_URL = String(import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4000").replace(
  /\/$/,
  ""
);

export interface ApiUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  nickname: string | null;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: ApiUser;
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
  register(input: { email: string; password: string; firstName?: string; lastName?: string; nickname?: string }) {
    return request<AuthResponse>("/register", {
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
  updateProfile(token: string, input: { firstName?: string; lastName?: string; nickname?: string }) {
    return request<{ user: ApiUser }>("/me", {
      method: "PUT",
      token,
      body: input,
    });
  },
  updatePassword(token: string, input: { currentPassword: string; newPassword: string }) {
    return request<{ success: boolean }>("/me/password", {
      method: "PUT",
      token,
      body: input,
    });
  },
};

export interface ResumePayload {
  id: string;
  userId: string;
  title: string;
  language: string;
  templateId: string;
  pdfName: string | null;
  header: Record<string, unknown>;
  summary: Record<string, unknown>;
  experience: Record<string, unknown>;
  education: Record<string, unknown>;
  languagesData: Record<string, unknown>;
  certificates: Record<string, unknown>;
  skillsData: Record<string, unknown>;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const resumeApi = {
  list(token: string) {
    return request<{ resumes: ResumePayload[] }>("/resumes", { token });
  },
  get(token: string, id: string) {
    return request<{ resume: ResumePayload }>(`/resumes/${id}`, { token });
  },
  create(token: string, input: { 
    title?: string; 
    language?: string; 
    templateId?: string; 
    pdfName?: string; 
    header?: Record<string, unknown>; 
    summary?: Record<string, unknown>; 
    experience?: Record<string, unknown>; 
    education?: Record<string, unknown>; 
    languagesData?: Record<string, unknown>; 
    certificates?: Record<string, unknown>; 
    skillsData?: Record<string, unknown> 
  }) {
    return request<{ resume: ResumePayload }>("/resumes", {
      method: "POST",
      token,
      body: input,
    });
  },
  update(token: string, id: string, input: { 
    title?: string; 
    language?: string; 
    templateId?: string; 
    pdfName?: string | null; 
    header?: Record<string, unknown>; 
    summary?: Record<string, unknown>; 
    experience?: Record<string, unknown>; 
    education?: Record<string, unknown>; 
    languagesData?: Record<string, unknown>; 
    certificates?: Record<string, unknown>; 
    skillsData?: Record<string, unknown>;
    isActive?: boolean;
    sortOrder?: number;
  }) {
    return request<{ resume: ResumePayload }>(`/resumes/${id}`, {
      method: "PUT",
      token,
      body: input,
    });
  },
  delete(token: string, id: string) {
    return request<{ success: boolean }>(`/resumes/${id}`, {
      method: "DELETE",
      token,
    });
  },
  clone(token: string, id: string) {
    return request<{ resume: ResumePayload }>(`/resumes/${id}/clone`, {
      method: "POST",
      token,
    });
  },
};
