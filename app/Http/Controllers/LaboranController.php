<?php

namespace App\Http\Controllers;

use App\Models\Lab;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;

class LaboranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:50|unique:users',
            'password' => 'required|min:5|max:25',
            'level' => 'required',
            'lab_id' => 'required',
            'email' => 'required|email:dns|unique:users',
            'address' => 'nullable'
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        // dd($validatedData);

        User::create($validatedData);

        return redirect('/super/laboran')->with('success', 'Laboran berhasil ditambah!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
        $rules = ([
            'name' => 'required|max:50',
            'level' => 'required',
            'lab_id' => 'required',
            'email' => 'required|email:dns',
            'address' => "max:255"
        ]);

        if ($request->name != $user->name) {
            $rules['name'] = 'required|max:50|unique:users';
        }

        if ($request->email != $user->email) {
            $rules['email'] = 'required|email:dns|unique:users';
        }

        $validateData = $request->validate($rules);

        User::where('id', $user->id)
            ->update($validateData);

        return redirect('/super/laboran')->with('success', 'Laboran berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, Request $request)
    {
        // dd($request->name);
        if ($user->name === $request->name) {
            User::destroy($user->id);
        }

        return back()->with('delete', 'Laboran berhasil dihapus');
    }
}
