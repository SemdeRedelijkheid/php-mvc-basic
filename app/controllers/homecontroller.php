<?php
namespace App\Controllers;

class HomeController
{
    private $upgradeService;

    function __construct()
    {
        $this->upgradeService = new \App\Services\UpgradeService();
    }

    public function index()
    {
        $model = $this->upgradeService->getAll();
        require __DIR__ . '/../views/home/index.php';
    }

    public function about()
    {
        require __DIR__ . '/../views/home/about.php';
    }
}