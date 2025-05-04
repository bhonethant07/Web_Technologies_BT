<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserProfileController extends Controller
{
    /**
     * Update the user's profile.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gratitude_goals' => 'required|string',
            'grateful_for' => 'required|string',
            'favorite_quote' => 'nullable|string',
            'how_gratitude_feels' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048', // Accept image files up to 2MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        $profileData = [
            'gratitude_goals' => $request->gratitude_goals,
            'grateful_for' => $request->grateful_for,
            'favorite_quote' => $request->favorite_quote,
            'how_gratitude_feels' => $request->how_gratitude_feels,
        ];

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            // Delete old image if it exists
            if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
                Storage::disk('public')->delete($user->profile_image);
            }

            // Store the new image
            $imagePath = $request->file('profile_image')->store('profile_images', 'public');
            $profileData['profile_image'] = $imagePath;
        } elseif ($request->has('remove_image') && $request->remove_image) {
            // If user wants to remove the image without uploading a new one
            if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
                Storage::disk('public')->delete($user->profile_image);
            }
            $profileData['profile_image'] = null;
        }

        $user->update($profileData);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
            'profile_completed' => $user->hasCompletedProfile(),
            'image_url' => $user->profile_image ? Storage::url($user->profile_image) : null
        ]);
    }

    /**
     * Get the user's profile.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => $user,
            'profile_completed' => $user->hasCompletedProfile(),
            'image_url' => $user->profile_image ? Storage::url($user->profile_image) : null
        ]);
    }

    /**
     * Update the user's profile with image upload.
     * This method is specifically for handling file uploads via POST request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadWithImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gratitude_goals' => 'required|string',
            'grateful_for' => 'required|string',
            'favorite_quote' => 'nullable|string',
            'how_gratitude_feels' => 'nullable|string',
            'profile_image' => 'required|image|max:2048', // Require image file
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        $profileData = [
            'gratitude_goals' => $request->gratitude_goals,
            'grateful_for' => $request->grateful_for,
            'favorite_quote' => $request->favorite_quote,
            'how_gratitude_feels' => $request->how_gratitude_feels,
        ];

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            // Delete old image if it exists
            if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
                Storage::disk('public')->delete($user->profile_image);
            }

            // Store the new image
            $imagePath = $request->file('profile_image')->store('profile_images', 'public');
            $profileData['profile_image'] = $imagePath;
        }

        $user->update($profileData);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
            'profile_completed' => $user->hasCompletedProfile(),
            'image_url' => $user->profile_image ? Storage::url($user->profile_image) : null
        ]);
    }
}
