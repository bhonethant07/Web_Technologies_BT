<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\JournalEntry;

class JournalTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_journal_entry()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson('/api/journal', [
            'entry_text' => 'Today I am grateful for...',
            'mood' => 'Happy',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['id', 'entry_text', 'mood']);
    }

    public function test_user_can_fetch_journal_entries()
    {
        // Create a user
        $user = User::factory()->create();
        $this->actingAs($user);
        
        // Create a test journal entry for the user
        JournalEntry::create([
            'user_id' => $user->id,
            'entry_text' => 'Test journal entry',
            'mood' => 'Happy'
        ]);
    
        $response = $this->getJson('/api/journal');
    
        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'entry_text', 'mood']]);
    }

    public function test_user_cannot_create_journal_entry_with_invalid_data()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson('/api/journal', [
            'entry_text' => '',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['entry_text', 'mood']);
    }
}