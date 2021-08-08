<?php

namespace App\Http\Controllers\ApiForFrontEndFrameworks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// Manual Import Dependencies via namespaces;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class SanctumAuth extends Controller {
  public function triggered_state_from_react_register_gui_form(Request $request) {
    $validator = validator::make($request->all(), [
      'name' => 'required|max:191',
      'email' => 'required|string|email|max:255|unique:users',
      'password' => 'required|min:8'
    ]);

    if ($validator->fails()) {
      return response()->json([
        'validation_errors' => $validator->messages()
      ]);
    } else {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password)
      ]);

      $apiTokenGeneratedBySanctum = $user->createToken($user->email.'_Token')->plainTextToken;

      return response()->json([
        'status' => 200,
        'username' => $user->name,
        'tokenFromThisResponse' => $apiTokenGeneratedBySanctum,
        'message' => 'Registered Successfully'
      ]);
    }

  }

  public function triggered_state_from_react_login_gui_form(Request $request) {
    $validator = validator::make($request->all(), [
      'email' => 'required|max:191',
      'password' => 'required'
    ]);

    if ($validator->fails()) {
      return response()->json([
        'validation_errors' => $validator->messages()
      ]);
    }

    $credentialFields = request(['email', 'password']);

    $userModelDB = User::where('email', $request->email)->first();

    $laravelHashMakeMethod = $userModelDB->password;
    if (password_verify($request->password, $laravelHashMakeMethod)) {
      // return response()->json([
      //   'status_code' => 422,
      //   'message' => 'Password Match',
      // ]);

      if ($userModelDB->role === 'admin') {
        $authorizationRoles = $userModelDB->role;
        $apiTokenGeneratedBySanctum = $userModelDB->createToken($userModelDB->email.'_AdminRoleToken', ['server:admin'])->plainTextToken;


        //$apiTokenGeneratedBySanctum = $userModelDB->createToken($userModelDB->email.'_AdminRoleToken', ['server:admin'])->plainTextToken;
      } else {
        $authorizationRoles = $userModelDB->role;
        $apiTokenGeneratedBySanctum = $userModelDB->createToken($userModelDB->email.'_Token', [''])->plainTextToken;
      }

      return response()->json([
        'status' => 200,
        'username' => $userModelDB->name,
        'tokenFromThisResponse' => $apiTokenGeneratedBySanctum,
        'message' => 'Logged In Successfully',
        'session_role' => $authorizationRoles
      ]);
    } else {
      return response()->json([
        'status' => 401,
        'message' => 'Invalid Credentials'
      ]);
    }

    // if(!Hash::check($request->password, $user->password, [])){
      //if (! $user || Hash::check($request->password, $user->password))
    // }

  }
  public function triggered_state_from_react_logout_button(Request $request){
    auth()->user()->tokens()->delete();
    return response()->json([
      'status' => 200,
      'message' => 'Logged Out Successfully'
    ]);

  }
}
