<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class MoodTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_log_mood()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson('/api/mood', [
            'mood' => 'Happy',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'mood']);
    }

    public function test_user_cannot_log_mood_with_invalid_data()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson('/api/mood', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['mood']);
    }
}