<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MoodLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mood',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}