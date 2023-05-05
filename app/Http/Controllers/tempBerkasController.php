<?php

namespace App\Http\Controllers;

use App\Models\Temp_berkas;
use Illuminate\Http\Request;

class tempBerkasController extends Controller
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Temp_berkas  $temp_berkas
     * @return \Illuminate\Http\Response
     */
    public function show(Temp_berkas $temp_berkas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Temp_berkas  $temp_berkas
     * @return \Illuminate\Http\Response
     */
    public function edit(Temp_berkas $temp_berkas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Temp_berkas  $temp_berkas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Temp_berkas $temp_berkas)
    {
        // dd($request->file('berkas'));
        if ($request->file('berkas') !=  null) {
            $validateData = $request->validate([
                'berkas' => 'required|file|max:2048|mimes:pdf',
            ]);

            if ($temp_berkas->berkas != null) {
                $file = 'file/berkas/' . $temp_berkas->berkas;
                unlink($file);
            }

            $fileName = 'File-B' . $temp_berkas->id . '-' . time() . '.' . $request->file('berkas')->extension();
            $path_url = 'file/berkas';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  $fileName;

            Temp_berkas::where('id', $temp_berkas->id)
                ->update($validateData);

            return back()->with("message", "Update Berkas Berhasil");
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Temp_berkas  $temp_berkas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Temp_berkas $temp_berkas)
    {
        //
    }
}
