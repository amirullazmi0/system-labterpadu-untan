<?php

namespace App\Models;

use App\Models\Lab;
use App\Models\Alat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class P_alat extends Model
{
    use HasFactory;

    protected $table = 'p_alat';

    protected $guarded = ['id'];

    public function alat()
    {
        return $this->belongsTo(Alat::class);
    }

    public function lab()
    {
        return $this->belongsTo(Lab::class);
    }
}
