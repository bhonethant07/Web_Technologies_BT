<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GratitudePromptController;
use App\Http\Controllers\Api\JournalEntryController;
use App\Http\Controllers\Api\MindfulnessExerciseController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Journal entries routes
    Route::apiResource('journal-entries', JournalEntryController::class);

    // Mindfulness exercises routes
    Route::get('/mindfulness-exercises', [MindfulnessExerciseController::class, 'index']);
    Route::get('/mindfulness-exercises/{mindfulnessExercise}', [MindfulnessExerciseController::class, 'show']);

    // Gratitude prompts routes
    Route::get('/gratitude-prompts', [GratitudePromptController::class, 'index']);
    Route::get('/gratitude-prompts/{gratitudePrompt}', [GratitudePromptController::class, 'show']);
}); 