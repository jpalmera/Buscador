$(function(){
  $('#mostrarTodos').on('click',mostrarTodos)
  setSelect();
  $('select').material_select();
})

function mostrarTodos(event){
  event.preventDefault();
  $('.itemMostrado').remove();
  $.ajax({
    url:'busqueda.php',
    type:'POST',
    data:{}
  }).done(function(data){
    var datos = JSON.parse(data);

    setTitlesAll(datos);
  })
}

function mostrarFiltros(){
  $('.itemMostrado').remove();
  var ciudad = $('#selectCiudad').val();
  var tipo = $('#selectTipo').val();
  var rango = $('#rangoPrecio').val();
  var filtro= 'ciudad='+ciudad +'&tipo='+tipo+'&precio='+rango;

  $.ajax({
    url:'filtro.php',
    type:'POST',
    data:filtro
  }).done(function(data){
    if (!($.isEmptyObject(data))){
      var datos = JSON.parse(data);
      setTitlesAll(datos);
    }else{
      $(".colContenido").html('<div class="tituloContenido card"><h5>No se encuentran resultados de la búsqueda!</h5><div class="divider"></div><button type="button" name="todos" class="btn-flat waves-effect" id="mostrarTodos">Mostrar Todos</button></div>');
    }
  })
  return false;
}


function setSelect(){
  $.ajax({
    url:"busqueda.php",
    type:"POST",
    data:{}
  }).done (function(data){
    var datos = JSON.parse(data);
    var ciudades = setCiudades(datos);
    setTitlesCiudades(ciudades);

    var tipos = setTipos(datos);
    setTitlesTipos(tipos);
  })
}

function setCiudades(datos){
  var org=[];
  $.each(datos, function(i, item) {
    org[org.length]=item.Ciudad;
  });
  Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });
  return (org.unique()) ;
}

function setTipos(datos){
  var orgTipos=[];
  $.each(datos, function(i, item) {
    orgTipos[orgTipos.length]=item.Tipo;
  });
  Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });
  return (orgTipos.unique()) ;
}

function setTitlesCiudades(ciudades){
  for(i=0;i<ciudades.length;i++){
    $('#selectCiudad').append('<option value="'+ciudades[i]+'">'+ciudades[i]+'</option>');
  }
    $("select").material_select('update');
}

function setTitlesTipos(tipos){
  for(i=0;i<tipos.length;i++){
    $('#selectTipo').append('<option value="'+tipos[i]+'">'+tipos[i]+'</option>');
  }
    $("select").material_select('update');
}

function setTitlesAll(datos){
  $.each(datos, function(i, item) {
     $('.colContenido').append(
       '<div class="itemMostrado card">'+
       '<img src="img/home.jpg">'+
       '<div class="card-stacked">'+
       '<span><strong>Dirección :</strong>'+item.Direccion+'</span><br />'+
       '<span><strong>Ciudad : </strong>'+item.Ciudad+'</span><br />'+
       '<span><strong>Telefono : </strong>'+item.Telefono+'</span><br />'+
       '<span><strong>Codigo Postal : </strong>'+item.Codigo_Postal+'</span><br />'+
       '<span><strong>Tipo : </strong>'+item.Tipo+'</span><br />'+
       '<span><strong>Precio : </strong><span class="precioTexto">'+item.Precio+'</span></span><br /><br />'+

     '<div class="divider"></div>'+
     '<div class="card-action">VER MAS</div>'+
       '</div></div>'
     )
  })
}
