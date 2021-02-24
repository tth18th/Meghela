
const cart = document.getElementById('cart');
const cursos = document.getElementById('list-cour');
const listaCursos = document.querySelector('#lista-carrito tbody');
const emptyCartoBtn = document.getElementById('empty-cart');

cargarEventListeners();
function cargarEventListeners() {
  cursos.addEventListener('click', buyCourse);
  cart.addEventListener('click', deletecor);
  emptyCartoBtn.addEventListener('click', emptyCart);
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


function buyCourse(e) {
  e.preventDefault();

  if(e.target.classList.contains('add-cart')) {
    const curso = e.target.parentElement.parentElement;

    leerDatosCurso(curso);
  }
}

function leerDatosCurso(course) {
  const infoCourse = {
    image: course.querySelector('img').src,
    Name: course.querySelector('h4').textContent,
    cost: course.querySelector('.price').textContent,
    id: course.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoCourse);
}

function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${curso.image}" width=100>
  </td>
  <td>${curso.Name}</td>
  <td>${curso.cost}</td>
  <td>
  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
  </td>
  `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}

function deletecor(e) {
  e.preventDefault();
  let curso,
      cursoId;
  if(e.target.classList.contains('borrar-curso') ) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');
  }
  eliminarCursoLocalStorage(cursoId);
}
function emptyCart() {

  while(listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

 vaciarLocalStorage();
  return false;
}

function guardarCursoLocalStorage(curso) {
  let cursos;
  cursos = obtenerCursosLocalStorage();
  cursos.push(curso);
  localStorage.setItem('cursos', JSON.stringify(cursos) );
}

function obtenerCursosLocalStorage() {
  let cursosLS;
  if(localStorage.getItem('cursos') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse( localStorage.getItem('cursos') );
  }
  return cursosLS;
}

function leerLocalStorage() {
  let cursosLS;
  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach(function(curso){
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${curso.image}" width=100>
  </td>
  <td>${curso.Name}</td>
  <td>${curso.cost}</td>
  <td>
  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
  </td>
  `;
  listaCursos.appendChild(row);
  });
}

function eliminarCursoLocalStorage(curso) {
  let cursosLS;
  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach(function(cursoLS, index) {
    if(cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });
  localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

function vaciarLocalStorage() {
  localStorage.clear();
}
