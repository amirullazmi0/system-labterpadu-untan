<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Lab;
use App\Models\Temp_berkas;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            [
                'nip' => 'Super00admin',
                'name' => 'Admin Lab Terpadu',
                'password' => bcrypt('Adminlabterpadu2023'),
                'level' => 0,
                'lab_id' => '1',
                'email' => 'amirullazmi0@gmail.com',
                'address' => '',
            ],
            [
                'nip' => 'nipdosen',
                'name' => 'Dummy Dosen',
                'password' => bcrypt('11111'),
                'level' => 1,
                'lab_id' => '4',
                'email' => 'amirullazmi0@gmail.com',
                'address' => '',
            ],
            [
                'nip' => 'niplaboran',
                'name' => 'Dummy Laboran',
                'password' => bcrypt('11111'),
                'level' => 2,
                'lab_id' => '7',
                'email' => 'amirullazmi0@gmail.com',
                'address' => '',
            ],
        ];

        foreach ($user as $key => $value) {
            User::create($value);
        }

        $lab = [
            [
                'name' => 'Biologi',
                'desc' => 'Laboratorium Biologi Lab Terpadu',
            ],
            [
                'name' => 'Data Intelligence',
                'desc' => 'Laboratorium Data Intelligence Lab Terpadu',
            ],
            [
                'name' => 'Fisika',
                'desc' => 'Laboratorium Kimia Lab Terpadu',
            ],
            [
                'name' => 'Kimia',
                'desc' => 'Laboratorium Kimia Lab Terpadu',
            ],
            [
                'name' => 'Multimedia Dan Komunikasi',
                'desc' => 'Laboratorium Multimedia Dan Komunikasi Lab Terpadu',
            ],
            [
                'name' => 'Penyelenggaraan Informasi Geospasial',
                'desc' => 'Laboratorium Penyelenggaraan Informasi Geospasial Lab Terpadu',
            ],
            [
                'name' => 'Studio Gambar',
                'desc' => 'Laboratorium Studio Gambar Lab Terpadu',
            ]
        ];

        foreach ($lab as $key => $value) {
            Lab::create($value);
        }

        $temp_berkas = [
            [
                'name' => 'Template Peminjaman Ruangan',
                'berkas' => '',
            ],
            [
                'name' => 'Template Peminjaman Alat',
                'berkas' => '',
            ],
        ];

        foreach ($temp_berkas as $key => $value) {
            Temp_berkas::create($value);
        }
    }
}
