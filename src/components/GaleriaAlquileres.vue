<template>
  <div class="galeria-alquileres">
    <h2>Galería de Autos Disponibles</h2>
    <div class="action-buttons">
      <button @click="goToMenu" class="volver-btn">
        <i class="fas fa-arrow-left"></i> Volver al Menú Principal
      </button>
      <button @click="updateCars" class="actualizar-btn">
        <i class="fas fa-sync-alt"></i> Actualizar Autos
      </button>
    </div>
    <div class="autos-list">
      <div v-if="availableCars.length === 0" class="no-autos">
        <p>No hay autos disponibles en este momento.</p>
      </div>
      <div class="auto" v-for="(car, index) in availableCars" :key="index">
        <img :src="getValidImage(car.image)" :alt="car.model" class="auto-image" @error="handleImageError" />
        <div class="auto-details">
          <h3>{{ car.model }}</h3>
          <p><strong>Precio por día:</strong> ${{ car.price }}</p>
          <button @click="goToPaymentMethods(car)" class="reservar-btn">
            Reservar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../eventBus'; // Ajusta la ruta según tu estructura

export default {
  name: 'GaleriaAlquileres',
  data() {
    return {
      rentals: this.getRentals(),
      defaultImage: 'https://via.placeholder.com/150', // URL de la imagen por defecto
    };
  },
  computed: {
    availableCars() {
      const cars = this.getCars();
      const rentedModels = this.rentals.map((rental) => rental.carModel);
      return cars.filter((car) => !rentedModels.includes(car.model));
    },
  },
  methods: {
    getRentals() {
      try {
        return JSON.parse(localStorage.getItem('rentals')) || [];
      } catch (error) {
        console.error('Error al obtener rentals:', error);
        return [];
      }
    },
    getCars() {
      try {
        return JSON.parse(localStorage.getItem('cars')) || [];
      } catch (error) {
        console.error('Error al obtener cars:', error);
        return [];
      }
    },
    getValidImage(imageUrl) {
      return imageUrl && this.isValidUrl(imageUrl) ? imageUrl : this.defaultImage;
    },
    isValidUrl(url) {
      return url.startsWith('http') || url.startsWith('https');
    },
    goToPaymentMethods(car) {
      localStorage.setItem('reservationDetails', JSON.stringify({
        carModel: car.model,
        totalPrice: car.price,
        days: 1,
        imageUrl: car.image
      }));
      this.$router.push({ name: 'MetodosPago' });
    },
    goToMenu() {
      this.$router.push({ name: 'MenuPrincipal' });
    },
    updateCars() {
      this.rentals = this.getRentals(); // Actualiza la lista de rentals
      this.$forceUpdate(); // Fuerza la actualización del componente
      alert('Autos actualizados.');
    },
    handleImageError(event) {
      console.log('Error al cargar la imagen:', event.target.src); // Para depurar
      event.target.src = this.defaultImage; // Cambia a una imagen de respaldo
    },
  },
  created() {
    eventBus.on('carReturned', this.returnCarToGallery);
  },
  beforeUnmount() {
    eventBus.off('carReturned', this.returnCarToGallery);
  },
};
</script>

<style scoped>
.galeria-alquileres {
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #007bff;
  margin-bottom: 30px;
  font-size: 28px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.volver-btn, .actualizar-btn {
  background-color: #ffffff;
  color: #007bff;
  border: 2px solid #007bff;
  padding: 12px 25px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.volver-btn i, .actualizar-btn i {
  font-size: 18px;
}

.volver-btn:hover, .actualizar-btn:hover {
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
  transform: translateY(-2px);
}

.autos-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.auto {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.auto:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.auto-image {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.auto-details {
  margin-top: 15px;
  text-align: center;
}

.auto-details h3 {
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
}

.auto-details p {
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
}

.reservar-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.reservar-btn:hover {
  background-color: #218838;
}

.no-autos {
  text-align: center;
  font-style: italic;
  color: #777;
}
</style>
