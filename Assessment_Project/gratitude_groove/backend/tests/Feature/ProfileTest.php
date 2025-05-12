<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_update_profile()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->putJson('/api/profile', [
            'gratitude_goals' => 'Be more mindful',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Profile updated successfully']);
    }

    public function test_user_cannot_update_profile_without_authentication()
    {
        $response = $this->putJson('/api/profile', [
            'gratitude_goals' => 'Be more mindful',
        ]);

        $response->assertStatus(401); // Unauthenticated
    }
}