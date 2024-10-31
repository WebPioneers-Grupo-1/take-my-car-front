<template>
  <div class="menu-principal">
    <div class="header">
      <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" />
      <router-link to="/" class="login">Inicio de Sesión</router-link>
    </div>
    <h1>Menú Principal</h1>
    <div class="menu-container">
      <nav>
        <ul class="menu-left">
          <li>
            <router-link to="/galeria-alquileres" class="menu-item">Galería de Autos</router-link>
          </li>
          <li>
            <router-link to="/autos-alquilados" class="menu-item">Ver Mis Alquileres</router-link>
          </li>
          <li>
            <router-link to="/anadir-auto" class="menu-item">Añadir Auto</router-link> <!-- Nueva opción -->
          </li>
        </ul>
      </nav>
    </div>

    <!-- Nueva sección añadida -->
    <div class="footer">
      <p class="developed-by">Desarrollado por:</p>
      <h2 class="company-name">WebPioneers</h2>
      <img src="../assets/img/logo1.png" alt="Logo de WebPioneers" class="footer-logo" />
      <p class="description">Somos una empresa desarrolladora dedicada a crear soluciones innovadoras.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuPrincipal',
  data() {
    return {
      isPropietario: false, // Variable para determinar si el usuario es propietario
    };
  },
  created() {
    // Comprobar el tipo de usuario en localStorage al crear el componente
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUserEmail = localStorage.getItem('currentUserEmail'); // Suponiendo que guardas el correo del usuario actual
    const currentUser = users.find(user => user.email === currentUserEmail);

    if (currentUser) {
      this.isPropietario = currentUser.userType === 'propietario'; // Verifica si el usuario es propietario
    }
  },
};
</script>

<style scoped>
.menu-principal {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #007bff; /* Borde azul */
  border-radius: 8px;
  background-color: #ffffff; /* Fondo blanco */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between; /* Espacio entre el logo y el inicio de sesión */
  align-items: center; /* Alinear verticalmente */
  margin-bottom: 20px; /* Espacio entre el header y el resto del menú */
}

.logo {
  height: 60px; /* Ajusta la altura del logo */
}

.login {
  text-decoration: none;
  color: #007bff; /* Azul para el enlace de inicio de sesión */
  font-size: 16px;
  transition: color 0.3s;
}

.login:hover {
  color: #0056b3; /* Color más oscuro al pasar el mouse */
}

.menu-container {
  margin-top: 20px;
}

nav {
  display: flex;
  justify-content: center; /* Centrar el menú */
}

.menu-left {
  list-style-type: none;
  padding: 0;
  display: flex; /* Mostrar elementos en fila */
}

.menu-left li {
  margin: 15px 10px; /* Espaciado entre los elementos */
}

.menu-item {
  display: block;
  padding: 10px 15px;
  border: 1px solid #007bff; /* Borde azul para los elementos del menú */
  border-radius: 5px;
  background-color: #ffffff; /* Fondo blanco para los elementos del menú */
  color: #007bff; /* Texto azul */
  transition: background-color 0.3s, transform 0.2s;
}

.menu-item:hover {
  background-color: #e7f1ff; /* Color claro al pasar el mouse */
  transform: scale(1.02); /* Efecto de aumento al pasar el mouse */
}

/* Estilos para la nueva sección del footer */
.footer {
  margin-top: 40px; /* Espaciado superior */
  text-align: center; /* Centrar texto */
}

.developed-by {
  font-size: 14px; /* Tamaño de fuente para "Desarrollado por:" */
  color: #007bff; /* Color azul */
  margin-bottom: 5px; /* Espacio debajo del texto */
}

.company-name {
  font-size: 24px; /* Tamaño de fuente para "WebPioneers" */
  font-weight: bold; /* Negrita */
  color: #007bff; /* Color azul */
  margin: 5px 0; /* Espaciado vertical */
}

.footer-logo {
  height: 50px; /* Ajusta la altura del logo */
  margin: 10px 0; /* Espacio arriba y abajo de la imagen */
}

.description {
  font-size: 14px; /* Tamaño de fuente para la descripción */
  color: #666; /* Color gris para la descripción */
}
</style>
