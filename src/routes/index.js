import { createRouter, createWebHistory } from 'vue-router';
import InicioSesion from '../components/InicioSesion.vue';
import MenuPrincipal from '../components/MenuPrincipal.vue';
import GaleriaAlquileres from '../components/GaleriaAlquileres.vue';
import AutosAlquilados from '../components/AutosAlquilados.vue';
import MetodosPago from '../components/MetodosPago.vue';
import RegistroSesion from '../components/RegistroSesion.vue'; 
import AnadirAutos from '../components/AnadirAutos.vue'; // Asegúrate de que esta línea esté presente

// Define las rutas para tu aplicación
const routes = [
  {
    path: '/',
    name: 'InicioSesion',
    component: InicioSesion,
  },
  {
    path: '/registro',
    name: 'RegistroSesion',
    component: RegistroSesion,
  },
  {
    path: '/menu-principal',
    name: 'MenuPrincipal',
    component: MenuPrincipal,
  },
  {
    path: '/galeria-alquileres',
    name: 'GaleriaAlquileres',
    component: GaleriaAlquileres,
  },
  {
    path: '/autos-alquilados',
    name: 'AutosAlquilados',
    component: AutosAlquilados,
  },
  {
    path: '/metodos-pago',
    name: 'MetodosPago',
    component: MetodosPago,
  },
  {
    path: '/anadir-auto', // Ruta para añadir autos
    name: 'AnadirAutos',
    component: AnadirAutos, 
  },
];

// Crea el router usando el historial de navegación web
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Exporta el router para usarlo en tu aplicación
export default router;
