document.addEventListener("DOMContentLoaded", ()=>{
	app();
})

const cursosListado=document.querySelector("#cursos-listado");
const tabla=document.querySelector("#carrito")
const contenedorCarrito=document.querySelector("#carrito tbody");
const botonBorrar=document.querySelector(".borrar-curso");
const vaciarCarrito=document.querySelector("#vaciar-carrito")

let agregarCarrito=[];



function app(){

	addEventListener();






	footer();
}

function addEventListener(){
	cursosListado.addEventListener("click", obtenerCursos);
	tabla.addEventListener("click", borrarCurso);
	vaciarCarrito.addEventListener("click",()=>{
		agregarCarrito=[];
		agregarCarritoHtml();
	})

	agregarCarrito=JSON.parse(localStorage.getItem('curso')) || [];
	agregarCarritoHtml();

}

function borrarCurso(e){
	const boton=e.target.classList.contains('borrar-curso');

	if(boton){

		const cursoId=e.target.getAttribute("data-id");

		agregarCarrito=agregarCarrito.filter(curso=>curso.id !== cursoId);
		agregarCarritoHtml();

	}
}

function obtenerCursos(e){
	e.preventDefault();
	if(e.target.classList.contains("agregar_carrito")){
		const curso=e.target.parentElement.parentElement.parentElement;

		leerCurso(curso);
	}
}


function footer(){
	const footerCarrito=document.querySelector(".footer");

	const year=new Date().getFullYear();
	// console.log(year);

	const derechosAutor=document.createElement("P");
	derechosAutor.innerHTML=`Todos los derechos reservados &#169 ${year}. Luis Alberto Lozano Rodriguez.`;
	derechosAutor.classList.add("footer-derechos");

	footerCarrito.appendChild(derechosAutor);
}

function leerCurso(curso){
	console.log(curso);
	const objCurso={
		img:curso.querySelector("img").src,
		titulo:curso.querySelector("h3").textContent,
		precio:curso.querySelector(".precio-original").textContent,
		cantidad:1,
		id:curso.querySelector("a").getAttribute("data-id")
	}

	const existe=agregarCarrito.some(curso=>curso.id === objCurso.id);
	if (existe) {
		 const cursos=agregarCarrito.map(curso=>{//se retorna el valor que queremos que guarde en el array ya modificado
		 	if(curso.id === objCurso.id){ //si al encontrar el id se repite uno 
		 		curso.cantidad++; //a curso.cantidad se le aumenta uno o a ese curso
		 		return curso;
		 	}else{
		 		return curso;//que retorne el curso aunque no haya sido modificado
		 	}
		 });

		 agregarCarrito=[...cursos];//para que el array haga una copia con el nuevo cambio y trae la variable 
		 
	}else{
		agregarCarrito=[...agregarCarrito, objCurso]
	}
	
	agregarCarritoHtml();

}



function agregarCarritoHtml(){
	limpiarHtml();
	// console.log(agregarCarrito)
	// const row=document.createElement("tr");
	
	agregarCarrito.forEach(curso=>{
		const {img, titulo, precio, id, cantidad}=curso;
		const row=document.createElement("TR");
		row.innerHTML=`
		<td><img src="${img}" alt="" style="width:90px"></td>
		<td><h3>${titulo}</h3></td>
		<td><p>${precio}</p></td>
		<td><p>${cantidad}</p></td>
		<td><a href="#" class="borrar-curso" data-id=${id}>X</a></td>
		`;


		contenedorCarrito.appendChild(row);//cada que agrega integra el mismo dato
		
	})

	agregarLocal();
}

function agregarLocal(){
	localStorage.setItem('curso',JSON.stringify(agregarCarrito));
}

function limpiarHtml(){
	while(contenedorCarrito.firstChild){
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}