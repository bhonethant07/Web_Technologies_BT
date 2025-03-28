<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JournalEntryController;
use App\Http\Controllers\MoodLogController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\GratitudePromptController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/register', [AuthController::class, 'adminRegister']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/journal', [JournalEntryController::class, 'store']);
    Route::get('/journal', [JournalEntryController::class, 'index']);
    Route::post('/mood', [MoodLogController::class, 'store']);
    Route::get('/exercises', [ExerciseController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
    Route::get('/admin/users', [AdminDashboardController::class, 'listUsers']);
    // Admin Exercise Management Routes
    Route::post('/admin/exercises', [ExerciseController::class, 'store']);
    Route::get('/admin/exercises', [ExerciseController::class, 'adminIndex']);
    Route::get('/admin/exercises/{exercise}', [ExerciseController::class, 'show']);
    Route::put('/admin/exercises/{exercise}', [ExerciseController::class, 'update']);
    Route::delete('/admin/exercises/{exercise}', [ExerciseController::class, 'destroy']);

    // Admin Gratitude Prompt Management Routes
    Route::post('/admin/prompts', [GratitudePromptController::class, 'store']);
    Route::get('/admin/prompts', [GratitudePromptController::class, 'index']);
    Route::get('/admin/prompts/{gratitude_prompt}', [GratitudePromptController::class, 'show']);
    Route::put('/admin/prompts/{gratitude_prompt}', [GratitudePromptController::class, 'update']);
    Route::delete('/admin/prompts/{gratitude_prompt}', [GratitudePromptController::class, 'destroy']);
});