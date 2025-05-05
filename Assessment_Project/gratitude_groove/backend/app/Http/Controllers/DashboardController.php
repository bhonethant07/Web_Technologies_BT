<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use App\Models\MoodLog;
use App\Models\GratitudePrompt;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get aggregated dashboard data for the authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get recent journal entries (last 5)
        $recentEntries = JournalEntry::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Get mood logs for the last 60 days for the calendar view
        $recentMoods = MoodLog::where('user_id', $user->id)
            ->where('created_at', '>=', Carbon::now()->subDays(60))
            ->orderBy('created_at', 'asc')
            ->get();

        // Format the dates to ensure consistent handling in the frontend
        foreach ($recentMoods as $mood) {
            // Convert to user's local timezone if needed
            $mood->formatted_date = $mood->created_at->format('Y-m-d');
        }

        // Get a random gratitude prompt for today
        $dailyPrompt = GratitudePrompt::inRandomOrder()->first();

        // Get total counts
        $totalEntries = JournalEntry::where('user_id', $user->id)->count();
        $totalMoodLogs = MoodLog::where('user_id', $user->id)->count();

        // Get a few exercises for quick access
        $exercises = Exercise::orderBy('id')->take(3)->get();

        // Calculate current streak
        $streak = $this->calculateStreak($user->id);

        // Check if user has made an entry today
        $hasEntryToday = JournalEntry::where('user_id', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->exists();

        // Check if user has logged mood today
        $hasMoodToday = MoodLog::where('user_id', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->exists();

        // Add profile image URL if it exists
        $userData = $user->toArray();
        if ($user->profile_image) {
            $userData['profile_image_url'] = url('storage/' . $user->profile_image);
        }

        return response()->json([
            'user' => $userData,
            'recent_entries' => $recentEntries,
            'recent_moods' => $recentMoods,
            'daily_prompt' => $dailyPrompt,
            'stats' => [
                'total_entries' => $totalEntries,
                'total_mood_logs' => $totalMoodLogs,
                'current_streak' => $streak,
            ],
            'today' => [
                'has_entry' => $hasEntryToday,
                'has_mood_log' => $hasMoodToday,
            ],
            'exercises' => $exercises,
        ]);
    }

    /**
     * Calculate the current streak of consecutive days with journal entries.
     *
     * @param  int  $userId
     * @return int
     */
    private function calculateStreak($userId)
    {
        $streak = 0;
        $currentDate = Carbon::today();
        $hasEntryToday = JournalEntry::where('user_id', $userId)
            ->whereDate('created_at', $currentDate)
            ->exists();

        // If no entry today, check yesterday to continue the streak
        if (!$hasEntryToday) {
            $currentDate = $currentDate->subDay();
        }

        // Check consecutive days backwards
        while (true) {
            $hasEntry = JournalEntry::where('user_id', $userId)
                ->whereDate('created_at', $currentDate)
                ->exists();

            if ($hasEntry) {
                $streak++;
                $currentDate->subDay();
            } else {
                break;
            }
        }

        return $streak;
    }
}
