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
        $totalGratitudePrompts = GratitudePrompt::count(); // Let's add this as well

        return response()->json([
            'total_users' => $totalUsers,
            'total_journal_entries' => $totalJournalEntries,
            'total_mood_logs' => $totalMoodLogs,
            'total_exercises' => $totalExercises,
            'total_gratitude_prompts' => $totalGratitudePrompts,
        ]);
    }

    /**
     * Display a listing of all users for the admin.
     */
    public function listUsers()
    {
        return User::latest()->get();
    }
}