<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class ErrorHandlingTest extends TestCase
{
    use RefreshDatabase;

    public function test_invalid_route_returns_404()
    {
        $response = $this->getJson('/api/invalid-route');
        $response->assertStatus(404); // Not Found
    }

    public function test_validation_errors_are_handled_properly()
    {
        // Create and authenticate a user
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson('/api/journal', [
            'entry_text' => '',
        ]);

        $response->assertStatus(422) // Validation Error
                 ->assertJsonValidationErrors(['entry_text', 'mood']);
    }
}