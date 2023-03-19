<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lab extends Model
{
    use HasFactory;

    protected $table = 'lab';

    protected $guarded = ['id'];

    public function alats()
    {
        return $this->hasMany(Alat::class);
    }
}
