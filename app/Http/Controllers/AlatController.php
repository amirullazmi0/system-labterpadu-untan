<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\Ruangan;
use Illuminate\Http\Request;

class AlatController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validateData = $request->validate([
            'name' => 'required|max:50|unique:alat',
            'total' => 'required|integer',
            'color' => 'nullable',
        ]);

        $validateData['lab_id'] = auth()->user()->lab_id;

        Alat::create($validateData);

        return redirect('/admin/alat')->with('success', 'Tambah Alat Berhasil!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Alat  $alat
     * @return \Illuminate\Http\Response
     */
    public function show(Alat $alat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Alat  $alat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Alat $alat)
    {
        //
        $rules = ([
            'total' => "required|integer",
            'color' => 'nullable',
        ]);

        if ($request->name != $alat->name) {
            $rules['name'] = 'required|max:50|unique:alat';
        }

        $validateData = $request->validate($rules);

        Alat::where('id', $alat->id)
            ->update($validateData);

        return redirect('/admin/alat')->with('success', 'Edit Alat Berhasil!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Alat  $alat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Alat $alat, Request $request)
    {
        //
        if ($alat->name === $request->name) {
            # code...
            Alat::destroy($alat->id);
        }

        return back()->with('delete', 'Alat Berhasil Dihapus!');
    }
}
