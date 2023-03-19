<?php

namespace App\Models;

use App\Models\Ruangan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;

class P_ruangan extends Model
{
    use HasFactory;

    protected $table = 'p_ruangan';

    protected $guarded = ['id'];

    public function ruangan()

    {
        return $this->belongsTo(Ruangan::class);
    }
}
