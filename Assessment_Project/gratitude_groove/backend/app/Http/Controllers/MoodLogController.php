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

        $moodLog = MoodLog::create([
            'user_id' => $request->user()->id,
            'mood' => $request->mood,
        ]);

        return response()->json($moodLog, 201);
    }
}