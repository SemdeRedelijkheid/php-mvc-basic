<?php
namespace App\Repositories;

use PDO;

class UpgradeRepository extends Repository {

    function getAll() {
        $stmt = $this->connection->prepare("SELECT * FROM upgrades");
        $stmt->execute();

        $stmt->setFetchMode(PDO::FETCH_CLASS, 'App\\Models\\Upgrade');
        $upgrades = $stmt->fetchAll();

        return $upgrades;
    }


    public function insert($upgrade) {
        $stmt = $this->connection->prepare("INSERT INTO upgrades (name, description, cost) 
        VALUES (:name, :description, :cost)");
        
        $results = $stmt->execute([':name' => $upgrade->name, 
                                ':description' => $upgrade->description, 
                                ':cost' => $upgrade->cost]);
        return $results;
    }
}