<?php

namespace App\Http\Controllers;

use App\Models\Lab;
use App\Models\Alat;
use App\Models\User;
use Inertia\Inertia;
use App\Models\P_alat;
use App\Models\Ruangan;
use App\Models\P_ruangan;
use App\Models\Temp_berkas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\dataCollection;
use Illuminate\Database\Eloquent\Collection;

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
            "temp_berkas" => Temp_berkas::orderBy('name', 'asc')->get(),
            "navlab" => Lab::first(),
            "lab" => Lab::all(),
            "user" => User::all(),
            "p_ruangan" => P_ruangan::with('ruangan')->get(),
            "p_alat" => P_alat::with('alat')->get(),
        ];

        return Inertia::render('Home', $data);
    }
    public function ruangan()
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        $data = [
            "title" => "Daftar Ruangan",
            "active" => "ruangan",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::orderBy('name', 'asc')->get(),
            "navlab" => Lab::first(),
            "ruangan" => Ruangan::all(),
            "p_ruangan" => new dataCollection(P_ruangan::with('ruangan')->orderBy('name', 'desc')->latest()->paginate(15)),
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ];

        return Inertia::render('Ruangan', $data);
    }
    public function show_ruangan(Ruangan $ruangan)
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        return view('/user/show_ruangan', [
            "title" => $ruangan->name,
            "active" => "ruangan",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::orderBy('name', 'asc')->get(),
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

        $data = [
            "title" => "Daftar Alat",
            "active" => "alat",
            "id" => 0,
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::orderBy('name', 'asc')->get(),
            "daftaraktif" => 'active',
            "alat" => new dataCollection(Alat::with('lab')->orderBy('name', 'asc')->paginate(8)),
            "p_alat" => P_alat::with('alat')->get(),
            "pag" => Alat::with('lab')->paginate(5),
            "navlab" => Lab::first(),
            "lab" => Lab::all(),
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ];

        return Inertia::render('Alat', $data);
    }
    public function alat(Lab $lab)
    {
        $data = [
            "title" => "Daftar Alat",
            "active" => "alat",
            "id" => $lab->id,
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::orderBy('name', 'asc')->get(),
            "daftaraktif" => 'active',
            "alat" => new dataCollection(Alat::with('lab')->where('lab_id', '=', $lab->id)->paginate(8)),
            "p_alat" => P_alat::with('alat')->get(),
            "navlab" => Lab::first(),
            "lab" => Lab::all(),
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ];

        return Inertia::render('Alat', $data);
    }

    public function show_alat(Lab $lab, Alat $alat)
    {
        // $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        return view('/user/show_alat', [
            "title" => $alat->name . " | " . $lab->name,
            "active" => "alat",
            "nomor" => 1,
            "temp_berkas" => Temp_berkas::orderBy('name', 'asc')->get(),
            "navlab" => Lab::first(),
            "lab" => $lab,
            "alat" => $alat,
            "user" => User::all(),
            // "jumlah_alat" => $j_alat,
        ]);
    }
}
