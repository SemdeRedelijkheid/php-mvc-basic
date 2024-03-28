<?php
namespace App\Controllers;

class UpgradeController
{
    private $upgradeService;

    function __construct()
    {
        $this->upgradeService = new \App\Services\UpgradeService();
    }

    public function index()
    {
        $model = $this->upgradeService->getAll();
        require __DIR__ . '/../views/upgrade/index.php';
    }

    public function create() {        
        if($_SERVER['REQUEST_METHOD'] == "GET") {
            require '../views/upgrade/create.php';
        }

        if($_SERVER['REQUEST_METHOD'] == "POST") {

            $name = htmlspecialchars($_POST['name']);
            $description = htmlspecialchars($_POST['description']);        
            $cost = $_POST['cost'];      
            
            $upgrade = new \App\Models\Upgrade();
            $upgrade->name = $name;
            $upgrade->description = $description;
            $upgrade->cost = $cost;

            $this->upgradeService->insert($upgrade);

            $this->index();
        }
    }
}