// Ejemplo de cómo usar ApiService en un componente Ionic

import { Component, OnInit } from '@angular/core';
import { ApiService, Paciente } from '../services/api.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.page.html',
  styleUrls: ['./pacientes.page.scss'],
})
export class PacientesPage implements OnInit {
  pacientes: Paciente[] = [];
  loading = false;
  turnoOptions = ['MANANA', 'TARDE', 'NOCHE'];

  nuevoPaciente: Paciente = {
    nombre: '',
    rut: '',
    piso: 1,
    turno: 'MANANA'
  };

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarPacientes();
  }

  // ========== OBTENER PACIENTES ==========
  async cargarPacientes() {
    this.loading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando pacientes...'
    });
    await loading.present();

    try {
      this.apiService.getPacientes().subscribe({
        next: (data) => {
          this.pacientes = data;
          loading.dismiss();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar pacientes:', error);
          this.mostrarError('No se pudo cargar los pacientes');
          loading.dismiss();
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Error:', error);
      loading.dismiss();
      this.loading = false;
    }
  }

  // ========== CREAR PACIENTE ==========
  async crearPaciente() {
    if (!this.validarPaciente()) {
      this.mostrarError('Por favor completa todos los campos');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando paciente...'
    });
    await loading.present();

    this.apiService.crearPaciente(this.nuevoPaciente).subscribe({
      next: (pacienteCreado) => {
        this.pacientes.push(pacienteCreado);
        this.mostrarExito(`Paciente ${pacienteCreado.nombre} creado correctamente`);
        this.limpiarFormulario();
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error al crear paciente:', error);
        this.mostrarError('Error al crear el paciente: ' + error.error?.message);
        loading.dismiss();
      }
    });
  }

  // ========== ACTUALIZAR PACIENTE ==========
  async actualizarPaciente(paciente: Paciente) {
    if (!paciente.id) return;

    const loading = await this.loadingController.create({
      message: 'Actualizando paciente...'
    });
    await loading.present();

    this.apiService.actualizarPaciente(paciente.id, paciente).subscribe({
      next: () => {
        this.mostrarExito('Paciente actualizado correctamente');
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error al actualizar paciente:', error);
        this.mostrarError('Error al actualizar: ' + error.error?.message);
        loading.dismiss();
      }
    });
  }

  // ========== ELIMINAR PACIENTE ==========
  async eliminarPaciente(id: number, nombre: string) {
    const loading = await this.loadingController.create({
      message: 'Eliminando paciente...'
    });
    await loading.present();

    this.apiService.eliminarPaciente(id).subscribe({
      next: () => {
        this.pacientes = this.pacientes.filter(p => p.id !== id);
        this.mostrarExito(`Paciente ${nombre} eliminado`);
        loading.dismiss();
      },
      error: (error) => {
        console.error('Error al eliminar paciente:', error);
        this.mostrarError('Error al eliminar: ' + error.error?.message);
        loading.dismiss();
      }
    });
  }

  // ========== VALIDACIONES ==========
  validarPaciente(): boolean {
    return !!(
      this.nuevoPaciente.nombre.trim() &&
      this.nuevoPaciente.rut.trim() &&
      this.nuevoPaciente.piso >= 1 &&
      this.nuevoPaciente.piso <= 20 &&
      ['MANANA', 'TARDE', 'NOCHE'].includes(this.nuevoPaciente.turno)
    );
  }

  validarRut(rut: string): boolean {
    // Validación simple de RUT formato
    return /^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/.test(rut);
  }

  limpiarFormulario() {
    this.nuevoPaciente = {
      nombre: '',
      rut: '',
      piso: 1,
      turno: 'MANANA'
    };
  }

  // ========== NOTIFICACIONES ==========
  async mostrarExito(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
