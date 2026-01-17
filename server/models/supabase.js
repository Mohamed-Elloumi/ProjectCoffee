const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://cazxekbsirbsegiixvyr.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_KuagDIU182oxdx95tFkE8A_pFoxHukF';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
