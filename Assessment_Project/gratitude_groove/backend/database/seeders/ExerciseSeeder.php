<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Exercise::create([
            'title' => 'Deep Breathing Exercise',
            'description' => 'A simple yet powerful exercise to calm your mind and reduce stress. Focus on slow, deep breaths in and out.',
            'audio_url' => null, // You can add audio file URLs later
        ]);

        Exercise::create([
            'title' => 'Body Scan Meditation',
            'description' => 'Bring awareness to different parts of your body, noticing any sensations without judgment. This helps increase body awareness and relaxation.',
            'audio_url' => null,
        ]);

        Exercise::create([
            'title' => 'Mindful Observation',
            'description' => 'Choose an object around you and observe it with all your senses, as if you are seeing it for the first time. This cultivates present moment awareness.',
            'audio_url' => null,
        ]);

        Exercise::create([
            'title' => 'Loving-Kindness Meditation',
            'description' => 'Silently repeat phrases of goodwill and kindness towards yourself, loved ones, and even those you find challenging.',
            'audio_url' => null,
        ]);

        Exercise::create([
            'title' => 'Gratitude Meditation',
            'description' => 'Take a few moments to reflect on things you are grateful for. Feel the sense of appreciation in your heart.',
            'audio_url' => null,
        ]);
    }
}