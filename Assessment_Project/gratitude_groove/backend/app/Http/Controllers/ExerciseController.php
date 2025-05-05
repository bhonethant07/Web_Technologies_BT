<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExerciseController extends Controller
{
    /**
     * Display a listing of all exercises for users.
     */
    public function index()
    {
        return Exercise::all();
    }

    /**
     * Display a listing of all exercises for admins.
     */
    public function adminIndex()
    {
        return Exercise::latest()->get();
    }

    /**
     * Store a newly created exercise in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'audio_url' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $exercise = Exercise::create($request->all());

        return response()->json($exercise, 201);
    }

    /**
     * Display the specified exercise.
     */
    public function show(Exercise $exercise)
    {
        return response()->json($exercise);
    }

    /**
     * Update the specified exercise in storage.
     */
    public function update(Request $request, Exercise $exercise)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'audio_url' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update the exercise with all the provided fields
        $exercise->update($request->only(['title', 'description', 'audio_url']));

        return response()->json($exercise, 200);
    }

    /**
     * Remove the specified exercise from storage.
     */
    public function destroy(Exercise $exercise)
    {
        $exercise->delete();

        return response()->json(['message' => 'Exercise deleted successfully'], 204);
    }
}