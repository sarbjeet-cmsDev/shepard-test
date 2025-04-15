<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Contracts\Tenant;


class Tenant extends Model
{
    use HasFactory;

    public function databaseName()
    {
        return $this->data['db'] ?? parent::databaseName();
    }

}
