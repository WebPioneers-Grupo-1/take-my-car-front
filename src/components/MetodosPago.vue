<template>
  <div class="metodos-pago">
    <h2>Métodos de Pago</h2>
    <p class="car-model">Estás reservando el auto: <strong>{{ reservationDetails.carModel }}</strong></p>
    <p class="price-base">Precio base por día: <strong>${{ pricePerDay }}</strong></p>

    <div class="input-group">
      <label for="rentalDays">Cantidad de días:</label>
      <input
        type="number"
        v-model="days"
        min="1"
        id="rentalDays"
        class="input-field"
      />
    </div>

    <div class="checkbox-group">
      <label>
        <input
          type="checkbox"
          v-model="addInsurance"
        />
        Añadir seguro (Costo adicional: ${{ insuranceCost }})
      </label>

      <label>
        <input
          type="checkbox"
          v-model="addGPS"
        />
        Añadir GPS (Costo adicional: ${{ gpsCost }})
      </label>

      <label>
        <input
          type="checkbox"
          v-model="addChildSeat"
        />
        Añadir asiento para niños (Costo adicional: ${{ childSeatCost }})
      </label>
    </div>

    <div class="input-group">
      <label for="paymentMethod">Método de Pago:</label>
      <select v-model="selectedPaymentMethod" id="paymentMethod" class="input-field">
        <option value="" disabled selected>Selecciona un método de pago</option>
        <option value="creditCard">Tarjeta de Crédito</option>
        <option value="debitCard">Tarjeta de Débito</option>
        <option value="paypal">PayPal</option>
      </select>
    </div>

    <div class="summary">
      <p><strong>Días de Alquiler:</strong> {{ days }}</p>
      <p><strong>Seguro Adicional:</strong> {{ addInsurance ? 'Sí' : 'No' }}</p>
      <p><strong>GPS:</strong> {{ addGPS ? 'Sí' : 'No' }}</p>
      <p><strong>Asiento para Niños:</strong> {{ addChildSeat ? 'Sí' : 'No' }}</p>
      <p class="total-price" @mouseover="hover = true" @mouseleave="hover = false">
        <strong>Precio Total:</strong> <span :class="{ 'hover-effect': hover }">${{ totalPrice }}</span>
      </p>
      <p v-if="selectedPaymentMethod"><strong>Método de Pago Seleccionado:</strong> {{ selectedPaymentMethod }}</p>
    </div>
    
    <button @click="confirmRental" :disabled="!selectedPaymentMethod">Confirmar Alquiler</button>
    <button class="back-button" @click="goBack">Volver al Menú</button>
  </div>
</template>

<script>
export default {
  name: 'MetodosPago',
  data() {
    return {
      reservationDetails: JSON.parse(localStorage.getItem('reservationDetails')) || {},
      days: 1,
      addInsurance: false,
      addGPS: false,
      addChildSeat: false,
      insuranceCost: 20,
      gpsCost: 15,
      childSeatCost: 10,
      pricePerDay: 25,
      selectedPaymentMethod: '',
      hover: false
    };
  },
  computed: {
    totalPrice() {
      const basePrice = this.pricePerDay * this.days;
      const insuranceFee = this.addInsurance ? this.insuranceCost : 0;
      const gpsFee = this.addGPS ? this.gpsCost : 0;
      const childSeatFee = this.addChildSeat ? this.childSeatCost : 0;
      return basePrice + insuranceFee + gpsFee + childSeatFee;
    },
  },
  methods: {
    confirmRental() {
      if (!this.selectedPaymentMethod) {
        alert('Por favor, selecciona un método de pago.');
        return;
      }

      const cars = JSON.parse(localStorage.getItem('cars')) || [];
      const updatedCars = cars.filter(car => car.model !== this.reservationDetails.carModel);
      localStorage.setItem('cars', JSON.stringify(updatedCars));

      const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
      rentals.push({
        carModel: this.reservationDetails.carModel,
        price: this.totalPrice,
        days: this.days,
        imageUrl: this.reservationDetails.imageUrl,
        userEmail: localStorage.getItem('currentUser'),
        addInsurance: this.addInsurance,
        addGPS: this.addGPS,
        addChildSeat: this.addChildSeat,
        paymentMethod: this.selectedPaymentMethod,
      });
      localStorage.setItem('rentals', JSON.stringify(rentals));

      alert('Alquiler registrado exitosamente.');

      this.resetReservation();
    },
    goBack() {
      this.$router.push({ name: 'MenuPrincipal' }); // Change 'MenuPrincipal' to your actual menu route
    },
    resetReservation() {
      // Clear the reservation details
      this.days = 1;
      this.addInsurance = false;
      this.addGPS = false;
      this.addChildSeat = false;
      this.selectedPaymentMethod = '';
      // Optionally clear local storage or reset other states as needed
    }
  },
};
</script>

<style scoped>
/* Estilos para MetodosPago */
.metodos-pago {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h2 {
  color: #007bff;
  margin-bottom: 20px;
}

.car-model, .price-base {
  font-size: 18px;
  margin: 10px 0;
}

.input-group {
  margin: 15px 0;
  text-align: left;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
}

.checkbox-group {
  margin: 15px 0;
  text-align: left;
}

.checkbox-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
}

.summary {
  margin: 20px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.total-price {
  font-size: 26px; /* Increase font size for prominence */
  font-weight: bold; /* Bold text */
  color: #ff5722; /* Distinct color */
  margin-top: 10px; /* Add margin for spacing */
}

.hover-effect {
  transition: transform 0.3s, color 0.3s; /* Add transition for movement and color */
  transform: translateY(-5px); /* Move up on hover */
  color: #ff9100; /* Change color on hover */
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  margin: 10px 0; /* Add margin for spacing */
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #b0d4ff;
  cursor: not-allowed;
}

.back-button {
  background-color: #6c757d; /* Gray color for back button */
}

.back-button:hover {
  background-color: #5a6268; /* Darker gray on hover */
}
</style>
