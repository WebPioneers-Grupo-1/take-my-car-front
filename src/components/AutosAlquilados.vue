<template>
  <div class="menu-principal">
    <!-- Encabezado con logo -->
    <header class="header">
      <img src="../assets/img/takelogo.png" alt="Logo" class="logo" />
      <h1>Autos Alquilados</h1>
    </header>
    
    <h2>Alquileres Registrados</h2>
    
    <div class="rental-list">
      <div v-if="userRentals.length === 0" class="no-rentals">
        <p>No hay alquileres registrados.</p>
      </div>
      <div class="rental" v-for="(rental, index) in userRentals" :key="index">
        <img 
          :src="rental.imageUrl"  
          :alt="rental.carModel" 
          class="car-image" 
          @error="handleImageError" 
        />
        <div class="rental-details">
          <h3 class="car-model">{{ rental.carModel }}</h3>
          <p><strong>Días de Alquiler:</strong> {{ rental.days }}</p>
          <p><strong>Seguro Adicional:</strong> {{ rental.addInsurance ? 'Sí' : 'No' }}</p>
          <p><strong>GPS:</strong> {{ rental.addGPS ? 'Sí' : 'No' }}</p>
          <p><strong>Asiento para Niños:</strong> {{ rental.addChildSeat ? 'Sí' : 'No' }}</p>
          <p><strong>Método de Pago:</strong> {{ rental.paymentMethod }}</p>
          <p class="total-price"><strong>Precio Total:</strong> ${{ calculateTotalWithExtras(rental) }}</p>
          <button class="cancel-button" @click="cancelRental(index)">Cancelar Alquiler</button>
        </div>
      </div>
    </div>
    
    <button @click="goToHome" class="back-button">Volver al Menú Principal</button>
  </div>
</template>

<script>
import { eventBus } from '../eventBus'; // Asegúrate de que la ruta sea correcta

export default {
  name: 'AutosAlquilados',
  data() {
    return {
      currentUserEmail: localStorage.getItem('currentUser') || '',
      rentals: JSON.parse(localStorage.getItem('rentals')) || [],
    };
  },
  computed: {
    userRentals() {
      const rentals = this.rentals.filter(rental => rental.userEmail === this.currentUserEmail);
      console.log('User Rentals:', rentals); // Depuración: Verifica los alquileres del usuario
      return rentals;
    },
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'MenuPrincipal' });
    },
    cancelRental(index) {
      if (confirm('¿Estás seguro de que deseas cancelar este alquiler?')) {
        const rentalToRemove = this.userRentals[index];

        this.returnCarToGallery(rentalToRemove);

        this.rentals = this.rentals.filter(rental => rental !== rentalToRemove);
        localStorage.setItem('rentals', JSON.stringify(this.rentals));

        alert('El alquiler ha sido cancelado.');
      }
    },
    returnCarToGallery(rental) {
      const returnedCar = {
        model: rental.carModel,
        image: rental.imageUrl,
        price: rental.price,
      };
      eventBus.emit('carReturned', returnedCar);
    },
    handleImageError(event) {
      console.log('Error al cargar la imagen:', event.target.src);
      event.target.src = 'https://via.placeholder.com/150';
    },
    handleCarReturned(returnedCar) {
      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      const carExists = cars.some(car => car.model === returnedCar.model);
      if (!carExists) {
        cars.push(returnedCar);
        localStorage.setItem('cars', JSON.stringify(cars));
        alert(`${returnedCar.model} ha sido devuelto a la galería.`);
      } else {
        alert(`El auto ${returnedCar.model} ya está en la galería.`);
      }
    },
    calculateTotalWithExtras(rental) {
      let total = rental.price; // Comienza con el precio base
      console.log('Rental Data for Total Calculation:', rental); // Depuración: Verifica los datos del alquiler

      // Añade costos adicionales si el seguro está activado
      if (rental.addInsurance) {
        total += 20; // Ajusta el precio según sea necesario
        console.log('Insurance added. New Total:', total); // Depuración
      }
      // Añade costos adicionales si GPS está activado
      if (rental.addGPS) {
        total += 15; // Ajusta el precio según sea necesario
        console.log('GPS added. New Total:', total); // Depuración
      }
      // Añade costos adicionales si asiento para niños está activado
      if (rental.addChildSeat) {
        total += 10; // Ajusta el precio según sea necesario
        console.log('Child seat added. New Total:', total); // Depuración
      }

      return total; // Devuelve el precio total con los extras
    },
  },
  created() {
    eventBus.on('carReturned', this.handleCarReturned);
  },
  beforeUnmount() {
    eventBus.off('carReturned', this.handleCarReturned);
  },
};
</script>

<style scoped>
.menu-principal {
  padding: 20px;
  background-color: #f8f9fa; /* Fondo claro */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-radius: 8px;
}

.logo {
  max-width: 120px;
}

h1 {
  color: white;
  margin: 0;
  font-size: 24px;
}

h2 {
  color: #007bff; /* Azul claro */
  text-align: center;
}

.rental-list {
  margin-top: 20px;
}

.no-rentals {
  text-align: center;
  color: #6c757d; /* Texto gris */
}

.rental {
  background-color: #ffffff; /* Fondo blanco para cada alquiler */
  border: 1px solid #007bff; /* Borde azul claro */
  border-radius: 8px;
  padding: 10px; /* Reduce el padding */
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  transition: transform 0.3s; /* Efecto hover */
}

.rental:hover {
  transform: scale(1.02); /* Aumenta ligeramente al hacer hover */
}

.car-image {
  max-width: 80px; /* Ancho reducido de la imagen */
  height: auto;
  border-radius: 5px; /* Bordes redondeados */
  margin-right: 10px; /* Espacio entre la imagen y los detalles */
}

.rental-details {
  flex: 1; /* Ocupa el espacio restante */
}

.car-model {
  font-size: 1.2em; /* Texto ligeramente más grande para el modelo */
}

.cancel-button {
  background-color: #dc3545; /* Rojo */
  color: white;
  border: none;
  padding: 8px 12px; /* Reduce el padding */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer;
  transition: background-color 0.3s; /* Efecto de transición */
}

.cancel-button:hover {
  background-color: #c82333; /* Rojo oscuro en hover */
}

.back-button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff; /* Azul claro */
  color: white;
  border: none;
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3; /* Azul oscuro en hover */
}

.total-price {
  font-size: 16px; /* Ajusta el tamaño de la fuente si es necesario */
  font-weight: bold; /* Texto en negrita */
  color: #03A9F4; /* Color distinto para el precio total */
  margin-top: 10px; /* Añade espacio superior */
}
</style>
