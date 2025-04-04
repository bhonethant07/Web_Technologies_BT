<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\GratitudePrompt;
use App\Models\JournalEntry;
use App\Models\MoodLog;
use App\Models\User;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $totalUsers = User::count();
        $totalJournalEntries = JournalEntry::count();
        $totalMoodLogs = MoodLog::count();
        $totalExercises = Exercise::count();
        $totalGratitudePrompts = GratitudePrompt::count();

        return response()->json([
            'total_users' => $totalUsers,
            'total_journal_entries' => $totalJournalEntries,
            'total_mood_logs' => $totalMoodLogs,
            'total_exercises' => $totalExercises,
            'total_gratitude_prompts' => $totalGratitudePrompts,
            'admin' => $request->user(),
        ]);
    }

    /**
     * Display a listing of all users for the admin.
     */
    public function listUsers()
    {
        return User::latest()->get();
    }

    /**
     * Display the details of a specific user.
     */
    public function showUser(User $user)
    {
        return response()->json($user);
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroyUser(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 204);
    }
}