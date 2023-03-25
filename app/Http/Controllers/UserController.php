<?php

namespace App\Http\Controllers;

use App\Models\Lab;
use App\Models\Alat;
use App\Models\User;
use App\Models\P_alat;
use App\Models\Ruangan;
use App\Models\P_ruangan;
use App\Models\Temp_berkas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function index()
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        $data = [
            "title" => "UPT Laboratorium Terpadu",
            "active" => "dashboard",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::all(),
            "navlab" => Lab::first(),
            "lab" => Lab::all(),
            "user" => User::all(),
            "p_ruangan" => P_ruangan::all(),
            "p_alat" => P_alat::all(),
        ];

        return Inertia::render('Home', $data);
    }
    public function ruangan()
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        return view('/user/ruangan', [
            "title" => "Daftar Ruangan",
            "active" => "ruangan",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::all(),
            "navlab" => Lab::first(),
            "ruangan" => Ruangan::all(),
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ]);
    }
    public function show_ruangan(Ruangan $ruangan)
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        return view('/user/show_ruangan', [
            "title" => $ruangan->name,
            "active" => "ruangan",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::all(),
            "navlab" => Lab::first(),
            "lab" => Lab::all(),
            "ruangan" => $ruangan,
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ]);
    }
    public function all_alat()
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        return view('/user/all_alat', [
            "title" => "Daftar Alat",
            "active" => "alat",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::all(),
            "daftaraktif" => 'active',
            "alat" => Alat::orderBy('name', 'asc')->get(),
            "navlab" => Lab::first(),
            "lab" => Lab::all(),
            "daftarlab" => lab::all(),
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ]);
    }
    public function alat(Lab $lab)
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        return view('/user/alat', [
            "title" => "Daftar Alat",
            "active" => "alat",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::all(),
            "daftaraktif" => '',
            "alat" => Alat::where('lab_id', '=', $lab->id)->latest()->get(),
            "navlab" => Lab::first(),
            "lab" => $lab,
            "daftarlab" => lab::all(),
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ]);
    }

    public function show_alat(Lab $lab, Alat $alat)
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        return view('/user/show_alat', [
            "title" => $alat->name . " | " . $lab->name,
            "active" => "alat",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::all(),
            "navlab" => Lab::first(),
            "lab" => $lab,
            "alat" => $alat,
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ]);
    }
}
