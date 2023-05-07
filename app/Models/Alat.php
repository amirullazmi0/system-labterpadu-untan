<?php

namespace App\Models;

use App\Models\Lab;
use App\Models\P_alat;
use App\Models\GroupPAlat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Alat extends Model
{
    use HasFactory;

    protected $table = 'alat';

    protected $guarded = ['id'];

    protected $fillable = [
        'name', 'lab_id', 'total', 'color', 'desc'
    ];

    public function lab()
    {
        return $this->belongsTo(Lab::class);
    }
    public function alat()
    {
        return $this->belongsToMany(P_alat::class);
    }
}
