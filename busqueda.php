<?php
$data = getData();
  echo json_encode($data);

  function getData(){
    $data_readed = file_get_contents("data-1.json");
    $data = json_decode($data_readed, true);
    return $data;
  }
 ?>
