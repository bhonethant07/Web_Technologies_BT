<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_prompt()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin);

        $response = $this->postJson('/api/admin/prompts', [
            'prompt_text' => 'What are you grateful for today?',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'prompt_text']);
    }

    public function test_non_admin_cannot_create_prompt()
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user);

        $response = $this->postJson('/api/admin/prompts', [
            'prompt_text' => 'What are you grateful for today?',
        ]);

        $response->assertStatus(403); // Forbidden
    }
}