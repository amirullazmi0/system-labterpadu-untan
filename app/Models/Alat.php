<?php

namespace App\Models;

use App\Models\Lab;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Alat extends Model
{
    use HasFactory;

    protected $table = 'alat';

    protected $guarded = ['id'];

    public function lab()
    {
        return $this->belongsTo(Lab::class);
    }
}
