<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JournalEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JournalEntryController extends Controller
{
    public function index(Request $request)
    {
        $entries = $request->user()->journalEntries()
            ->orderBy('entry_date', 'desc')
            ->get();
        return response()->json($entries);
    }

    public function store(Request $request)
    {
        $request->validate([
            'entry_date' => 'required|date',
            'mood' => 'required|string',
            'text' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        $entry = new JournalEntry($request->only(['entry_date', 'mood', 'text']));
        $entry->user_id = $request->user()->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('journal-images', 'public');
            $entry->image_path = $path;
        }

        $entry->save();
        return response()->json($entry, 201);
    }

    public function show(Request $request, JournalEntry $journalEntry)
    {
        if ($journalEntry->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json($journalEntry);
    }

    public function update(Request $request, JournalEntry $journalEntry)
    {
        if ($journalEntry->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'entry_date' => 'required|date',
            'mood' => 'required|string',
            'text' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        $journalEntry->fill($request->only(['entry_date', 'mood', 'text']));

        if ($request->hasFile('image')) {
            if ($journalEntry->image_path) {
                Storage::disk('public')->delete($journalEntry->image_path);
            }
            $path = $request->file('image')->store('journal-images', 'public');
            $journalEntry->image_path = $path;
        }

        $journalEntry->save();
        return response()->json($journalEntry);
    }

    public function destroy(Request $request, JournalEntry $journalEntry)
    {
        if ($journalEntry->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($journalEntry->image_path) {
            Storage::disk('public')->delete($journalEntry->image_path);
        }

        $journalEntry->delete();
        return response()->json(null, 204);
    }
} 