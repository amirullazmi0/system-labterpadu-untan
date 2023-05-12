<?php

namespace App\Http\Controllers;

use App\Http\Resources\dataCollection;
use App\Models\Lab;
use App\Models\Alat;
use App\Models\User;
use Inertia\Inertia;
use App\Models\P_alat;
use App\Models\Ruangan;
use App\Models\P_ruangan;
use App\Models\Temp_berkas;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function index()
    {
        $pp = DB::table('p_alat')
            ->join('alat', 'p_alat.alat_id', '=', 'alat.id')
            ->join('lab', 'alat.lab_id', '=', 'lab.id')
            ->join('users', 'lab.id', '=', 'users.lab_id')
            ->select('p_alat.*', 'alat.total as aa_total', 'alat.name as aa_name', 'alat.color as aa_color')
            ->where('alat.lab_id', '=', auth()->user()->lab_id)
            ->get();
        $data = [
            "title" => "Halaman Dashboard",
            "active" => "dashboard",
            "nomor" => 1,
            "lab" => Lab::all(),
            "alat" => Alat::where('lab_id', auth()->user()->lab_id)->count(),
            "aalat" => Alat::where('lab_id', auth()->user()->lab_id)->get(),
            "p_alat" => $pp,
            "user" => User::all(),
        ];

        return Inertia::render('Admin/DashboardAdmin', $data);
    }

    public function profil(User $user, Request $request)
    {
        $data = [
            "title" => "Halaman Profil",
            "active" => "profil",
            "user" => User::where('id', $user->id)->where('name', auth()->user()->name)->where('name', $request->name)->get(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Admin/ProfilAdmin', $data);
    }

    public function profil_update(Request $request, User $user)

    {
        $rules = ([
            'name' => 'required',
            // 'email' => 'required|email',
            'address' => 'nullable'
        ]);

        if ($request->email != $user->email) {
            $rules['email'] = 'required|email:dns|unique:users';
        }

        $validateData = $request->validate($rules);

        // dd($validateData);
        User::where('id', $user->id)
            ->update($validateData);

        return redirect('/admin/' . auth()->user()->id . '/profil?name=' . $request->name)->with('success', 'Update Profil Berhasil');
    }

    public function password_update(Request $request)
    {
        $request->validate([
            'oldPassword' => 'required',
            'newPassword1' => 'required',
            'newPassword2' => 'required',
        ]);

        #Match The Old Password
        if (!Hash::check($request->oldPassword, auth()->user()->password)) {
            return back()->with("error", "Gagal !! Password Lama Salah");
        }

        if ($request->newPassword1 != $request->newPassword2) {
            return back()->with("error", "Gagal !! Konfirmasi Password Tidak Sama");
        }

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->newpassword1)
        ]);

        return back()->with("update", "Update Password Berhasil");
    }

    // Alat
    public function alat()
    {
        $data = [
            "title" => "Daftar Alat",
            "active" => "alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            "alat" => new dataCollection(Alat::with('lab')->where('lab_id', '=', auth()->user()->lab_id)->latest()->paginate(5)),
            "nomor" => 1,
        ];

        return Inertia::render('Admin/Alat', $data);
    }

    public function add_alat()
    {
        $data = [
            "title" => "Halaman Tambah Alat",
            "active" => "alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            "alat" => Alat::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Admin/AddAlat', $data);
    }

    public function store_alat(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:50|unique:alat',
            'lab_id' => 'required',
            'color' => 'nullable',
            'photos' => 'required|image|file|max:2048',
            'desc' => 'nullable'
        ]);

        if ($request->file('photos')) {
            // $validateData['photos'] = $request->file('photos')->store('/img/alat');

            $fileName = time() . '.' . $request->file('photos')->extension();
            $path_url = '../public/storage/img/alat';
            $request->file('photos')->move(public_path($path_url), $fileName);
            $validateData['photos'] =  'img/alat/' . $fileName;
        }

        alat::create($validateData);

        // Lab::where('id', $request->lab_id)
        //     ->save(['alat_id' => $request->id]);


        return redirect('/aadmin/laboratorium/alat')->with('success', 'Add Alat Success !!');
    }

    public function show_alat(Alat $alat)
    {
        return view('/admin/show_alat', [
            "title" => "Halaman Detail Alat",
            "active" => "alat",
            "alat" => $alat,
        ]);
    }

    public function edit_alat(Alat $alat, Request $request)
    {
        $data = [
            "title" => "Halaman Edit Alat",
            "active" => "alat",
            "alat" => Alat::where('id', $alat->id)->where('name', $request->name)->get(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ];

        return Inertia::render('Admin/EditAlat', $data);
    }

    public function update_alat(Request $request, alat $alat)
    {
        $rules = ([
            'lab_id' => 'required',
            'desc' => 'nullable',
            'color' => 'nullable',
        ]);

        if ($request->name != $alat->name) {
            $rules['name'] = 'required|max:50|unique:alat';
        }

        $validateData = $request->validate($rules);

        if ($request->file('photos')) {

            $rules['photos'] = 'required|image|file|max:2048';

            $validateData = $request->validate($rules);

            if ($alat->photos != null) {
                // File::delete('storage/' . $alat->photos);
                $file = 'public/storage/' . $alat->photos;
                @unlink($file);
            }
            // $validateData['photos'] = $request->file('photos')->store('/img/alat');
            $fileName = time() . '.' . $request->file('photos')->extension();
            $path_url = '../public/storage/img/alat';
            $request->file('photos')->move(public_path($path_url), $fileName);
            $validateData['photos'] =  'img/alat/' . $fileName;
        }
        Alat::where('id', $alat->id)
            ->update($validateData);

        return redirect('/aadmin/laboratorium/alat')->with('success', 'Update Success !!');
    }

    public function destroy_alat(Alat $alat)
    {
        // File::delete('storage/' . $alat->photos);
        $file = 'public/storage/' . $alat->photos;
        @unlink($file);

        Alat::destroy($alat->id);

        return redirect('/aadmin/laboratorium/alat')->with('delete', 'Alat Has Been Delete!');
    }

    //Peminjaman Ruangan
    public function p_alat()
    {
        return view('/admin/p_alat', [
            "title" => "Daftar Peminjaman Alat",
            "active" => "p_alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            "alat" =>  Alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
            "p_alat" => P_alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
            "nomor" => 1,
        ]);
    }

    public function add_p_alat()
    {
        return view('/admin/add_p_alat', [
            "title" => "Tambah Peminjaman Alat",
            "active" => "p_alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            "alat" => Alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
            "p_alat" => P_alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
            "nomor" => 1,
        ]);
    }

    public function store_p_alat(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|max:30',
            'event' => 'required|max:30',
            'alat_id' => 'required',
            'lab_id' => 'required',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
            // 'time_start' => 'required|date_format:H:i',
            // 'time_end' => 'required|date_format:H:i',
            'desc' => 'nullable',
            'berkas' => 'nullable|file|max:2048'
        ]);

        // dd($validateData);
        if ($request->file('berkas')) {
            // $validateData['berkas'] = $request->file('berkas')->store('/file/p_alat');
            $fileName = time() . '.' . $request->file('berkas')->extension();
            $path_url = '../public/storage/file/p_alat';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  'file/p_alat/' . $fileName;
        }

        P_alat::create($validateData);

        return redirect('/aadmin/laboratorium/p-alat')->with('success', 'Tambah Peminjaman Success !!');
    }

    public function show_p_alat(P_alat $p_alat)
    {
        return view('/admin/show_p_alat', [
            "title" => "Detail Peminjaman Alat",
            "active" => "p_alat",
            "p_alat" => $p_alat,
            "nomor" => 1,
            "alat" => Alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
        ]);
    }

    public function edit_p_alat(P_alat $p_alat)
    {
        return view('/admin/edit_p_alat', [
            "title" => "Edit Peminjaman Ruangan",
            "active" => "p_ruangan",
            "user" => User::all(),
            "lab" => Lab::all(),
            "alat" => Alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
            "p_alat" => $p_alat,
            "nomor" => 1,
        ]);
    }

    public function update_p_alat(P_alat $p_alat, Request $request)
    {
        $rules = ([
            'name' => 'required|max:30',
            'event' => 'required|max:30',
            'alat_id' => 'required',
            'lab_id' => 'required',
            'date_start' => 'required|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
            // 'time_start' => 'required|date_format:H:i:s',
            // 'time_end' => 'required|date_format:H:i:s',
            'desc' => 'nullable',
        ]);

        $validateData = $request->validate($rules);
        if ($request->file('berkas')) {

            $rules['berkas'] = 'image|file|max:2048';

            $validateData = $request->validate($rules);

            if ($p_alat->berkas != null) {
                File::delete('storage/' . $p_alat->berkas);
                $file = 'public/storage/' . $p_alat->berkas;
                @unlink($file);
            }

            $validateData['berkas'] = $request->file('berkas')->store('/file/p_alat');
            $fileName = time() . '.' . $request->file('berkas')->extension();
            $path_url = '../public/storage/file/p_alat';
            $request->file('berkas')->move(public_path($path_url), $fileName);
            $validateData['berkas'] =  'file/p_alat/' . $fileName;
        }

        P_alat::where('id', $p_alat->id)
            ->update($validateData);

        return redirect('/aadmin/laboratorium/p-alat')->with('success', 'Update Peminjaman Success !!');
    }

    public function destroy_p_alat(P_alat $p_alat)
    {
        File::delete('storage/' . $p_alat->berkas);
        $file = 'public/storage/' . $p_alat->berkas;
        @unlink($file);

        P_alat::destroy($p_alat->id);

        return redirect('/aadmin/laboratorium/p-alat')->with('delete', 'Peminjaman Has Been Delete!');
    }
}
