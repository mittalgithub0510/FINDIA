import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('[FINDIA Supabase] Failed to initialize Supabase client:', error.message);
    supabase = createGracefulFallbackClient();
  }
} else {
  console.warn(
    '[FINDIA Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n' +
    'Running with a graceful fallback client for local development. Supabase calls will return empty results.'
  );
  supabase = createGracefulFallbackClient();
}

/**
 * Creates a recursive proxy client that fails gracefully without throwing unhandled errors
 * when Supabase credentials have not been configured yet.
 */
function createGracefulFallbackClient() {
  const createMockChain = () => {
    const chainHandler = {
      get(target, prop) {
        if (prop === 'then') {
          // Allow await to resolve to empty response
          return (resolve) => resolve({ data: null, error: new Error('Supabase not configured. Check .env file.') });
        }
        if (prop === 'catch') {
          return (reject) => reject(new Error('Supabase not configured. Check .env file.'));
        }
        // Return a callable mock that continues returning the proxy chain
        return (...args) => new Proxy(() => {}, chainHandler);
      },
      apply() {
        return new Proxy(() => {}, chainHandler);
      }
    };
    return new Proxy(() => {}, chainHandler);
  };

  return new Proxy(
    {
      isMockClient: true,
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
      }
    },
    {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        }
        return (...args) => createMockChain();
      }
    }
  );
}

export { supabase };
export default supabase;
