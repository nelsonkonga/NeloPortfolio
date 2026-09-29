import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function hasValue(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

export const supabase: SupabaseClient | null =
  hasValue(supabaseUrl) && hasValue(supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
