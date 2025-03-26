<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MindfulnessExercise;
use Illuminate\Http\Request;

class MindfulnessExerciseController extends Controller
{
    public function index()
    {
        $exercises = MindfulnessExercise::orderBy('created_at', 'desc')->get();
        return response()->json($exercises);
    }

    public function show(MindfulnessExercise $mindfulnessExercise)
    {
        return response()->json($mindfulnessExercise);
    }
} 