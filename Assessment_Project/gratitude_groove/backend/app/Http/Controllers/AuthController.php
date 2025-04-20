<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 201);
    }

    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password) || $user->role === 'admin') {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    /**
     * Handle user logout (optional, for API-based logout).
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function adminRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users', // Note: unique:users, as admins are also users now
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => User::ROLE_ADMIN, // Set the role to 'admin'
        ]);

        $token = $admin->createToken('admin_auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer', 'admin' => $admin], 201);
    }

    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid input', 'errors' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid admin login credentials'], 401);
        }

        $admin = User::where('email', $request['email'])->where('role', User::ROLE_ADMIN)->first();
        
        if (!$admin) {
            Auth::logout();
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $token = $admin->createToken('admin_auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'admin' => $admin
        ], 200);
    }

    public function admin(Request $request)
    {
        if ($request->user()->isAdmin()) {
            return $request->user();
        }
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function adminProfile(Request $request)
{
    return response()->json($request->user());
}

public function updateAdminProfile(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id,
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => $validator->errors()], 422);
    }

    $request->user()->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    return response()->json(['message' => 'Profile updated successfully'], 200);
}

public function updateAdminPassword(Request $request)
{
    $validator = Validator::make($request->all(), [
        'current_password' => 'required|string',
        'password' => 'required|string|min:8|confirmed',
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => $validator->errors()], 422);
    }

    if (!Hash::check($request->current_password, $request->user()->password)) {
        return response()->json(['message' => 'Incorrect current password'], 401);
    }

    $request->user()->update([
        'password' => Hash::make($request->password),
    ]);

    return response()->json(['message' => 'Password updated successfully'], 200);
}
}