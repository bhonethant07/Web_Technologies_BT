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
            'image_url' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $journalEntry = JournalEntry::create([
            'user_id' => $request->user()->id,
            'entry_text' => $request->entry_text,
            'mood' => $request->mood,
            'image_url' => $request->image_url,
        ]);

        return response()->json($journalEntry, 201);
    }
}