import { supabase } from "@/lib/supabase";
import { QURAN_CHAPTERS, RECITERS } from "@/data/quranData";
import { toast } from "@/components/ui/use-toast";

export interface SavedFavorite {
  id: number;
  user_id: string;
  surah_id: number;
  created_at: string;
}

// Fetch user's favorite surahs
export async function getFavoriteSurahs(userId: string): Promise<number[]> {
  try {
    const { data, error } = await supabase
      .from('quran_favorites')
      .select('surah_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data ? data.map(item => item.surah_id) : [];
  } catch (error) {
    console.error('Error fetching favorite surahs:', error);
    return [];
  }
}

// Toggle favorite status of a surah
export async function toggleFavoriteSurah(userId: string, surahId: number): Promise<boolean> {
  try {
    // Check if already favorited
    const { data: existingFavorite, error: checkError } = await supabase
      .from('quran_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('surah_id', surahId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    // If already favorited, remove it
    if (existingFavorite) {
      const { error: deleteError } = await supabase
        .from('quran_favorites')
        .delete()
        .eq('id', existingFavorite.id);

      if (deleteError) throw deleteError;
      
      const surah = QURAN_CHAPTERS.find(s => s.id === surahId);
      toast({
        title: "Removed from favorites",
        description: `${surah?.englishName} has been removed from your favorites.`,
      });
      
      return false;
    } 
    // Otherwise, add it
    else {
      const { error: insertError } = await supabase
        .from('quran_favorites')
        .insert([{ user_id: userId, surah_id: surahId }]);

      if (insertError) throw insertError;
      
      const surah = QURAN_CHAPTERS.find(s => s.id === surahId);
      toast({
        title: "Added to favorites",
        description: `${surah?.englishName} has been added to your favorites.`,
      });
      
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite surah:', error);
    toast({
      title: "Action failed",
      description: "There was a problem updating your favorites.",
      variant: "destructive"
    });
    return false;
  }
}

// Get audio URL based on reciter and surah
export function getAudioUrl(reciterId: number, surahId: number): string {
  const reciter = RECITERS.find(r => r.id === reciterId);
  const surahNumber = surahId.toString().padStart(3, '0');
  
  if (reciter?.baseUrl) {
    return `${reciter.baseUrl}${surahNumber}.mp3`;
  }
  
  // Fallback to Mishari Rashid al-Afasy if reciter not found
  return `https://server8.mp3quran.net/afs/${surahNumber}.mp3`;
}
