<?php
include __DIR__ . '/../header.php';
?>

<div class="container text-center">
  <div class="row align-items-start">
    <div class="col-2 align-self-start">
      <h2>Friends</h2>
    </div>
    <div class="col-4 align-self-start">
        <h1>Cookie Clicker</h1>

        <p id="cookiebutton" class="btn btn-primary">cookie</p>

        <p id="totalCookiesCounter"></p>

        <p id="totalTimePlayed">0 hours 0 minutes</p>
    </div>
    <div class="col-6 align-self-start">
      <h2>Upgrades</h2>
      <table class="upgradesTable">
      <thead class="border">
          <tr>
              <th>Name</th>
              <th>description</th>
              <th>Cost</th>
              <th>Actions</th>
              <th>Level</th>
          </tr>
      </thead>
      <tbody class="border">
          <?php
          foreach ($model as $upgrade) {
              echo "<tr>";
              echo "<td>$upgrade->name</td>";
              echo "<td>$upgrade->description</td>";
              echo "<td>$upgrade->cost</td>";
              echo "<td><button id='upgradeBuy$upgrade->id' class='btn btn-primary'>Buy</button>";
              echo "<button id='upgradeSell$upgrade->id' class='btn btn-primary'>Sell</button>";
              echo "</td>";
              echo "<td id='upgradeLevel$upgrade->id'>0</td>";
              echo "</tr>";
          }
          ?>
      </tbody>    
      </table>
    </div>
  </div>
</div>

<?php
include __DIR__ . '/../footer.php';
?>