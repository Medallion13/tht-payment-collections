const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
  async healthCheck() {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) throw new Error("Health check fail");
    return response.json();
  },
};
