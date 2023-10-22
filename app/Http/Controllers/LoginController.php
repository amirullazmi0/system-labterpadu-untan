<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            // The user is logged in...
            if (auth()->user()->level == '0') {
                return redirect()->intended('/admin')->with('login', 'Anda Sudah login !');
            } elseif (auth()->user()->level == '1') {
                return redirect()->intended('/aadmin')->with('login', 'Anda Sudah login !');
            };
        }
        return Inertia::render('Login/Login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            if (auth()->user()->level == '0') {
                return redirect()->intended('/super');
            } elseif (auth()->user()->level == '1') {
                return redirect()->intended('/aadmin');
            }

            return redirect()->intended('/super');
        };

        // dd("GAGAL");
        return back()->with('error', 'Login Failed !');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }

    public function register()
    {
        return view('login.register', [
            "title" => "register",
        ]);
    }
    public function storedosen(Request $request)
    {
        // dd($request);
        $validatedData = $request->validate([
            'nip' => 'required|min:1|max:25|unique:users',
            'name' => 'required|max:50|unique:users',
            'password' => 'required|min:5|max:25',
            'level' => 'required',
            'lab_id' => 'required',
            'email' => 'required|email:dns',
            'photo' => 'image|file|max:2048',
            'address' => 'nullable'
        ]);


        if ($request->file('photo')) {
            // $validatedData['photo'] = $request->file('photo')->store('/img/user');
            $fileName = time() . '.' . $request->file('photo')->extension();
            $path_url = '../public/storage/img/user';
            $request->file('photo')->move(public_path($path_url), $fileName);
            $validateData['photo'] =  'img/user/' . $fileName;
        }

        $validatedData['password'] = Hash::make($validatedData['password']);

        User::create($validatedData);

        return redirect('/admin/dosen')->with('success', 'Add Dosen Success !!');
    }
    public function storelaboran(Request $request)
    {

        $validatedData = $request->validate([
            'nip' => 'required|min:1|max:25|unique:users',
            'name' => 'required|max:50|unique:users',
            'password' => 'required|min:5|max:25',
            'level' => 'required',
            'lab_id' => 'required',
            'email' => 'required|email:dns',
            'photo' => 'image|file|max:2048',
            'address' => 'nullable'
        ]);

        if ($request->file('photo')) {
            // $validatedData['photo'] = $request->file('photo')->store('/img/user');
            $fileName = time() . '.' . $request->file('photo')->extension();
            $path_url = '../public/storage/img/user';
            $request->file('photo')->move(public_path($path_url), $fileName);
            $validateData['photo'] =  'img/user/' . $fileName;
        }
        // $validatedData['password'] = bcrypt($validatedData['password']);
        $validatedData['password'] = Hash::make($validatedData['password']);

        User::create($validatedData);

        return redirect('/admin/laboran')->with('success', 'Add Laboran Success !!');
    }
}
