<?php
namespace App\Services;

class UpgradeService {
    public function getAll() {
        $repository = new \App\Repositories\UpgradeRepository();
        return $repository->getAll();
    }

    public function insert($upgrade) {
        $repository = new \App\Repositories\UpgradeRepository();
        return $repository->insert($upgrade);
    }
}