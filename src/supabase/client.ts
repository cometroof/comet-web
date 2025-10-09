import { createClient } from "@supabase/supabase-js";
import { type Database } from "./supabase";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
export default supabaseClient;
