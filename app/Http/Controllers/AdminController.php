<?php

namespace App\Http\Controllers;

use App\Models\Lab;
use App\Models\Alat;
use App\Models\User;
use App\Models\P_alat;
use App\Models\Ruangan;
use App\Models\P_ruangan;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function index()
    {
        //
        $j_alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->count();

        $data = [
            "title" => "Halaman Dashboard",
            "active" => "dashboard",
            "nomor" => 1,
            "lab" => Lab::all(),
            "user" => User::all(),
            "jumlah_alat" => $j_alat,
        ];

        $lab = Lab::where('id', '=', auth()->user()->lab_id)->get();
        $alat = Alat::where('lab_id', '=', auth()->user()->lab_id)->get();
        $p_alat = P_alat::where('lab_id', '=', auth()->user()->lab_id)->get();

        return view('/admin/index', ($data), compact('alat', 'p_alat'));
    }

    public function profil(User $user)
    {
        return view('/admin/profil', [
            "title" => "Halaman Profil",
            "active" => "",
            "user" => $user,
            "lab" => Lab::all(),
            "nomor" => 1,
        ]);
    }

    public function update_profil(Request $request, User $user)
    {
        $rules = ([
            'level' => 'required',
            'lab_id' => 'required',
            'email' => 'required|email',
            // 'photo' => 'image|file|max:2048',
            'address' => "nullable"
        ]);

        if ($request->name != $user->name) {
            $rules['name'] = 'required|max:50|unique:users';
        }

        if ($request->nip != $user->nip) {
            $rules['nip'] = 'required|min:1|max:25|unique:users';
        }

        $validateData = $request->validate($rules);

        if ($request->file('photo')) {

            $rules['photo'] = 'image|file|max:2048';

            $validateData = $request->validate($rules);

            if ($user->photo != null) {
                // File::delete('storage/' . $user->photo);
                $file = 'public/storage/' . $user->photo;
                @unlink($file);
            }
            // $validateData['photo'] = $request->file('photo')->store('/img/user');
            $fileName = time() . '.' . $request->file('photo')->extension();
            $path_url = '../public/storage/img/user';
            $request->file('photo')->move(public_path($path_url), $fileName);
            $validateData['photo'] =  'img/user/' . $fileName;
        }

        User::where('id', $user->id)
            ->update($validateData);

        return redirect('/aadmin/profil/' . auth()->user()->name)->with('success', 'Update Success !!');
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

        return back()->with("successs", "Update Password Success");
    }

    public function lab()
    {
        return view('/admin/lab', [
            "title" => "Halaman Laboratorium",
            "active" => "lab",
            "users" => User::all(),
            "lab" => Lab::all(),
            "alat" => Alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
            "nomor" => 1,
        ]);
    }

    public function edit_lab(Lab $lab)
    {
        return view('/admin/edit_lab', [
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
                // File::delete('storage/' . $lab->photo);
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

        return redirect('/aadmin/laboratorium')->with('success', 'Update Success !!');
    }

    // Alat
    public function alat()
    {
        // $getalat = Alat::where('lab_id', '=', auth()->user()->lab_id)->get();
        return view('/admin/alat', [
            "title" => "Daftar Alat",
            "active" => "alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            // "getalat" => $getalat,
            "alat" => Alat::where('lab_id', '=', auth()->user()->lab_id)->latest()->get(),
            "nomor" => 1,
        ]);
    }

    public function add_alat()
    {
        return view('/admin/add_alat', [
            "title" => "Halaman Tambah Alat",
            "active" => "alat",
            "user" => User::all(),
            "lab" => Lab::all(),
            "nomor" => 1,
        ]);
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

    public function edit_alat(Alat $alat)
    {
        return view('/admin/edit_alat', [
            "title" => "Halaman Edit Alat",
            "active" => "alat",
            "alat" => $alat,
            "lab" => Lab::all(),
            "nomor" => 1,
        ]);
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
