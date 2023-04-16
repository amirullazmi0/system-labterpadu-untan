<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\P_alat;
use Inertia\Controller;
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
        dd($request);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\P_alat  $p_alat
     * @return \Illuminate\Http\Response
     */
    public function destroy(P_alat $p_alat)
    {
        //
    }
}
