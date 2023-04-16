<?php

namespace App\Models;

use App\Models\Alat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lab extends Model
{
    use HasFactory;

    protected $table = 'lab';

    protected $guarded = ['id'];

    public function alat()
    {
        return $this->hasMany(Alat::class);
    }
}
