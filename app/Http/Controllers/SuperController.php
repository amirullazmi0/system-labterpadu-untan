<?php

namespace App\Http\Controllers;

use App\Models\Lab;
use App\Models\Alat;
use App\Models\GroupPAlat;
use App\Models\User;
use Inertia\Inertia;
use App\Models\P_alat;
use App\Models\Ruangan;
use App\Models\P_ruangan;
use App\Models\Temp_berkas;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Stmt\Return_;

class SuperController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // //
        $j_dosen = DB::table('users')->where('level', '1')->count();
        $j_laboran = DB::table('users')->where('level', '2')->count();

        $data = [
            "title" => "Halaman Dashboard",
            "active" => "dashboard",
            "nomor" => 1,
            "lab" => Lab::all(),
            "user" => User::all(),
            "jumlah_laboran" => User::where('level', '1')->count(),
            "jumlah_lab" => Lab::count(),
            "jumlah_ruangan" => Ruangan::count()
        ];

        $ruangan = Ruangan::all();
        $p_ruangan = P_ruangan::all();

        return Inertia::render('Super/DashboardSuper', $data);

        // return view('/superadmin/index', ($data), compact('p_ruangan', 'ruangan'));
    }

    public function profil(User $user)
    {
        return view('/superadmin/profil', [
            "title" => "Halaman Profil",
            "active" => "",
            "user" => $user,
            "temp_berkas" => Temp_berkas::all(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ]);
    }

    public function update_password(Request $request)
    {
        $request->validate([
            'oldpassword' => 'required',
            'newpassword1' => 'required',
            'newpassword2' => 'required',
        ]);

        #Match The Old Password
        if (!Hash::check($request->oldpassword, auth()->user()->password)) {
            return back()->with("error", "Password Lama Salah");
        }

        if ($request->newpassword1 != $request->newpassword2) {
            return back()->with("error", "Konfirmasi Password Tidak Sama");
        }

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->newpassword1)
        ]);

        return back()->with("success", "Update Password Success");
    }

    public function user_password(User $user, Request $request)
    {
        $request->validate([
            // 'oldpassword' => 'required',
            'newpassword1' => 'required',
            'newpassword2' => 'required',
        ]);

        if ($request->newpassword1 != $request->newpassword2) {
            return back()->with("error", "Konfirmasi Password Tidak Sama");
        }

        User::whereId($user->id)->update([
            'password' => Hash::make($request->newpassword1)
        ]);

        return back()->with("successs", "Update Password Success");
    }

    public function update_berkas(Temp_berkas $temp_berkas, Request $request)
    {
        if ($request->file('berkas') != null) {

            $rules['berkas'] = 'file|max:2048';

            $validateData = $request->validate($rules);

            if ($temp_berkas->berkas != null) {
                $file = 'public/storage/' . $temp_berkas->berkas;
                @unlink($file);
            }

            // $validateData['berkas'] = $request->file('berkas')->store('/file/template_berkas');
            $fileName = time() . '.' . $request->file('berkas')->extension();
            $path_url = '../public/storage/file/template_berkas';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  'file/template_berkas/' . $fileName;

            Temp_berkas::whereId($temp_berkas->id)->update([
                'berkas' => $validateData['berkas']
            ]);
        }

        return redirect('/admin/profil/' . auth()->user()->name)->with('success', 'Update Success !!');
    }

    public function lab()
    {
        $data = [
            "title" => "Halaman Laboratorium",
            "active" => "lab",
            "users" => User::all(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/LabSuper', $data);
    }

    public function show_lab(Lab $lab)
    {
        return view('/superadmin/show_lab', [
            "title" => "Halaman Detail Laboratorium",
            "active" => "lab",
            "lab" => $lab,
            "users" => User::all(),
            "nomor" => 1,
        ]);
    }

    public function edit_lab(Lab $lab)
    {
        return view('/superadmin/edit_lab', [
            "title" => "Halaman Edit Laboratorium",
            "active" => "lab",
            "lab" => $lab,
            "users" => User::all(),
            "nomor" => 1,
        ]);
    }

    public function update_lab(Request $request, Lab $lab)
    {
        $rules = ([
            'desc' => "nullable",
        ]);

        if ($request->name != $lab->name) {
            $rules['name'] = 'required|max:50|unique:users';
        }

        $validateData = $request->validate($rules);

        if ($request->file('photo')) {

            $rules['photo'] = 'image|file|max:2048';

            $validateData = $request->validate($rules);

            if ($lab->photo != null) {
                $file = 'public/storage/' . $lab->photo;
                @unlink($file);
            }
            // $validateData['photo'] = $request->file('photo')->store('/img/lab');
            $fileName = time() . '.' . $request->file('photo')->extension();
            $path_url = '../public/storage/img/lab';
            $request->file('photo')->move(public_path($path_url), $fileName);
            $validateData['photo'] =  'img/lab/' . $fileName;
        }

        Lab::where('id', $lab->id)
            ->update($validateData);

        return redirect('/admin/laboratorium')->with('success', 'Update Success !!');
    }
    // LABORAN
    public function laboran()
    {
        $data = [
            "title" => "Halaman Daftar Laboran",
            "active" => "laboran",
            "laboran" => User::where('level', '1')->get(),
            // "user" => User::latest()->get(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/LaboranSuper', $data);
    }

    public function add_laboran()
    {
        $data = [
            "title" => "Halaman Tambah Laboran",
            "active" => "laboran",
            "user" => User::all(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/AddLaboranSuper', $data);
    }

    public function show_laboran(User $user, Request $request)
    {
        $data = [
            "title" => "Halaman Detail Laboran",
            "active" => "laboran",
            "user" => User::where('id', $user->id)->where('name', $request->name)->get(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/DetailLaboranSuper', $data);
    }

    public function edit_laboran(User $user, Request $request)
    {
        $data = [
            "title" => "Halaman Edit Laboran",
            "active" => "laboran",
            "user" => User::where('id', $user->id)->where('name', $request->name)->get(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/EditLaboranSuper', $data);
    }

    // Ruangan
    public function ruangan()
    {
        $data = [
            "title" => "Halaman Daftar Ruangan",
            "active" => "ruangan",
            "user" => User::all(),
            "lab" => Lab::all(),
            "ruangan" => Ruangan::latest()->get(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/RuanganSuper', $data);
    }

    public function add_ruangan()
    {
        $data = [
            "title" => "Halaman Tambah ruangan",
            "active" => "ruangan",
            "user" => User::all(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/AddRuanganSuper', $data);
    }

    public function edit_ruangan(Ruangan $ruangan, Request $request)
    {
        $data = [
            "title" => "Halaman Edit Ruangan",
            "active" => "ruangan",
            "ruangan" => Ruangan::where('id', $ruangan->id)->where('name', $request->name)->get(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/EditRuanganSuper', $data);
    }

    public function destroy_ruangan(Ruangan $ruangan)
    {
        // File::delete('storage/' . $ruangan->photos);

        $file = 'public/storage/' . $ruangan->photos;
        @unlink($file);

        Ruangan::destroy($ruangan->id);

        return redirect('/admin/ruangan')->with('delete', 'Ruangan Has Been Delete!');
    }

    //Peminjaman Ruangan
    public function p_ruangan()
    {
        $data = [
            "title" => "Daftar Peminjaman Ruangan",
            "active" => "p_ruangan",
            "user" => User::all(),
            "lab" => Lab::all(),
            "ruangan" => Ruangan::all(),
            "p_ruangan" => P_ruangan::latest()->get(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/P_RuanganSuper', $data);
    }
    //Peminjaman alat
    public function p_alat()
    {
        $data = [
            "title" => "Daftar Peminjaman Alat",
            "active" => "p_alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            "alat" =>  Alat::all(),
            "p_alat" => P_alat::orderByDesc('created_at')->get(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/P_AlatSuper', $data);
    }

    public function add_p_alat()
    {
        $data = [
            "title" => "Tambah Peminjaman Alat",
            "active" => "p_alat",
            "lab" => Lab::all(),
            "alat" =>  Alat::all(),
            "p_alat" => P_alat::latest()->get(),
            "nomor" => 1,
        ];


        return Inertia::render('Super/AddP_AlatSuper', $data);
    }

    public function show_p_alat(P_alat $p_alat, Request $request)
    {
        $data = [
            "title" => "Detail Peminjaman Alat",
            "active" => "p_alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            "alat" =>  Alat::all(),
            "p_alat" => P_alat::where('primary_id', $request->primary_id)->get(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/DetailPAlatSuper', $data);
    }

    public function edit_p_alat(P_alat $p_alat, Request $request)
    {
        $data = [
            "title" => "Tambah Peminjaman Alat",
            "active" => "p_alat",
            "lab" => Lab::all(),
            "alat" =>  Alat::all(),
            "p_alat" => P_alat::where('primary_id', $request->primary_id)->get(),
            "p_alatId" => P_alat::where('primary_id', $request->primary_id)->pluck('alat_id'),
            "p_alatTotal" => P_alat::where('primary_id', $request->primary_id)->pluck('total'),
            "count_p_alat" => P_alat::where('primary_id', $request->primary_id)->count(),
            "nomor" => 1,
        ];


        return Inertia::render('Super/EditP_AlatSuper', $data);
    }
    // ANALISI
    public function analisis()
    {
        $data = [
            "title" => "Analisis",
            "active" => "analisis",
        ];

        return Inertia::render('Super/AnalisisSuper', $data);
    }

    public function add_p_ruangan()
    {
        $data = [
            "title" => "Tambah Peminjaman Ruangan",
            "active" => "p_ruangan",
            "user" => User::all(),
            "lab" => Lab::all(),
            "ruangan" => Ruangan::all(),
            "p_ruangan" => P_ruangan::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/AddP_RuanganSuper', $data);
    }

    public function store_p_ruangan(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:30',
            'ruangan_id' => 'required',
            'event' => 'required|max:30',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
            'time_start' => 'required',
            'time_end' => 'required',
            'desc' => 'nullable',
            'berkas' => 'nullable|file|max:2048'
        ]);

        if ($request->file('berkas')) {
            // $validateData['berkas'] = $request->file('berkas')->store('/file/p_ruangan');
            $fileName = time() . '.' . $request->file('berkas')->extension();
            $path_url = '../public/storage/file/p_ruangan';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  'file/p_ruangan/' . $fileName;
        }

        P_ruangan::create($validateData);

        return redirect('/admin/p-ruangan/')->with('success', 'Tambah Peminjaman Success !!');
    }

    public function show_p_ruangan(P_ruangan $p_ruangan, Request $request)
    {
        $data = [
            "title" => "Detail Peminjaman Ruangan",
            "active" => "p_ruangan",
            "ruangan" => Ruangan::all(),
            "p_ruangan" => P_ruangan::where('id', $p_ruangan->id)->where('name', $request->name)->get(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/DetailPRuanganSuper', $data);
    }

    public function edit_p_ruangan(P_ruangan $p_ruangan, Request $request)
    {
        $data = [
            "active" => "p_ruangan",
            "user" => User::all(),
            "lab" => Lab::all(),
            "ruangan" => Ruangan::all(),
            "p_ruangan" => P_ruangan::where('id', $p_ruangan->id)->where('name', $request->name)->get(),
            "nomor" => 1,
        ];

        return Inertia::render('Super/EditP_RuanganSuper', $data);
    }

    public function update_p_ruangan(P_ruangan $p_ruangan, Request $request)
    {
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

            $rules['berkas'] = 'image|file|max:2048';

            $validateData = $request->validate($rules);

            if ($p_ruangan->berkas != null) {
                // File::delete('storage/' . $p_ruangan->berkas);
                $file = 'public/storage/' . $p_ruangan->berkas;
                @unlink($file);
            }
            // $validateData['berkas'] = $request->file('berkas')->store('/file/p_ruangan');
            $fileName = time() . '.' . $request->file('berkas')->extension();
            $path_url = '../public/storage/file/p_ruangan';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  'file/p_ruangan/' . $fileName;
        }

        P_ruangan::where('id', $p_ruangan->id)
            ->update($validateData);

        return redirect('/admin/p-ruangan/')->with('success', 'Update Peminjaman Success !!');
    }

    public function destroy_p_ruangan(P_ruangan $p_ruangan)
    {
        $file = 'public/storage/' . $p_ruangan->berkas;
        @unlink($file);

        P_ruangan::destroy($p_ruangan->id);

        return redirect('/admin/p_ruangan')->with('delete', 'Peminjaman Has Been Delete!');
    }
}
