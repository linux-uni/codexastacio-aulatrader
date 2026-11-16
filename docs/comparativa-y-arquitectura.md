# Comparativa y decisiones de AulaTrader v2

Fecha: 16 de noviembre de 2026.

## Referencias investigadas

| Plataforma o repositorio | Funciones verificables | Decisión en AulaTrader |
| --- | --- | --- |
| [eToro Academy](https://www.etoro.com/es/academy/courses/) | Cursos de inversión por niveles, temáticas y duración | Ampliar el itinerario a 12 lecciones, 10 preguntas y logros |
| [TradingView Paper Trading](https://es.tradingview.com/support/solutions/43000516466/) | Práctica con capital simulado, órdenes y seguimiento de posiciones | Mejorar la visualización del simulador ficticio y mantener ausencia total de dinero real |
| [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts) | Gráficos eficientes y código abierto (Apache 2.0, con atribución obligatoria si se utiliza) | Conservar un renderizador SVG local sencillo para evitar dependencias externas; no se ha incorporado ni copiado este repositorio |
| [MDN PWA/Service Workers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation) | Caché local, funcionamiento offline parcial | Incorporar manifest y service worker con caché de recursos estáticos |

Las referencias se utilizan como ejemplos de buenas prácticas, no como garantías de rendimiento financiero.

## Diferenciación de AulaTrader

- Lecciones introductorias en español con ejemplos y tareas.
- Simulador local y precios generados, expresamente NO conectados a mercados.
- Gráficas de línea/velas de datos ficticios.
- Calculadora de posición larga basada en capital, porcentaje hipotético de riesgo y distancia al stop.
- Diario personal de práctica exportable a JSON.
- DANTE, tutor de respuestas guiadas. **No es IA generativa** ni proporciona asesoría financiera personalizada.
- Diseño móvil y web instalable donde el navegador soporte el manifest; caché offline de recursos.

## Alcance y pendientes

1. El inicio de sesión actual es solo una demostración; la clave se encuentra en el frontend.
2. El progreso y diario se guardan en localStorage y **no sincronizan** entre dispositivos.
3. No existe backend de IA, feed de cotizaciones ni órdenes reales.
4. El simulador no contempla comisiones, spread, deslizamientos ni obligaciones fiscales reales.
5. Antes de habilitar cuentas reales se necesita autenticación segura, base de datos con permisos por usuario, política de privacidad y pruebas de seguridad.
6. Una futura integración de gráficos de terceros debe revisar su licencia, atribución y desempeño offline.

## Calidad y publicación

- `node --test tests/*.test.js`: lógica de riesgo, estructura y sintaxis del frontend.
- `node tests/e2e.cjs`: navegación en móvil con Playwright (requiere navegador instalado).
- GitHub Actions publica en Pages desde `main` tras los cambios.
