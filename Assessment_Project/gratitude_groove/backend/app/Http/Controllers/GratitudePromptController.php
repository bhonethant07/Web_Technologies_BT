<?php

namespace App\Http\Controllers;

use App\Models\GratitudePrompt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GratitudePromptController extends Controller
{
    /**
     * Display a listing of the gratitude prompts for admins.
     */
    public function index()
    {
        return GratitudePrompt::latest()->get();
    }

    /**
     * Store a newly created gratitude prompt in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prompt_text' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $prompt = GratitudePrompt::create($request->all());

        return response()->json($prompt, 201);
    }

    /**
     * Display the specified gratitude prompt.
     */
    public function show(GratitudePrompt $gratitudePrompt)
    {
        return response()->json($gratitudePrompt);
    }

    /**
     * Update the specified gratitude prompt in storage.
     */
    public function update(Request $request, GratitudePrompt $gratitudePrompt)
    {
        $validator = Validator::make($request->all(), [
            'prompt_text' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $gratitudePrompt->update($request->all());

        return response()->json($gratitudePrompt, 200);
    }

    /**
     * Remove the specified gratitude prompt from storage.
     */
    public function destroy(GratitudePrompt $gratitudePrompt)
    {
        $gratitudePrompt->delete();

        return response()->json(['message' => 'Gratitude prompt deleted successfully'], 204);
    }
}