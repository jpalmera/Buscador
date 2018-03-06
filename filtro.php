<?php

  //print json_encode($data[0]["Direccion"]);
  $ciudad = $_POST["ciudad"];
  $tipo = $_POST["tipo"];
  $rangoPrecio = explode(";",$_POST["precio"]);
  $rangoPrecio_i = intval($rangoPrecio[0]);
  $rangoPrecio_f = intval($rangoPrecio[1]);

  //$dataEncode = json_encode($data);
  $data = getData();

  if($ciudad=="null" && $tipo=="null"){
    foreach ($data as $key => $value) {
      $quitar = array("$",",");
      $valorprecio = str_replace($quitar,"",$value["Precio"]);
      $valorprecio = intval($valorprecio);
      if($valorprecio>=$rangoPrecio_i && $valorprecio<$rangoPrecio_f){
        $datos[]=$data[$key];
      }
    }
  }

  if($ciudad=="null" && $tipo!="null"){
    foreach ($data as $key => $value) {
      $quitar = array("$",",");
      $valorprecio = str_replace($quitar,"",$value["Precio"]);
      $valorprecio = intval($valorprecio);
      if($value["Tipo"]==$tipo && $valorprecio>=$rangoPrecio_i && $valorprecio<$rangoPrecio_f){
        $datos[]=$data[$key];
      }
    }
  }

  if($ciudad!="null" && $tipo=="null"){
    foreach ($data as $key => $value) {
      $quitar = array("$",",");
      $valorprecio = str_replace($quitar,"",$value["Precio"]);
      $valorprecio = intval($valorprecio);
      if($value["Ciudad"]==$ciudad && $valorprecio>=$rangoPrecio_i && $valorprecio<$rangoPrecio_f){
        $datos[]=$data[$key];
      }
    }
  }

  if($ciudad!="null" && $tipo!="null"){
    foreach ($data as $key => $value) {
      $quitar = array("$",",");
      $valorprecio = str_replace($quitar,"",$value["Precio"]);
      $valorprecio = intval($valorprecio);
      if($value["Tipo"]==$tipo && $value["Ciudad"]==$ciudad && $valorprecio>=$rangoPrecio_i && $valorprecio<$rangoPrecio_f){
        $datos[]=$data[$key];
      }
    }
  }

  //echo $precio_i;


    echo json_encode($datos);

  function getData(){
    $data_readed = file_get_contents("data-1.json");
    $data = json_decode($data_readed, true);
    return $data;
  }
 ?>
