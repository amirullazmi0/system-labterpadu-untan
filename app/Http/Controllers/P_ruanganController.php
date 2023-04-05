<?php

namespace App\Http\Controllers;

use App\Models\P_ruangan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class P_ruanganController extends Controller
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
        $validateData = $request->validate([
            'name' => 'required|max:30',
            'ruangan_id' => 'required',
            'event' => 'required|max:30',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
            'time_start' => 'required',
            'time_end' => 'required',
            'desc' => 'nullable',
            'berkas' => 'nullable|max:2048'
        ]);
        if ($request->file('berkas')) {
            $fileName = 'File-PR-' . time() . '.' . $request->file('berkas')->extension();
            $path_url = 'file/peminjamanRuangan';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  $fileName;
        }
        P_ruangan::create($validateData);

        return redirect('/super/p-ruangan')->with('success', 'Tambah Ruangan Success!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\P_ruangan  $p_ruangan
     * @return \Illuminate\Http\Response
     */
    public function show(P_ruangan $p_ruangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\P_ruangan  $p_ruangan
     * @return \Illuminate\Http\Response
     */
    public function edit(P_ruangan $p_ruangan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\P_ruangan  $p_ruangan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, P_ruangan $p_ruangan)
    {
        //
        $rules = ([
            'name' => 'required|max:30',
            'ruangan_id' => 'required',
            'event' => 'required|max:30',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
            'time_start' => 'required',
            'time_end' => 'required',
            'desc' => 'nullable',
        ]);

        $validateData = $request->validate($rules);

        if ($request->file('berkas')) {

            $rules['berkas'] = 'max:2048';

            $validateData = $request->validate($rules);

            if ($p_ruangan->berkas != null) {
                $file = 'file/peminjamanRuangan/' . $p_ruangan->berkas;
                unlink($file);
            }

            $fileName = 'File-PR-' . time() . '.' . $request->file('berkas')->extension();
            $path_url = 'file/peminjamanRuangan';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  $fileName;
        }

        P_ruangan::where('id', $p_ruangan->id)
            ->update($validateData);

        return redirect('/super/p-ruangan/')->with('success', 'Update Peminjaman Ruangan Success!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\P_ruangan  $p_ruangan
     * @return \Illuminate\Http\Response
     */
    public function destroy(P_ruangan $p_ruangan, Request $request)
    {
        //

        if ($p_ruangan->name === $request->name) {
            if ($p_ruangan->berkas) {
                $file = 'file/peminjamanRuangan/' . $p_ruangan->berkas;
                unlink($file);
            }
            P_ruangan::destroy($p_ruangan->id);
        }

        return redirect('/super/p-ruangan')->with('delete', 'Peminjaman Ruangan Berhasil Dihapus!');
    }
}
