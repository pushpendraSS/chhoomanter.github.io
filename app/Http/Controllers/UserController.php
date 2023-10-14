<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // UserController.php

    public function index() {
        return User::with('roles')->get();
    }

    public function store(Request $request) {
        $data = $request->validate([
            'email' => 'required|unique:users,email',
            'full_name' => 'required',
            'roles' => 'required|array',
        ]);


        $user = User::create([
            'email' => $data['email'],
            'full_name' => $data['full_name'],
        ]);

        $user->roles()->attach($data['roles']);

        return response()->json(['message' => 'User created!']);
    }

    
}
