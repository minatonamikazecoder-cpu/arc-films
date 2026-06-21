import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
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
            signOut: async () => ({ error: null }),
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

  return createBrowserClient(url, anonKey)
}
