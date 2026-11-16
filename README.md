# AulaTrader — CodeXaStacio

Academia de trading desde cero (versión de demostración). Web app estática en español, lista para alojarse en **GitHub Pages**, sin dependencias ni compilación.

## Funciones

- Inicio de sesión de **demostración**, sin servidor ni cuentas reales.
- Menú adaptable para PC y teléfono.
- 7 lecciones introductorias, glosario y evaluación.
- Simulador educativo con capital ficticio de USD 10,000 y precios generados aleatoriamente.
- Mentor **DANTE** con avatar ilustrado y respuestas programadas (todavía **no** usa IA generativa).
- Progreso y cartera ficticia guardados en `localStorage` del navegador.

**Credenciales demo**: `demo@aula.local` / `Demo1234`.

⚠️ La contraseña está escrita en el código fuente. No utilizar contraseñas reales ni introducir datos personales en este prototipo. **No existe autenticación segura ni almacenamiento en la nube**, por lo que el estado no se sincroniza entre dispositivos. No utiliza dinero real, operaciones reales ni cotizaciones reales.

## Publicar en GitHub Pages

1. Entra a <https://github.com/new> con tu cuenta **linux-uni**.
2. Crea un repositorio **Public** llamado `codexastacio-aulatrader` (sin afectar a ningún otro repositorio existente). Puede inicializarse con un README.
3. Usa **Add file → Upload files** y sube los archivos **descomprimidos** de esta carpeta en la **raíz del repositorio** (`index.html`, `favicon.svg`, `.nojekyll` y este `README.md`). Confirma el commit en la rama `main`.
4. Visita **Settings → Pages → Build and deployment**. En **Source**, elige **Deploy from a branch**; en **Branch**, `main` y `/(root)`. Haz clic en **Save**.
5. Consulta el estado en **Actions** y después en **Settings → Pages → Visit site**. La dirección de proyecto esperada, una vez que GitHub Pages confirme el despliegue, es `https://linux-uni.github.io/codexastacio-aulatrader/`.

La dirección indicada es el formato de URL esperado; **no confirma que la web ya esté publicada**.

## Próximas etapas para usuarios reales

- Autenticación y recuperación de contraseña con backend, verificación de email y gestión segura de sesiones.
- Almacenamiento de progreso por usuario con reglas de acceso (p. ej. RLS).
- Tutor de IA a través de un servidor/función segura, nunca con claves de servicio embebidas en HTML.
- Contenido curricular revisado, métricas de aprendizaje, analítica y accesibilidad.

## Advertencia

Contenido solo educativo: no es asesoramiento financiero ni promesa de ganancias. El trading con dinero real conlleva riesgo de pérdidas.

## Vista previa pública en la rama de pruebas

La rama `codexastacio-aulatrader-preview` contiene una copia aislada de AulaTrader bajo `aulatrader/`. No forma parte de `main` de TV Guide, ni representa una implementación de GitHub Pages. Para compartir temporalmente el HTML se puede usar un visor de código público como raw.githack.com. Antes del lanzamiento definitivo, crear repositorio `codexastacio-aulatrader` y activar GitHub Pages.


## Despliegue

`index.html` y `favicon.svg` están en la raíz para su publicación mediante GitHub Pages. El workflow `.github/workflows/pages.yml` despliega automáticamente cada actualización en `main` una vez que Pages tenga como fuente **GitHub Actions** en Settings → Pages.

**Importante:** Esta primera versión solo es una demostración educativa con datos simulados. El login no es autenticación real, no se envían operaciones a mercados y el tutor todavía no se conecta a un modelo de IA ni sustituye asesoramiento financiero.


## DANTE — Identidad del mentor (v1.1)

- **Nombre:** DANTE
- **Papel:** Mentor educativo de trading para principiantes.
- **Personalidad:** seguro, sereno, claro, cercano y disciplinado. Explica sin prometer ganancias.
- **Estética:** traje azul marino, acentos turquesa y retrato ilustrado en `dante-avatar.svg`.
- **Límites actuales:** las respuestas son locales y preprogramadas; no hay chatbot de IA conectado, señales de inversión ni asesoramiento financiero personalizado.
- **Interfaz:** avatar y nombre visibles en el botón de ayuda, encabezado del chat, lecciones y bienvenida.
