<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Temp_berkas extends Model
{
    use HasFactory;

    protected $table = 'temp_berkas';

    protected $guarded = ['id'];

    protected $fillable = [
        'name', 'berkas'
    ];
}
