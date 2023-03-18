import { createClient, FetchTransport } from "@rspc/client";
import { createReactQueryHooks } from "@rspc/react";
import { QueryClient } from "@tanstack/react-query";
import type { Procedures } from "./bindings";

const PROTOCOL = process.env.NODE_ENV === "development" ? "http" : "https"
const PATH = "api/rspc";
const HOST =
  typeof window === "undefined" ? process.env.VERCEL_URL : window.location.host;

export const client = createClient<Procedures>({
  transport: new FetchTransport(`${PROTOCOL}://${HOST}/${PATH}`),
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // If you want to retry when requests fail, remove this.
    },
  },
});

export const {
  useContext,
  useMutation,
  useQuery,
  useSubscription,
  Provider: RSPCProvider,
} = createReactQueryHooks<Procedures>();
