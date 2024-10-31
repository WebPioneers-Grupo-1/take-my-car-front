<template>
  <div class="container">
    <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" /> <!-- Imagen añadida -->
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" class="primary-button">Iniciar Sesión</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>¿No tienes una cuenta? <router-link to="/registro" class="link">Regístrate aquí</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'IniciarSesion',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem('users')) || []; // Obtener usuarios de localStorage

      // Buscar el usuario por correo y contraseña
      const user = users.find(user => user.email === this.email && user.password === this.password);

      if (user) {
        // Almacena el objeto del usuario actual en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.$router.push({ name: 'MenuPrincipal' }); // Redirige al menú principal
      } else {
        this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 100%; /* Ajusta el tamaño de la imagen */
  max-width: 200px; /* Ancho máximo para la imagen */
  margin-bottom: 20px; /* Espacio debajo de la imagen */
}

h1 {
  color: #007bff; /* Azul */
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left; /* Alinear etiquetas a la izquierda */
}

label {
  color: #333; /* Color de texto */
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #007bff; /* Borde azul */
  border-radius: 4px;
  margin-top: 5px; /* Espacio entre la etiqueta y el input */
}

.primary-button {
  background-color: #007bff; /* Azul */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px; /* Espacio antes del botón */
}

.primary-button:hover {
  background-color: #0056b3; /* Azul más oscuro */
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
}

.link {
  color: #007bff; /* Color azul para el enlace */
  text-decoration: none; /* Sin subrayado */
}

.link:hover {
  text-decoration: underline; /* Subrayar al pasar el mouse */
}
</style>
