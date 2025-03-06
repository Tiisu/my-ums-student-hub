
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wikxryjdybfcpdepbros.supabase.com';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpa3hyeWpkeWJmY3BkZXBicm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzEwNjAsImV4cCI6MjA1NjgwNzA2MH0.oEFOXYIsD7dQR9ErZ_vbh6vR5tspTm9ceeTIoHYSER8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
