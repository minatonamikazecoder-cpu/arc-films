import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// This is a strictly public, anonymous client meant ONLY for Server Components 
// that do NOT need user authentication (like public portfolio data).
// By avoiding `cookies()`, Next.js 15 can statically prerender these pages at build time.
export function createPublicClient(): any {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!url || !anonKey) {
    const createQueryPromise = (): any => {
      const promise = Promise.resolve({ data: [], error: null })
      return new Proxy(promise, {
        get(target, prop) {
          if (prop === 'then') return target.then.bind(target)
          if (prop === 'catch') return target.catch.bind(target)
          if (prop === 'finally') return target.finally.bind(target)
          return () => createQueryPromise()
        }
      })
    }

    return new Proxy({}, {
      get(target, prop) {
        if (prop === 'from') return () => createQueryPromise()
        return createQueryPromise()
      }
    })
  }

  return createSupabaseClient(url, anonKey, {
    auth: {
      persistSession: false,
    }
  })
}
