<template>
  <div class="add-car-container">
    <div class="header">
      <img src="../assets/img/takelogo.png" alt="Logo de la Empresa" class="logo" />
      <h2>Añadir Auto</h2>
    </div>
    <div class="form-container">
      <input v-model="model" placeholder="Modelo del auto" class="input-field" />
      <input v-model="price" placeholder="Precio por día" type="number" min="0" class="input-field" />
      <input v-model="image" placeholder="URL de la imagen" class="input-field" />
      <div class="button-container">
        <button @click="addCar" class="add-button">Añadir Auto</button>
        <button @click="goToGallery" class="view-gallery-button">Ver Galería</button>
      </div>
    </div>
    <p v-if="message" class="confirmation-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: '',
      price: '',
      image: '',
      message: '', // Mensaje de confirmación
    };
  },
  methods: {
    validateInputs() {
      if (!this.model || !this.price || !this.image) {
        alert('Por favor, completa todos los campos.');
        return false;
      }
      return true;
    },
    addCar() {
      if (!this.validateInputs()) return; // Validar entradas antes de continuar

      const newCar = {
        model: this.model,
        price: parseFloat(this.price), // Asegúrate de que el precio sea un número
        image: this.image,
      };

      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      cars.push(newCar);
      localStorage.setItem('cars', JSON.stringify(cars));

      // Limpiar los campos
      this.model = '';
      this.price = '';
      this.image = '';

      // Mensaje de confirmación
      this.message = 'Auto añadido exitosamente!';

      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        this.message = '';
      }, 3000);
    },
    goToGallery() {
      this.$router.push({ name: 'GaleriaAlquileres' }); // Asegúrate de que el nombre de la ruta sea correcto
    },
  },
};
</script>

<style>
.add-car-container {
  max-width: 600px; /* Limitar el ancho máximo */
  padding: 30px;
  background-color: #f9f9fb; /* Fondo más claro */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center; /* Centrar texto y elementos */
  margin: 50px auto; /* Centrar el contenedor */
}

.header {
  display: flex;
  align-items: center; /* Alinear verticalmente */
  margin-bottom: 20px; /* Espacio entre el logo y el título */
}

.logo {
  width: 80px; /* Ajustar el tamaño del logo */
  height: auto; /* Mantener la proporción */
  margin-right: 20px; /* Espacio entre el logo y el título */
}

h2 {
  color: #003366; /* Azul más oscuro para el encabezado */
  font-size: 24px; /* Tamaño de fuente más grande */
  margin: 0; /* Eliminar margen del encabezado */
}

.form-container {
  display: flex;
  flex-direction: column; /* Colocar los elementos en columna */
  align-items: stretch; /* Estirar los elementos al ancho completo */
}

.input-field {
  width: 100%; /* Asegúrate de que los campos ocupen todo el ancho */
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #007bff; /* Borde azul claro */
  border-radius: 5px; /* Bordes redondeados */
  box-sizing: border-box; /* Para que el padding no afecte el tamaño total */
  font-size: 16px; /* Tamaño de fuente más grande */
}

.button-container {
  display: flex;
  justify-content: space-between; /* Espacio entre los botones */
  margin-top: 15px; /* Margen superior para los botones */
}

.add-button, .view-gallery-button {
  padding: 12px 20px;
  border: none;
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Efecto de transición */
  font-size: 16px; /* Tamaño de fuente más grande */
}

.add-button {
  background-color: #007bff; /* Azul claro */
  color: white;
  width: 48%; /* Ancho de botón ajustado */
}

.view-gallery-button {
  background-color: #6c757d; /* Gris */
  color: white;
  width: 48%; /* Ancho de botón ajustado */
}

.add-button:hover {
  background-color: #0056b3; /* Azul oscuro en hover */
  transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
}

.view-gallery-button:hover {
  background-color: #5a6268; /* Gris oscuro en hover */
  transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
}

.confirmation-message {
  color: green;
  margin-top: 15px;
  font-size: 16px; /* Tamaño de fuente más grande */
  text-align: center; /* Centrar el mensaje */
}
</style>
