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
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'interests' => 'nullable|string',
            'gratitude_goals' => 'nullable|string',
            'grateful_for' => 'nullable|string',
            'favorite_quote' => 'nullable|string',
            'how_gratitude_feels' => 'nullable|string',
            'profile_image' => 'nullable|image|max:2048', // Accept image files up to 2MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        $profileData = [];

        // Basic user information
        if ($request->has('name')) {
            $profileData['name'] = $request->name;
        }

        if ($request->has('email')) {
            $profileData['email'] = $request->email;
        }

        // Password update
        if ($request->filled('password')) {
            $profileData['password'] = bcrypt($request->password);
        }

        // Additional profile fields
        $additionalFields = [
            'bio', 'location', 'interests', 'gratitude_goals',
            'grateful_for', 'favorite_quote', 'how_gratitude_feels'
        ];

        foreach ($additionalFields as $field) {
            if ($request->has($field)) {
                $profileData[$field] = $request->$field;
            }
        }

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

        // Add profile image URL directly to user data
        $userData = $user->toArray();
        $imageUrl = $user->profile_image ? url('storage/' . $user->profile_image) : null;
        $userData['profile_image_url'] = $imageUrl;

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $userData,
            'profile_completed' => $user->hasCompletedProfile(),
            'image_url' => $imageUrl
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

        // Add profile image URL directly to user data
        $userData = $user->toArray();
        $imageUrl = $user->profile_image ? url('storage/' . $user->profile_image) : null;
        $userData['profile_image_url'] = $imageUrl;

        return response()->json([
            'user' => $userData,
            'profile_completed' => $user->hasCompletedProfile(),
            'image_url' => $imageUrl
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
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'interests' => 'nullable|string',
            'gratitude_goals' => 'nullable|string',
            'grateful_for' => 'nullable|string',
            'favorite_quote' => 'nullable|string',
            'how_gratitude_feels' => 'nullable|string',
            'profile_image' => 'required|image|max:2048', // Require image file
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $request->user();
        $profileData = [];

        // Basic user information
        if ($request->has('name')) {
            $profileData['name'] = $request->name;
        }

        if ($request->has('email')) {
            $profileData['email'] = $request->email;
        }

        // Password update
        if ($request->filled('password')) {
            $profileData['password'] = bcrypt($request->password);
        }

        // Additional profile fields
        $additionalFields = [
            'bio', 'location', 'interests', 'gratitude_goals',
            'grateful_for', 'favorite_quote', 'how_gratitude_feels'
        ];

        foreach ($additionalFields as $field) {
            if ($request->has($field)) {
                $profileData[$field] = $request->$field;
            }
        }

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

        // Add profile image URL directly to user data
        $userData = $user->toArray();
        $imageUrl = $user->profile_image ? url('storage/' . $user->profile_image) : null;
        $userData['profile_image_url'] = $imageUrl;

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $userData,
            'profile_completed' => $user->hasCompletedProfile(),
            'image_url' => $imageUrl
        ]);
    }
}
