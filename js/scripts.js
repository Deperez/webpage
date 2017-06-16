var libros = [];
libros [0] = ["./img/libro1.jpg","Calcetines rotos",16.70];
libros [1] = ["./img/libro3.jpg","Los Ritos del agua",20.00];
libros [2] = ["./img/libro4.jpg","Patria",15.90];
libros [3] = ["./img/libro5.jpg","El extraño verano",16.00];
libros [4] = ["./img/libro5.jpg","La habitacion en llamas",16.00];
libros [5] = ["./img/libro6.jpg","El secreto de ile-de-sein",21.80];
libros [6] = ["./img/libro7.jpg","Ocho dias de Marzo",15.90];
libros [7] = ["./img/libro8.jpg","Cinco Dias de octubre",15.90];
libros [8] = ["./img/libro9.jpg","El principito",10.90];

var contenedor = document.getElementById("container");
var titulos = document.getElementById("container").getElementsByTagName("h3");




var salida = "";
var counter = 1;
var suma = 0;

for(i=0;i<libros.length;i++){ 
	  
 if (i == 0) {
	 salida +=
		 "<div class='row'>";
 }	else if (i % 4 == 0)  {
	salida +=
		"</div> <div class='row'>";
 } 
       salida += "<div class='col-md-3 producto col-xs-12 col-sm-6'> <img alt='Libro 1' src='" 
        + libros[i][0] + 
        " ' class='img-rounded' style='width:50%' ><h3 class='text-primary text-center'>" 
        + "<b>Título:</b> " + libros[i][1] + 
        "</h3><p class='precios'>" + "€" 
        + libros[i][2] + 
        "</p><button id='buy-" 
        + i + 
        "' onClick='comprar(this)' type='button' class='btn btn-primary active btn-default compra'> Comprar </button></div>";

}
if (i !=0) {
salida += "</div>";

}

contenedor.innerHTML = salida;

function comprar(libro_indice){

	var index = libro_indice.id.split("-");
	var l = index[1];
		
	document.getElementById(libro_indice.id).setAttribute("disabled", "disabled");
	

    var table1 = document.getElementById("tabla_productos");
    var fila = table1.insertRow();
    fila.insertCell(0).innerHTML =  counter++;  
    fila.insertCell(1).innerHTML = libros[l][1];
    var cell3 = fila.insertCell(2);
    cell3.className = "precio";
    cell3.innerHTML = parseFloat(libros[l][2]).toFixed(2) + "€";

    actualizaTotales();


}

function actualizaTotales(){

	var tablaprecios = document.getElementById("tablaprecios");
	var lista_precios = document.querySelectorAll("#tabla_productos .precio");
	
	for(l = 0 ; l < lista_precios.length ; l++){

		suma += parseFloat(lista_precios[l].textContent.split("€")[0]);
	}
	
	document.getElementById("subtotal").innerHTML= parseFloat(suma).toFixed(2) + "€";
	

	
	var discount, discount_percent;
	if(lista_precios.length >=3 && lista_precios.length < 5 ){
		discount_percent = " (5%)";
		discount = parseFloat((parseFloat(suma).toFixed(2) * 5) / 100 ).toFixed(2);

	}else if(lista_precios.length >=5 && lista_precios.length <7){
		discount_percent = " (7,5%)";
		discount = parseFloat((parseFloat(suma).toFixed(2) * 5) / 100 ).toFixed(2);

	}else if(lista_precios.length >=7){
		discount_percent = " (10%)";
		discount = parseFloat((parseFloat(suma).toFixed(2) * 5) / 100 ).toFixed(2);
		
	}else{
		
		discount_percent = " (0%)";
		discount = 0.00;
	}

	document.getElementById("descuento").innerHTML = discount + "€"+ discount_percent;
	
	


 sumarIVA(suma, discount);
    
}
function sumarIVA(suma, discount){
  var preTotal = (suma - discount);
  document.getElementById("iva").innerHTML= parseFloat(preTotal*0.21).toFixed(2) + "€";
  document.getElementById("total").innerHTML= parseFloat(preTotal + preTotal*0.21).toFixed(2) + "€";
}



	






