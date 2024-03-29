<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\P_alat;
use Inertia\Controller;
use App\Models\P_ruangan;
use App\Models\GroupPAlat;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Foreach_;
use Illuminate\Auth\Events\Validated;

class P_alatController extends Controller
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
            'name' => 'required|max:30',
            'alat_id' => 'required|exists:alat,id',
            'total' => 'required',
            'event' => 'required|max:30',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
            'time_start' => 'required',
            'time_end' => 'required',
            'desc' => 'nullable',
            'berkas' => 'nullable|max:2048'
        ]);
        $pa = P_alat::latest()->first();
        if ($pa === null) {
            # code...
            $validateData['primary_id'] = 'K/A-PA-' . 1;
        } else {
            $validateData['primary_id'] = 'K/A-PA-' . $pa->id + 1;
        }

        // dd($validateData);
        // dd($stringTotal);

        if ($request->file('berkas')) {
            $fileName = 'File-PA-' . time() . '.' . $request->file('berkas')->extension();
            $path_url = 'file/peminjamanAlat';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  $fileName;
        }

        $i = 0;

        foreach ($request->alat_id as $alat) {
            // dd($request->alat_id[$i]);
            if (isset($request->alat_id[$i]) && isset($request->total[$i])) {
                $validateData['alat_id'] = $request->alat_id[$i];
                $validateData['total'] = $request->total[$i];
                P_alat::create($validateData);
                $i = $i + 1;
            }
        }

        return redirect('/super/p-alat')->with('success', 'Tambah Peminjaman Success!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\P_alat  $p_alat
     * @return \Illuminate\Http\Response
     */
    public function show(P_alat $p_alat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\P_alat  $p_alat
     * @return \Illuminate\Http\Response
     */
    public function edit(P_alat $p_alat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\P_alat  $p_alat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, P_alat $p_alat)
    {
        //
        // dd($request);

        $rules = ([
            'name' => 'required|max:30',
            'alat_id' => 'required|exists:alat,id',
            'total' => 'required',
            'event' => 'required|max:30',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
            'time_start' => 'required',
            'time_end' => 'required',
            'desc' => 'nullable',
        ]);

        $validateData = $request->validate($rules);
        $validateData['primary_id'] = $p_alat->primary_id;

        $pa = P_alat::where('primary_id', $p_alat->primary_id)->get();

        if ($request->file('berkas')) {
            $file = 'file/peminjamanAlat/' . $p_alat->berkas;
            unlink($file);
            $fileName = 'File-PA-' . time() . '.' . $request->file('berkas')->extension();
            $path_url = 'file/peminjamanAlat';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  $fileName;
        }

        $i = 0;
        foreach ($pa as $key => $value) {
            if (isset($request->alat_id[$i]) && isset($request->total[$i])) {
                $validateData['alat_id'] = $request->alat_id[$i];
                $validateData['total'] = $request->total[$i];
                P_alat::where('id', $pa[$i]->id)
                    ->update($validateData);
                $i = $i + 1;
            } else {
                P_alat::destroy($pa[$i]->id);
                $i = $i + 1;
            }
        }

        foreach ($request->alat_id as $alat) {
            if (isset($request->alat_id[$i]) && isset($request->total[$i])) {
                $validateData['alat_id'] = $request->alat_id[$i];
                $validateData['total'] = $request->total[$i];
                P_alat::create($validateData);
                $i = $i + 1;
            }
        }

        return redirect('/super/p-alat/')->with('success', 'Update Peminjaman Ruangan Success!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\P_alat  $p_alat
     * @return \Illuminate\Http\Response
     */
    public function destroy(P_alat $p_alat, Request $request)
    {
        //
        $all = P_alat::where('primary_id', $request->primary_id)->get();
        $i = 0;
        foreach ($all as $a) {
            if ($a->berkas) {
                $file = 'file/peminjamanAlat/' . $a->berkas;
                unlink($file);
            }
            P_alat::destroy($a->id);
            $i++;
        }

        return redirect('/super/p-alat')->with('delete', 'Peminjaman Alat Berhasil Dihapus!');
    }
}
