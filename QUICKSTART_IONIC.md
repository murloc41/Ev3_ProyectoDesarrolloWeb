# Checklist: Conectar Ionic a API Koyeb

## ✅ Backend listo
- [x] API en Koyeb funcionando → https://encouraging-kacy-compendium-91d5ed98.koyeb.app
- [x] GET /api/pacientes → ✅ 200 OK
- [x] POST /api/pacientes → ✅ 201 CREATED
- [x] CORS habilitado para Ionic
- [x] CSRF deshabilitado para /api/**

## 📁 Archivos que necesitas copiar a tu proyecto Ionic

```
src/
├── app/
│   ├── services/
│   │   └── api.service.ts          ← COPIAR ESTO
│   ├── pages/
│   │   ├── pacientes/
│   │   │   ├── pacientes.page.ts   ← O adaptar el código del ejemplo
│   │   │   └── pacientes.page.html ← O adaptar el template
│   └── app.module.ts               ← Agregar HttpClientModule
```

## 🔧 Pasos en tu proyecto Ionic

### 1. Copiar api.service.ts
```bash
# En tu terminal de Ionic
cp api.service.ts src/app/services/
```

### 2. Agregar HttpClientModule a app.module.ts
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

### 3. Inyectar en tu componente
```typescript
import { ApiService } from '../services/api.service';

constructor(private apiService: ApiService) {}
```

### 4. Usar en tu lógica
```typescript
// Cargar pacientes
this.apiService.getPacientes().subscribe(data => {
  this.pacientes = data;
});

// Crear paciente
this.apiService.crearPaciente(paciente).subscribe(
  (created) => console.log('Creado:', created)
);
```

## 🧪 Pruebas rápidas

### Desde tu navegador (DevTools)
```javascript
// GET
fetch('https://encouraging-kacy-compendium-91d5ed98.koyeb.app/api/pacientes')
  .then(r => r.json())
  .then(d => console.log(d))

// POST
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
.then(d => console.log(d))
```

### Desde tu app Ionic (en el código)
```typescript
// En algún método
this.apiService.crearPaciente({
  nombre: 'Test Ionic',
  rut: '21.123.456-8',
  piso: 7,
  turno: 'NOCHE'
}).subscribe({
  next: (data) => console.log('✅ Creado:', data),
  error: (err) => console.error('❌ Error:', err)
});
```

## ⚠️ IMPORTANTE

### Turno - debe ser UNA de estas 3 opciones (mayúsculas):
```
"MANANA"  → Turno mañana
"TARDE"   → Turno tarde
"NOCHE"   → Turno noche
```

### RUT - formato correcto:
```
"12.345.678-9"  ← Válido
"12345678-9"    ← Inválido
```

### Piso - entre 1 y 20:
```
1, 2, 3, ... 20  ← Válido
0 o 21           ← Inválido
```

## 🔗 Endpoints disponibles

```
GET    /api/pacientes              → Listar todos
GET    /api/pacientes/{id}         → Obtener uno
POST   /api/pacientes              → Crear (201)
PUT    /api/pacientes/{id}         → Actualizar (200)
DELETE /api/pacientes/{id}         → Eliminar (204)

GET    /api/medicamentos           → Listar todos
GET    /api/medicamentos/{id}      → Obtener uno
POST   /api/medicamentos           → Crear (201)
PUT    /api/medicamentos/{id}      → Actualizar (200)
DELETE /api/medicamentos/{id}      → Eliminar (204)
```

## 🚀 Una vez todo funciona

1. Prueba en el navegador (con DevTools)
2. Prueba desde la app en el emulador
3. Prueba desde un dispositivo Android real (con tu IP/dominio)

---

**API URL:** https://encouraging-kacy-compendium-91d5ed98.koyeb.app/api
**Status:** ✅ Online y funcional
