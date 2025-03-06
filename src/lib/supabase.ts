
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wikxryjdybfcpdepbros.supabase.com';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpa3hyeWpkeWJmY3BkZXBicm9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzEwNjAsImV4cCI6MjA1NjgwNzA2MH0.oEFOXYIsD7dQR9ErZ_vbh6vR5tspTm9ceeTIoHYSER8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create the necessary tables if this is the first time using the application
export const setupDatabase = async () => {
  try {
    // Check if quran_favorites table exists
    const { error } = await supabase
      .from('quran_favorites')
      .select('id')
      .limit(1);

    // If there's an error with the table not existing, create it
    if (error && error.code === '42P01') {
      console.log('Setting up database tables...');
      
      // You would typically do this through Supabase dashboard
      // But including this logic for completeness
      await supabase.rpc('create_tables_if_not_exist');
    }
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

// Initialize supabase when imported
setupDatabase().catch(console.error);
