import { createClient } from '@supabase/supabase-js';

// আসল URL এবং Key ফলব্যাক হিসেবে দেওয়া হলো যাতে Vercel বিল্ড কখনো ফেইল না করে
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://curpreayohugiphiywyd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_-XoLYA-Li2XYXMopCeh1aw_8xuzc90C';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);