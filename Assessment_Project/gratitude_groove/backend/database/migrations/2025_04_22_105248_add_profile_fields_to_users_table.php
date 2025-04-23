<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('gratitude_goals')->nullable();
            $table->text('grateful_for')->nullable();
            $table->text('favorite_quote')->nullable();
            $table->text('how_gratitude_feels')->nullable();
            $table->string('profile_image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'gratitude_goals',
                'grateful_for',
                'favorite_quote',
                'how_gratitude_feels',
                'profile_image',
            ]);
        });
    }
};