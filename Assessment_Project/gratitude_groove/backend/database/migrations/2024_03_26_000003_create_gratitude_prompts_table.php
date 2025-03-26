<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gratitude_prompts', function (Blueprint $table) {
            $table->id();
            $table->text('prompt_text');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gratitude_prompts');
    }
}; 