<?php

namespace App\Http\Controllers;

use App\Models\Ruangan;
use Illuminate\Http\Request;

class RuanganController extends Controller
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
        //
        // dd($request);
        $validateData = $request->validate([
            'name' => 'required|max:50|unique:ruangan',
            'color' => 'nullable',
            'desc' => 'nullable',
        ]);

        Ruangan::create($validateData);

        return redirect('/super/ruangan')->with('success', 'Tambah Ruangan Success!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function show(Ruangan $ruangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function edit(Ruangan $ruangan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ruangan $ruangan)
    {
        //
        $rules = ([
            'desc' => 'nullable',
            'color' => 'nullable',
        ]);

        if ($request->name != $ruangan->name) {
            $rules['name'] = 'required|max:50|unique:ruangan';
        }

        $validateData = $request->validate($rules);

        Ruangan::where('id', $ruangan->id)
            ->update($validateData);

        return redirect('/super/ruangan')->with('success', 'Edit Ruangan Success!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ruangan  $ruangan
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ruangan $ruangan, Request $request)
    {
        //
        if ($ruangan->name === $request->name) {
            Ruangan::destroy($ruangan->id);
        }

        return redirect('/super/ruangan')->with('delete', 'Ruangan berhasil dihapus!');
    }
}
