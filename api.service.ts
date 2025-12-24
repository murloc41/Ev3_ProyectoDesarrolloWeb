import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  id?: number;
  nombre: string;
  rut: string;
  piso: number;
  turno: 'MANANA' | 'TARDE' | 'NOCHE';
}

export interface Medicamento {
  id?: number;
  nombre: string;
  dosisMg: number;
  tipo: string;
  usoDelicado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL BASE - Cambia según tu entorno
  private apiUrl = 'https://encouraging-kacy-compendium-91d5ed98.koyeb.app/api';

  // Para desarrollo local, usa:
  // private apiUrl = 'http://localhost:8080/api';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) {}

  // ========== PACIENTES ==========

  // Obtener todos los pacientes
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/pacientes`, {
      headers: this.headers
    });
  }

  // Obtener un paciente por ID
  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/pacientes/${id}`, {
      headers: this.headers
    });
  }

  // Crear un nuevo paciente (POST)
  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/pacientes`, paciente, {
      headers: this.headers
    });
  }

  // Actualizar un paciente (PUT)
  actualizarPaciente(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/pacientes/${id}`, paciente, {
      headers: this.headers
    });
  }

  // Eliminar un paciente (DELETE)
  eliminarPaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pacientes/${id}`, {
      headers: this.headers
    });
  }

  // ========== MEDICAMENTOS ==========

  // Obtener todos los medicamentos
  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.apiUrl}/medicamentos`, {
      headers: this.headers
    });
  }

  // Obtener un medicamento por ID
  getMedicamento(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.apiUrl}/medicamentos/${id}`, {
      headers: this.headers
    });
  }

  // Crear un nuevo medicamento (POST)
  crearMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(`${this.apiUrl}/medicamentos`, medicamento, {
      headers: this.headers
    });
  }

  // Actualizar un medicamento (PUT)
  actualizarMedicamento(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.apiUrl}/medicamentos/${id}`, medicamento, {
      headers: this.headers
    });
  }

  // Eliminar un medicamento (DELETE)
  eliminarMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicamentos/${id}`, {
      headers: this.headers
    });
  }
}
