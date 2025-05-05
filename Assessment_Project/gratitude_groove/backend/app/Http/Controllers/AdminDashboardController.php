<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\GratitudePrompt;
use App\Models\JournalEntry;
use App\Models\MoodLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $totalUsers = User::count();
        $totalJournalEntries = JournalEntry::count();
        $totalMoodLogs = MoodLog::count();
        $totalExercises = Exercise::count();
        $totalGratitudePrompts = GratitudePrompt::count();

        // Calculate mood distribution
        $moodDistribution = $this->calculateMoodDistribution();

        return response()->json([
            'total_users' => $totalUsers,
            'total_journal_entries' => $totalJournalEntries,
            'total_mood_logs' => $totalMoodLogs,
            'total_exercises' => $totalExercises,
            'total_gratitude_prompts' => $totalGratitudePrompts,
            'admin' => $request->user(),
            'stats' => [
                'moodDistribution' => $moodDistribution
            ]
        ]);
    }

    /**
     * Display a listing of all users for the admin, separated by role.
     */
    public function listUsers()
    {
        $admins = User::where('role', 'admin')->latest()->get();
        $normalUsers = User::where('role', 'user')->latest()->get();

        return response()->json([
            'admins' => $admins,
            'normalUsers' => $normalUsers,
        ]);
    }

    /**
     * Display the details of a specific user.
     */
    public function showUser(User $user)
    {
        return response()->json($user);
    }

    /**
     * Reset the password for another admin user.
     */
    public function resetPassword(Request $request, User $user)
    {
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Cannot reset password for non-admin users.'], 403);
        }

        $newPassword = 'test@2025';
        $user->password = Hash::make($newPassword);
        $user->save();

        return response()->json(['message' => 'Admin password reset successfully to: ' . $newPassword], 200);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroyUser(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 204);
    }

    /**
     * Calculate the distribution of moods across all mood logs.
     *
     * @return array
     */
    private function calculateMoodDistribution()
    {
        // Get all mood logs - both from MoodLog and JournalEntry
        $moodLogs = MoodLog::all();
        $journalEntries = JournalEntry::whereNotNull('mood')->get();

        // Initialize the distribution array
        $distribution = [];

        // Count occurrences of each mood from MoodLog
        foreach ($moodLogs as $log) {
            $mood = $log->mood;
            if (!isset($distribution[$mood])) {
                $distribution[$mood] = 0;
            }
            $distribution[$mood]++;
        }

        // Count occurrences of each mood from JournalEntry
        foreach ($journalEntries as $entry) {
            $mood = $entry->mood;
            if (!isset($distribution[$mood])) {
                $distribution[$mood] = 0;
            }
            $distribution[$mood]++;
        }

        // Sort by count (descending)
        arsort($distribution);

        // If no data, add a placeholder
        if (empty($distribution)) {
            $distribution = [
                'No Data' => 1
            ];
        }

        return $distribution;
    }
}