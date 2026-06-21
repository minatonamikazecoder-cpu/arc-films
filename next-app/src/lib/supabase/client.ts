import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    if (typeof window !== 'undefined') {
      console.warn("Supabase credentials missing in browser client. NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "FOUND(Truncated)" : "MISSING");
    }
    // Return a dummy client during build time if environment variables are missing
    const createQueryPromise = (): any => {
      const promise = Promise.resolve({ data: [], error: null })
      return new Proxy(promise, {
        get(target, prop) {
          if (prop === 'then') {
            return target.then.bind(target)
          }
          if (prop === 'catch') {
            return target.catch.bind(target)
          }
          if (prop === 'finally') {
            return target.finally.bind(target)
          }
          // Return a function that returns another query promise to allow chaining
          return () => createQueryPromise()
        }
      })
    }

    const clientProxy: any = new Proxy({}, {
      get(target, prop) {
        if (prop === 'auth') {
          return {
            getUser: async () => ({ data: { user: null }, error: null }),
            getSession: async () => ({ data: { session: null }, error: null }),
            signOut: async () => ({ error: null }),
            signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
            signUp: async () => ({ data: { user: null, session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          }
        }
        if (prop === 'from') {
          return () => createQueryPromise()
        }
        return createQueryPromise()
      }
    })

    return clientProxy
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
