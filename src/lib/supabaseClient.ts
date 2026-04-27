import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bwxelegcuipjhntjzkth.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eGVsZWdjdWlwamhudGp6a3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNjk2MDksImV4cCI6MjA5Mjg0NTYwOX0.2H1I54Pa3vjwLwfQJcppFD1GIPi9wth-7dGeh9BzM9A";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
