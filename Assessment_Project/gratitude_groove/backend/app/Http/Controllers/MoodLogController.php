<?php

namespace App\Http\Controllers;

use App\Models\MoodLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MoodLogController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mood' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if user has already logged a mood today
        $existingMoodLog = MoodLog::where('user_id', $request->user()->id)
            ->whereDate('created_at', now()->toDateString())
            ->first();

        if ($existingMoodLog) {
            return response()->json([
                'message' => 'You have already logged your mood for today. You can log your mood again tomorrow.',
                'mood_log' => $existingMoodLog
            ], 400);
        }

        $moodLog = MoodLog::create([
            'user_id' => $request->user()->id,
            'mood' => $request->mood,
        ]);

        return response()->json($moodLog, 201);
    }
}