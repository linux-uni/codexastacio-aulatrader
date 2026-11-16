# AulaTrader v3 — Investigación educativa, implementación y licencias

Fecha de preparación: 16 de noviembre de 2026.
Proyecto: https://github.com/linux-uni/codexastacio-aulatrader

## Fundamento pedagógico

Los diez nuevos módulos de `academy-v3.js` se redactaron originalmente en español usando las fuentes como referencia para hechos y riesgos; **no se copiaron sus textos**. Cada módulo nuevo enlaza directamente a documentos públicos de:

1. [SEC — Introduction to Investing](https://www.investor.gov/introduction-investing): horizonte, diversificación y riesgos.
2. [SEC — Investment Products](https://www.investor.gov/introduction-investing/investing-basics/investment-products): liquidez, costos y fraudes.
3. [SEC — Stop, Stop-Limit and Trailing Stop Orders](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15): activación y ejecución de órdenes sin precio garantizado.
4. [FINRA — Frequent Intraday Trading](https://syndication.finra.org/content/frequent-intraday-trading-understanding-basics): riesgos de trading frecuente, costos y margen.
5. [CFTC — Forex Frauds](https://www.cftc.gov/LearnAndProtect/forexfrauds): pérdidas frecuentes, señales de fraude, plataformas sin registrar y bots que no garantizan resultados.

### Contenido nuevo

- Objetivos, horizontes y tolerancia al riesgo.
- Diversificación y concentración.
- Órdenes stop y stop-limit, gaps y precio de ejecución.
- Matemáticas de costos netos.
- Unidad R y tamaño de posición.
- Esperanza matemática, muestra y costos.
- Drawdown y recuperación.
- Sobreajuste, sesgo de supervivencia y límites del backtesting.
- Margen, liquidación y exposición apalancada.
- Verificación de plataformas de Forex, señales de estafa y protección de datos.

Las preguntas de comprensión dentro de cada módulo no son asesoramiento ni certificaciones profesionales. Se conserva el progreso anterior en el dispositivo.

## Repositorio incorporado: TradingView Lightweight Charts

Proyecto: https://github.com/tradingview/lightweight-charts
Documentación v5.3: https://tradingview.github.io/lightweight-charts/docs

- **Integración**: dependencia npm `lightweight-charts@5.3.0`, versión fija instalada por GitHub Actions. No se clonó el monorepo completo porque el paquete distribuido incluye el build standalone listo para usar.
- **Build**: copiar el archivo `dist/lightweight-charts.standalone.production.js` al directorio publicado `vendor/`. No depender de un CDN para mostrar el gráfico.
- **API v5**: `createChart(container)`, `chart.addSeries(CandlestickSeries)`, `chart.addSeries(LineSeries)`, `setData`, `fitContent`.
- **Licencia**: Apache License, Version 2.0. Se incluyen `vendor/APACHE-2.0.txt` y `vendor/TRADINGVIEW_NOTICE` con atribución y el enlace a TradingView visible al usuario en el gráfico.
- **Datos**: exclusivamente una sucesión de números inventados generada por el simulador actual. Los intervalos de las velas se etiquetan como ficticios. La media móvil SMA(10) es una transformación de cierres ficticios.
- **Respaldo**: el gráfico SVG anterior continúa disponible si Lightweight Charts no carga.

No se incorporan bibliotecas de gráficos cerradas, aplicaciones de terceros completas, claves de brokers ni código para ejecutar órdenes.

## Herramientas educativas avanzadas

`lab-v3.js` implementa cálculos puros y probados:

- **Costos completos**: P/L bruto, dos comisiones, spread total, deslizamiento simplificado por lado y resultado neto.
- **Esperanza matemática**: porcentaje supuesto de aciertos, ganancia/pérdida media y costos por operación. No convierte resultados hipotéticos en predicciones.
- **Drawdown**: caída máxima desde un pico a un valle en una serie de capitales positivos y porcentaje necesario para recuperar ese pico, bajo condiciones idealizadas.
- **Velas**: OHLC a partir de precios discretos ficticios; no inventa mínimos ni máximos intraperíodo.
- **SMA(10)**: media simple de los últimos diez cierres disponibles.

## Pruebas y despliegue

- `node --test tests/*.test.js`: matemática, validación de entradas, módulos educativos y comprobación de sintaxis.
- `node tests/e2e.cjs`: navegador móvil, acceso demo, búsqueda de 22 lecciones, laboratorio anterior/nuevo, diario, SVG, gráfico Pro y DANTE.
- `.github/workflows/pages.yml`: compila el sitio estático y el paquete gráfico en cada commit de `main`.

## Límites importantes

- AulaTrader **no ofrece trading real**, ni conexión con brokers, ni datos de precios reales.
- No existe aún autenticación real; el acceso demo no protege cuentas ni datos sensibles.
- DANTE sigue siendo un tutor de respuestas programadas, no un agente generativo.
- Los cálculos de costos simplifican cargos, moneda, apalancamiento, impuestos y condiciones de ejecución.
- La PWA usa almacenamiento local sin sincronización; borrar datos del navegador puede eliminar progresos y diario.
- No se garantizan resultados ni se recomiendan instrumentos concretos.

## Próximos pasos potenciales

Para un producto multiusuario real se requiere backend con autenticación, permisos por alumno, sincronización, revisión de contenido financiero para jurisdicciones aplicables, privacidad y pruebas de seguridad. Datos reales requerirían además licencias de proveedores de datos y revisión de términos, pero no son necesarios para la enseñanza inicial.
