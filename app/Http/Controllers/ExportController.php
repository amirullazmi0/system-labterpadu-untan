<?php

namespace App\Http\Controllers;

use App\Models\Alat;
use App\Models\P_alat;
use App\Models\Ruangan;
use App\Models\P_ruangan;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;


class ExportController extends Controller
{
    //
    public function ruangan()
    {
        $ruangan = Ruangan::all()->toArray();

        $filename = "Daftar Ruangan.xls";

        header("Content-Disposition: attachment; filename=\"$filename\"");

        header("Content-Type: application/vnd.ms-excel");

        $flag = false;

        foreach ($ruangan as $row) {
            if (!$flag) {
                echo implode("\t", array_keys($row)) . "\n";
                $flag = true;
            }
            echo implode("\t", array_values($row)) . "\n";
        }
        exit;
    }
    public function p_ruangan()
    {
        $p_ruangan = P_ruangan::all()->toArray();

        $filename = "Peminjaman Ruangan.xls";

        header("Content-Disposition: attachment; filename=\"$filename\"");

        header("Content-Type: application/vnd.ms-excel");

        $flag = false;

        foreach ($p_ruangan as $row) {
            if (!$flag) {
                echo implode("\t", array_keys($row)) . "\n";
                $flag = true;
            }
            echo implode("\t", array_values($row)) . "\n";
        }
        exit;
    }

    public function alat()
    {
        $alat =  Alat::where('lab_id', '=', auth()->user()->lab_id)->get()->toArray();

        $filename = "Daftar Alat " . auth()->user()->lab->name . '.xls';

        header("Content-Disposition: attachment; filename=\"$filename\"");

        header("Content-Type: application/vnd.ms-excel");

        $flag = false;

        foreach ($alat as $row) {
            if (!$flag) {
                echo implode("\t", array_keys($row)) . "\n";
                $flag = true;
            }
            echo implode("\t", array_values($row)) . "\n";
        }
        exit;
    }
    public function p_alat()
    {
        $p_alat = P_alat::where('lab_id', '=', auth()->user()->lab_id)->get()->toArray();
        // $data = DB::table('nama_tabel')->get()->toArray();

        $filename = "Peminjaman Alat " . auth()->user()->lab->name . '.xls';

        header("Content-Disposition: attachment; filename=\"$filename\"");

        header("Content-Type: application/vnd.ms-excel");

        $flag = false;

        foreach ($p_alat as $row) {
            if (!$flag) {
                echo implode("\t", array_keys($row)) . "\n";
                $flag = true;
            }
            echo implode("\t", array_values($row)) . "\n";
        }
        exit;
    }
}
