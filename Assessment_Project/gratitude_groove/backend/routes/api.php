<?php

    use App\Http\Controllers\AuthController;
    use App\Http\Controllers\JournalEntryController;
    use App\Http\Controllers\MoodLogController;
    use App\Http\Controllers\ExerciseController;
    use Illuminate\Support\Facades\Route;

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/journal', [JournalEntryController::class, 'store']);
        Route::get('/journal', [JournalEntryController::class, 'index']);
        Route::post('/mood', [MoodLogController::class, 'store']);
        Route::get('/exercises', [ExerciseController::class, 'index']);
    });

?>