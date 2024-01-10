interface Config {
  apiBaseUrl: string;
  googleClientId: string;
  googleCLientSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  googleClientId: process.env.GOOGlE_CLIENT_ID || "",
  googleCLientSecret: process.env.GOOGlE_CLIENT_SECRET || "",
};
