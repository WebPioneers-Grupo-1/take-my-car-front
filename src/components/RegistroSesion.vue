<template>
    <div class="container">
      <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" />
      <h1>Registro</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" class="primary-button">Registrar</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p>¿Ya tienes una cuenta? <router-link to="/" class="link">Inicia sesión aquí</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegistroSesion',
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
        successMessage: '', // Nuevo mensaje de éxito
      };
    },
    methods: {
      register() {
        this.errorMessage = ''; // Resetear mensaje de error
        this.successMessage = ''; // Resetear mensaje de éxito
  
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Comprobar si el correo ya está registrado
        const exists = users.some(user => user.email === this.email);
  
        if (exists) {
          this.errorMessage = 'Este correo electrónico ya está registrado.';
        } else if (!this.validateEmail(this.email)) {
          this.errorMessage = 'El formato del correo electrónico es inválido.';
        } else {
          // Agregar nuevo usuario
          users.push({ email: this.email, password: this.password });
          localStorage.setItem('users', JSON.stringify(users));
          this.successMessage = 'Registro exitoso. Puedes iniciar sesión ahora.'; // Mensaje de éxito
          this.$router.push({ name: 'MenuPrincipal' }); // Redirige al menú principal
        }
      },
      validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato de email
        return re.test(email);
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
  
  .success {
    color: green; /* Color para el mensaje de éxito */
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
  