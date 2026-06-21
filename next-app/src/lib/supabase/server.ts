import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
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

  const cookieStore = await cookies()

  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
