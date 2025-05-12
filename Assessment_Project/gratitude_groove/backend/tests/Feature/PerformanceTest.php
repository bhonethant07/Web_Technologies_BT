<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class PerformanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_response_time_is_within_limit()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $start = microtime(true);
        $response = $this->getJson('/api/journal');
        $end = microtime(true);

        $response->assertStatus(200);
        $this->assertLessThan(1, $end - $start, 'API response time exceeded 1 second');
    }
}