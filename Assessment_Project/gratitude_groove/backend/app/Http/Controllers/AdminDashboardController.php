<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
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

        return response()->json([
            'total_users' => $totalUsers,
            'total_journal_entries' => $totalJournalEntries,
            'total_mood_logs' => $totalMoodLogs,
            'total_exercises' => $totalExercises,
        ]);
    }
}