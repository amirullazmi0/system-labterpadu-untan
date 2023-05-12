<?php

namespace App\Http\Controllers;

use App\Models\Lab;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Temp_berkas;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

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
        $validateData = $request->validate([
            'name' => 'required|max:50|unique:temp_berkas',
            'berkas' => 'nullable',
        ]);


        if ($request->file('berkas') !=  null) {

            $validateData = $request->validate([
                'name' => 'required|max:50|unique:temp_berkas',
                'berkas' => 'file|max:2048|mimes:pdf',
            ]);

            $fileName = 'File-B-' . time() . '.' . $request->file('berkas')->extension();
            $path_url = 'file/berkas';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  $fileName;
        }
        Temp_berkas::create($validateData);

        $data = [
            "title" => "Halaman Profil",
            "active" => "profil",
            "user" => User::where('id', auth()->user()->id)->where('name', auth()->user()->name)->get(),
            "temp_berkas" => Temp_berkas::all(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return back()->with("message", "Tambah Berkas Berhasil")->with($data);
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
        // dd($request);
        $rules = ([
            'name' => 'required|max:50',
        ]);

        $validateData = $request->validate($rules);

        if ($request->file('berkas') !=  null) {
            $rules['berkas'] = 'file|max:2048|mimes:pdf';

            $validateData = $request->validate($rules);
            if ($temp_berkas->berkas != null) {
                $file = 'file/berkas/' . $temp_berkas->berkas;
                unlink($file);
            }

            $fileName = 'File-B-' . time() . '.' . $request->file('berkas')->extension();
            $path_url = 'file/berkas';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  $fileName;
        }

        Temp_berkas::where('id', $temp_berkas->id)
            ->update($validateData);

        return back()->with("message", "Update Berkas Berhasil");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Temp_berkas  $temp_berkas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Temp_berkas $temp_berkas, Request $request)
    {
        //
        if ($temp_berkas->name === $request->name) {
            if ($temp_berkas->berkas) {
                $file = 'file/berkas/' . $temp_berkas->berkas;
                unlink($file);
            }
            Temp_berkas::destroy($temp_berkas->id);
        }

        return back()->with("berkasDelete", "Berkas Berhasil Dihapus");
    }
}
