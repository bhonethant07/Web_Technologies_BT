<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_protected_route_requires_authentication()
    {
        $response = $this->getJson('/api/journal');
        $response->assertStatus(401); // Unauthenticated
    }

    public function test_authenticated_user_can_access_protected_route()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->getJson('/api/journal');
        $response->assertStatus(200); // Success
    }
}