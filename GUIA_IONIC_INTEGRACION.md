# Guía de Integración - App Móvil (Ionic) con API Koyeb

## 1. Copiar el servicio a tu proyecto

Copia el archivo `api.service.ts` a tu carpeta de servicios:
```
src/app/services/api.service.ts
```

## 2. Importar HttpClientModule en tu módulo

En `app.module.ts` o `app.config.ts`:

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    // ... otros imports
  ]
})
export class AppModule { }
```

## 3. Inyectar ApiService en tu componente

```typescript
import { ApiService } from '../services/api.service';

export class PacientesPage {
  constructor(private apiService: ApiService) {}
}
```

## 4. Usar los métodos del servicio

### Obtener todos los pacientes
```typescript
this.apiService.getPacientes().subscribe({
  next: (pacientes) => {
    console.log('Pacientes:', pacientes);
  },
  error: (error) => {
    console.error('Error:', error);
  }
});
```

### Crear un paciente
```typescript
const nuevoPaciente = {
  nombre: 'Juan Pérez',
  rut: '12.345.678-9',
  piso: 5,
  turno: 'MANANA'  // ⚠️ IMPORTANTE: Usa MANANA, TARDE o NOCHE (mayúsculas)
};

this.apiService.crearPaciente(nuevoPaciente).subscribe({
  next: (pacienteCreado) => {
    console.log('Paciente creado:', pacienteCreado);
  },
  error: (error) => {
    console.error('Error al crear:', error);
  }
});
```

### Actualizar un paciente
```typescript
this.apiService.actualizarPaciente(1, pacienteActualizado).subscribe({
  next: () => console.log('Actualizado'),
  error: (error) => console.error('Error:', error)
});
```

### Eliminar un paciente
```typescript
this.apiService.eliminarPaciente(1).subscribe({
  next: () => console.log('Eliminado'),
  error: (error) => console.error('Error:', error)
});
```

## 5. Cambiar URL según el entorno

En `api.service.ts`:

```typescript
// PRODUCCIÓN (Koyeb)
private apiUrl = 'https://encouraging-kacy-compendium-91d5ed98.koyeb.app/api';

// DESARROLLO (localhost)
// private apiUrl = 'http://localhost:8080/api';
```

## 6. En Capacitor/Android, usar:

```typescript
// Para Capacitor en Android:
private apiUrl = 'https://encouraging-kacy-compendium-91d5ed98.koyeb.app/api';

// NO usar localhost desde el dispositivo, debe ser la URL pública
```

## 7. Formato de datos importante

### Paciente
```json
{
  "nombre": "string (obligatorio)",
  "rut": "string (formato: XX.XXX.XXX-X)",
  "piso": "number (1-20)",
  "turno": "MANANA | TARDE | NOCHE (MAYÚSCULAS)"
}
```

### Medicamento
```json
{
  "nombre": "string (obligatorio)",
  "dosisMg": "number (> 0)",
  "tipo": "string (obligatorio)",
  "usoDelicado": "boolean (true/false)"
}
```

## 8. Prueba rápida en la consola del navegador

```javascript
// Crear paciente
fetch('https://encouraging-kacy-compendium-91d5ed98.koyeb.app/api/pacientes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Test',
    rut: '20.123.456-7',
    piso: 5,
    turno: 'TARDE'
  })
})
.then(r => r.json())
.then(data => console.log(data));
```

## 9. Códigos HTTP esperados

- **200 OK** - GET exitoso
- **201 CREATED** - POST/PUT exitoso
- **204 NO CONTENT** - DELETE exitoso
- **400 BAD REQUEST** - Datos inválidos
- **404 NOT FOUND** - Recurso no existe
- **500 INTERNAL SERVER ERROR** - Error en el servidor

## 10. Troubleshooting

### Error 403 Forbidden en POST
- Asegúrate de que CSRF está deshabilitado en SecurityConfig ✅ (ya lo hicimos)
- Verifica que estés usando la URL HTTPS correcta

### Error de CORS
- La API ya está configurada con CORS para Ionic ✅
- Asegúrate de no añadir headers extras que bloqueen CORS

### Medicamento con usoDelicado
```typescript
const medicamento = {
  nombre: 'Morfina',
  dosisMg: 10,
  tipo: 'Opioide',
  usoDelicado: true  // boolean, no string
};
```

---

**API está lista en:** https://encouraging-kacy-compendium-91d5ed98.koyeb.app/api
