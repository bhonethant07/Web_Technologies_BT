<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JournalEntryController;
use App\Http\Controllers\MoodLogController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\GratitudePromptController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\DashboardController;
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
    Route::post('/logout', [AuthController::class, 'logout']);

    // User profile routes
    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::put('/profile', [UserProfileController::class, 'update']);
    Route::post('/profile/upload', [UserProfileController::class, 'uploadWithImage']);

    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/admin/register', [AuthController::class, 'adminRegister']);
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
    Route::get('/admin/profile', [AuthController::class, 'adminProfile']);
    Route::put('/admin/profile', [AuthController::class, 'updateAdminProfile']);
    Route::patch('/admin/password', [AuthController::class, 'updateAdminPassword']);
    Route::get('/admin/users', [AdminDashboardController::class, 'listUsers']);
    Route::get('/admin/users/{user}', [AdminDashboardController::class, 'showUser']);
    Route::delete('/admin/users/{user}', [AdminDashboardController::class, 'destroyUser']);
    Route::post('/admin/users/{user}/reset-password', [AdminDashboardController::class, 'resetPassword']);

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