<?php

namespace App\Models;

use App\Models\Lab;
use App\Models\Alat;
use App\Models\GroupPAlat;
use Illuminate\Database\Eloquent\Model;
use PHPUnit\TextUI\XmlConfiguration\Group;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class P_alat extends Model
{
    use HasFactory;

    protected $table = 'p_alat';

    protected $guarded = ['id'];

    protected $fillable = [
        'primary_id', 'name', 'alat_id', 'total', 'event', 'date_start', 'date_end', 'time_start', 'time_end', 'desc', 'berkas'
    ];

    public function alat()
    {
        return $this->belongsTo(Alat::class);
    }
}
