<?php

namespace Database\Seeders;

use App\Models\GratitudePrompt;
use Illuminate\Database\Seeder;

class GratitudePromptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GratitudePrompt::create(['prompt_text' => 'What are three things you are grateful for today?']);
        GratitudePrompt::create(['prompt_text' => 'Who is someone you appreciate and why?']);
        GratitudePrompt::create(['prompt_text' => 'Describe a positive experience you had recently.']);
        GratitudePrompt::create(['prompt_text' => 'What is something you are looking forward to?']);
        GratitudePrompt::create(['prompt_text' => 'What is a skill or talent you are grateful to have?']);
        // Add more prompts as you see fit
    }
}