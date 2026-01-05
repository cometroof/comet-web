import { createClient } from "@supabase/supabase-js";
import { type Database } from "./supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
export default supabaseClient;
