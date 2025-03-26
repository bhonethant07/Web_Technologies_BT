<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\JournalEntry;
use App\Models\MindfulnessExercise;
use App\Models\GratitudePrompt;
use App\Models\Activity;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'totalUsers' => User::count(),
            'totalJournalEntries' => JournalEntry::count(),
            'totalMindfulnessExercises' => MindfulnessExercise::count(),
            'totalGratitudePrompts' => GratitudePrompt::count(),
            'recentActivities' => Activity::with('user')
                ->latest()
                ->take(5)
                ->get(),
        ];

        return view('admin.dashboard', $data);
    }
}
