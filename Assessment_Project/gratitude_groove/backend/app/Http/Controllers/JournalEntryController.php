<?php

namespace App\Http\Controllers;

use App\Models\JournalEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JournalEntryController extends Controller
{
    public function index(Request $request)
    {
        return JournalEntry::where('user_id', $request->user()->id)->latest()->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'entry_text' => 'required|string',
            'mood' => 'required|string',
            'image' => 'nullable|image|max:5120', // Allow image uploads up to 5MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = [
            'user_id' => $request->user()->id,
            'entry_text' => $request->entry_text,
            'mood' => $request->mood,
        ];

        // Handle image upload if present
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('journal_images', 'public');
            $data['image_url'] = url('storage/' . $imagePath);
        }

        $journalEntry = JournalEntry::create($data);

        return response()->json($journalEntry, 201);
    }

    public function show(Request $request, JournalEntry $journal_entry)
    {
        // Check if the journal entry belongs to the authenticated user
        if ($journal_entry->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($journal_entry);
    }

    public function update(Request $request, JournalEntry $journal_entry)
    {
        // Check if the journal entry belongs to the authenticated user
        if ($journal_entry->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'entry_text' => 'required|string',
            'mood' => 'required|string',
            'image' => 'nullable|image|max:5120', // Allow image uploads up to 5MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = [
            'entry_text' => $request->entry_text,
            'mood' => $request->mood,
        ];

        // Handle image upload if present
        if ($request->hasFile('image')) {
            // Delete old image if it exists and is stored locally
            if ($journal_entry->image_url && strpos($journal_entry->image_url, '/storage/journal_images/') !== false) {
                $oldPath = str_replace(url('storage/'), '', $journal_entry->image_url);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }

            $imagePath = $request->file('image')->store('journal_images', 'public');
            $data['image_url'] = url('storage/' . $imagePath);
        }

        $journal_entry->update($data);

        return response()->json($journal_entry);
    }

    public function destroy(Request $request, JournalEntry $journal_entry)
    {
        // Check if the journal entry belongs to the authenticated user
        if ($journal_entry->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $journal_entry->delete();

        return response()->json(['message' => 'Journal entry deleted successfully']);
    }
}