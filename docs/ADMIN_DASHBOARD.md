# Dashboard Admin — Verificación y Reportes

## Acceso

- **Ruta:** `/admin`
- **Restricción:** Solo usuarios con `profiles.role = 'admin'`.
- Los usuarios sin rol admin son redirigidos al dashboard al intentar acceder.

## Asignar el primer admin

Tras aplicar la migración `009_admin_backend.sql`, asignar el rol admin a un usuario desde SQL (Supabase SQL Editor o CLI):

```sql
-- Sustituir USER_UUID por el id del usuario (auth.users / profiles)
UPDATE profiles
SET role = 'admin'
WHERE id = 'USER_UUID';
```

Para obtener el UUID del usuario: en Supabase Dashboard → Authentication → Users, o desde la tabla `profiles` por email.

## Funcionalidad

### Verificación

- Listar solicitudes de verificación (pendientes, aprobadas, rechazadas).
- Ver datos del usuario y enlaces temporales a documento y selfie (bucket privado).
- **Aprobar:** actualiza `verification_documents` y `profiles` (verification_status / identity_status a verified).
- **Rechazar:** opcional motivo; actualiza estado a rejected.

### Reportes

- Listar reportes con filtros por estado (pendiente, en revisión, cerrado) y contexto (chat, perfil).
- Ver reportador, reportado, motivo, comentario.
- Acciones: Marcar en revisión, Cerrar (resolved).

## Seguridad

- RLS: solo los usuarios con `role = 'admin'` pueden leer/actualizar `verification_documents`, `reports` y leer en el bucket `verification-documents`.
- La función `public.is_admin()` comprueba el rol del usuario conectado.
