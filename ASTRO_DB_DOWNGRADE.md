# Downgrade temporal de Astro para compatibilidad con @astrojs/db

## Fecha del cambio
1 de abril de 2026

## Problema encontrado

Al intentar usar `@astrojs/db` con Astro 6.x, se producía el siguiente error:

```
[ERROR] [astro:db] An unhandled error occurred while running the "astro:server:setup" hook
Cannot read properties of undefined (reading 'import')
  Location:
    node_modules\@astrojs\db\dist\core\integration\index.js:142:36
```

### Causa raíz
Incompatibilidad entre **Astro 6.1.2** y **@astrojs/db 0.20.1**. La integración de base de datos aún no está actualizada para funcionar con Astro 6.x. En la línea 142 del archivo de integración, el código intenta acceder a `environment.runner.import()`, pero `environment.runner` es `undefined` en Astro 6.

## Cambios realizados (downgrade)

### Versiones ANTERIORES (Astro 6.x - NO FUNCIONALES con @astrojs/db)
```json
{
  "dependencies": {
    "astro": "^6.1.2",
    "@astrojs/cloudflare": "^13.1.6",
    "@astrojs/mdx": "^5.0.3",
    "@astrojs/sitemap": "^3.7.2",
    "@astrojs/db": "^0.20.1"
  }
}
```

### Versiones ACTUALES (Astro 5.x - FUNCIONALES con @astrojs/db)
```json
{
  "dependencies": {
    "astro": "5.18.1",
    "@astrojs/cloudflare": "12.x",
    "@astrojs/mdx": "4.x",
    "@astrojs/sitemap": "3.x",
    "@astrojs/db": "^0.20.1"
  }
}
```

### Comando ejecutado para el downgrade
```bash
npm install astro@5.18.1 @astrojs/cloudflare@12 @astrojs/mdx@4 @astrojs/sitemap@3 --save-exact
```

## Archivos creados durante la solución

1. **`src/env.d.ts`** - Referencias de tipos necesarias para Astro DB:
```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

## Resultado
✅ El servidor de desarrollo ahora funciona correctamente con @astrojs/db
✅ La base de datos local se crea y siembra exitosamente
✅ Servidor corriendo en `http://localhost:4321/`

## Cómo REVERTIR los cambios y volver a Astro 6.x

### IMPORTANTE: Antes de revertir
⚠️ **Solo revierte cuando hayas terminado tus pruebas con Astro DB**, o cuando `@astrojs/db` se actualice para soportar Astro 6.x.

### Opción 1: Actualización completa (Recomendado)

Usa el comando oficial de Astro para actualizar todo el ecosistema:

```bash
npx @astrojs/upgrade
```

Este comando:
- Detectará las versiones más recientes compatibles
- Actualizará todas las integraciones de forma coordinada
- Mostrará un resumen de cambios antes de aplicarlos

### Opción 2: Actualización manual específica

Si prefieres control manual, ejecuta:

```bash
# Eliminar versiones exactas y reinstalar las más recientes
npm install astro@latest @astrojs/cloudflare@latest @astrojs/mdx@latest @astrojs/sitemap@latest @astrojs/db@latest
```

### Opción 3: Restaurar versiones exactas anteriores

Si quieres volver exactamente a las versiones que tenías antes:

```bash
npm install astro@6.1.2 @astrojs/cloudflare@13.1.6 @astrojs/mdx@5.0.3 @astrojs/sitemap@3.7.2 @astrojs/db@0.20.1
```

### Después de actualizar

1. **Limpia el caché de Astro:**
```bash
Remove-Item -Path ".astro" -Recurse -Force -ErrorAction SilentlyContinue
```

2. **Verificar si @astrojs/db ahora es compatible:**
```bash
npm run dev
```

3. **Si ves el mismo error después de actualizar:**
   - Significa que @astrojs/db aún no soporta Astro 6.x
   - Puedes:
     - Remover `@astrojs/db` del proyecto temporalmente
     - Esperar a una actualización de `@astrojs/db`
     - Quedarte en Astro 5.x hasta que haya compatibilidad

## Verificar estado actual de compatibilidad

Antes de actualizar, puedes verificar si ya hay compatibilidad:

```bash
# Ver las últimas versiones disponibles
npm view @astrojs/db versions --json

# Ver si hay notas de release sobre Astro 6 support
npm view @astrojs/db dist-tags
```

También puedes revisar:
- [GitHub Issues de @astrojs/db](https://github.com/withastro/astro/issues?q=is%3Aissue+astro%3Adb)
- [Astro Changelog](https://github.com/withastro/astro/blob/main/packages/db/CHANGELOG.md)

## Notas adicionales sobre output mode

Con Astro 5.x:
- `output: 'static'` funciona correctamente con @astrojs/db
- Usa `export const prerender = false` en páginas que necesiten SSR

Con Astro 6.x (cuando actualices):
- El modo `hybrid` fue removido
- `output: 'static'` ahora se comporta como el antiguo `hybrid`
- Por defecto las páginas son estáticas, usa `prerender: false` para SSR

## Recursos útiles

- [Documentación oficial de Astro DB](https://docs.astro.build/en/guides/astro-db/)
- [Guía de actualización de Astro](https://docs.astro.build/en/upgrade-astro/)
- [Astro Discord](https://astro.build/chat) - Para preguntar sobre compatibilidad

---

**Archivo creado automáticamente** - Puedes eliminar este archivo una vez que hayas completado tus pruebas y actualizado a Astro 6.x exitosamente.
