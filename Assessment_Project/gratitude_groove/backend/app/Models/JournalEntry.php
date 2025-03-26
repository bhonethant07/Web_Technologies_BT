<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JournalEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'entry_date',
        'mood',
        'text',
        'image_path'
    ];

    protected $casts = [
        'entry_date' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 