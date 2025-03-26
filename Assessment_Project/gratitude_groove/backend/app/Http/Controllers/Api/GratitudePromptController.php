<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GratitudePrompt;
use Illuminate\Http\Request;

class GratitudePromptController extends Controller
{
    public function index()
    {
        $prompts = GratitudePrompt::orderBy('created_at', 'desc')->get();
        return response()->json($prompts);
    }

    public function show(GratitudePrompt $gratitudePrompt)
    {
        return response()->json($gratitudePrompt);
    }
} 