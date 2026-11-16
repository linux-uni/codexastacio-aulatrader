/* CodeXaStacio AulaTrader v3 - material original adaptado de fuentes públicas, no copiado. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.AulaAcademyV3=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const lessons=[
  {
    "id": "profile",
    "title": "Objetivos, horizonte y tolerancia al riesgo",
    "level": "Nivel 1",
    "time": 9,
    "desc": "Distingue invertir y especular según necesidades de liquidez.",
    "intro": "Antes de estudiar un instrumento, identifica para qué necesitas el dinero y cuándo. Trading e inversión pueden compartir activos, pero no comparten necesariamente objetivos ni riesgos.",
    "points": [
      "El horizonte de inversión es el período durante el que puedes mantener recursos invertidos.",
      "Liquidez es la capacidad de convertir una posición en efectivo sin un gran costo o demora.",
      "Riesgo de mercado y riesgo de necesitar retirar dinero en un mal momento son distintos.",
      "Un fondo de emergencia no debería depender del resultado de una operación de trading."
    ],
    "example": "Una persona necesitará 2,000 USD para alquiler dentro de dos semanas. Aunque haya oportunidades de mercado, arriesgar ese dinero puede comprometer una obligación esencial.",
    "task": "Define un objetivo de aprendizaje, un horizonte ficticio y dos motivos para no operar.",
    "check": {
      "q": "¿Qué dinero es inapropiado para aprender a operar con fondos reales?",
      "options": [
        "El de gastos esenciales próximos",
        "El capital de prueba ficticio",
        "Las ganancias de una demo"
      ],
      "answer": 0,
      "explanation": "El dinero destinado a necesidades básicas no debería exponerse al riesgo de una operación."
    },
    "sources": [
      {
        "title": "SEC — Introducción a la inversión",
        "url": "https://www.investor.gov/introduction-investing"
      },
      {
        "title": "SEC — Productos de inversión",
        "url": "https://www.investor.gov/introduction-investing/investing-basics/investment-products"
      }
    ]
  },
  {
    "id": "portfolio",
    "title": "Diversificación y riesgo de concentración",
    "level": "Nivel 2",
    "time": 9,
    "desc": "Comprende por qué repartir riesgos no equivale a estar protegido.",
    "intro": "Invertir en varios activos relacionados no implica necesariamente una cartera diversificada. La diversificación puede reducir riesgos específicos, no eliminar pérdidas generales.",
    "points": [
      "Una cartera muy concentrada depende de pocas decisiones o sectores.",
      "Los activos pueden correlacionarse: caer a la vez durante una crisis.",
      "Liquidez, costos y horizonte importan más que el número de símbolos en una lista.",
      "Comparar acciones y fondos diversificados requiere comprender sus costos y riesgos."
    ],
    "example": "Una cartera de cinco acciones tecnológicas puede concentrar más riesgo sectorial que otra que combina distintas categorías de activos; no significa que la segunda sea segura.",
    "task": "Describe una cartera hipotética concentrada y una más diversificada, sin recomendar comprar productos.",
    "check": {
      "q": "¿Diversificar garantiza evitar pérdidas?",
      "options": [
        "Sí",
        "No; puede reducir riesgos específicos pero no todos",
        "Solo con cinco activos"
      ],
      "answer": 1,
      "explanation": "Los movimientos sistémicos pueden afectar simultáneamente a muchas inversiones."
    },
    "sources": [
      {
        "title": "SEC — Diversificación y asignación",
        "url": "https://www.investor.gov/introduction-investing"
      }
    ]
  },
  {
    "id": "stoporders",
    "title": "Stop, stop-limit y órdenes pendientes",
    "level": "Nivel 2",
    "time": 11,
    "desc": "Aprende qué se activa y qué precio puede ejecutarse.",
    "intro": "Una orden stop suele transformarse en una orden de mercado al activarse. Stop-limit pone un límite al precio, pero puede quedarse sin ejecución.",
    "points": [
      "Precio de activación (stop) y precio efectivo de ejecución no son equivalentes.",
      "La orden stop-limit puede no ejecutarse si el mercado salta más allá del límite.",
      "Un trailing stop sigue movimientos favorables según una distancia predefinida, no protege contra gaps.",
      "Las funciones disponibles dependen del intermediario, reglas de mercado y activos."
    ],
    "example": "Una venta stop en 95 puede ejecutarse a 90 tras un salto del mercado. Una stop-limit con límite 94 podría no venderse en ese escenario.",
    "task": "Escribe una situación en la que preferirías limitar el precio pero aceptar el riesgo de no ejecutar.",
    "check": {
      "q": "¿Qué puede ocurrir si un stop se activa durante un salto de precio?",
      "options": [
        "Siempre vende al precio stop",
        "Puede ejecutarse a un precio peor",
        "Cancela el mercado"
      ],
      "answer": 1,
      "explanation": "El precio stop es el disparador, no un precio garantizado."
    },
    "sources": [
      {
        "title": "SEC — Órdenes stop y stop-limit",
        "url": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15"
      }
    ]
  },
  {
    "id": "mathcost",
    "title": "Matemáticas del costo total de operar",
    "level": "Nivel 2",
    "time": 12,
    "desc": "Calcula comisiones, spread y deslizamiento en una práctica.",
    "intro": "El resultado bruto no es el resultado neto. Para aprender con rigor, estima costos tanto al entrar como al salir.",
    "points": [
      "Una comisión por transacción se aplica en cada ejecución según la tarifa.",
      "El spread representa la diferencia entre precios bid y ask.",
      "El slippage puede ser positivo o negativo: en un escenario conservador modelamos costo adicional.",
      "Una ventaja aparente pequeña puede desaparecer por la suma de los costos."
    ],
    "example": "Un ejemplo educativo con 10 unidades, ganancia bruta de 20 USD y costos combinados de 7 USD deja 13 USD netos antes de impuestos.",
    "task": "Abre Laboratorio avanzado y modifica el spread para comparar ganancias brutas y netas.",
    "check": {
      "q": "Si ganas 20 USD brutos y pagas 7 USD en costos, ¿cuál es el neto?",
      "options": [
        "27 USD",
        "13 USD",
        "20 USD"
      ],
      "answer": 1,
      "explanation": "20 - 7 = 13 USD, antes de impuestos y otros cargos."
    },
    "sources": [
      {
        "title": "FINRA — Costos del trading frecuente",
        "url": "https://syndication.finra.org/content/frequent-intraday-trading-understanding-basics"
      },
      {
        "title": "SEC — Productos y comisiones",
        "url": "https://www.investor.gov/introduction-investing/investing-basics/investment-products"
      }
    ]
  },
  {
    "id": "runit",
    "title": "Unidad R y dimensionamiento disciplinado",
    "level": "Nivel 3",
    "time": 11,
    "desc": "Compara resultados por unidades de riesgo en lugar de aciertos.",
    "intro": "La unidad R representa el riesgo inicial definido en una hipótesis. Es una métrica educativa: no asegura que un stop limite exactamente la pérdida.",
    "points": [
      "1R equivale al riesgo previsto en el escenario.",
      "Una operación que gana dos veces ese riesgo representa +2R bruto.",
      "La pérdida real puede exceder 1R por gaps, deslizamiento y eventos extremos.",
      "Un tamaño de posición mal calculado puede superar el capital disponible."
    ],
    "example": "Si el riesgo teórico es 50 USD, una ganancia bruta de 100 USD equivale a +2R; una pérdida de 75 USD equivale a -1.5R.",
    "task": "Usa la calculadora de riesgo y explica cuándo el monto nominal supera el capital disponible.",
    "check": {
      "q": "Con 1R = 50 USD, ¿cuánto representa +2R?",
      "options": [
        "25 USD",
        "100 USD",
        "2 USD"
      ],
      "answer": 1,
      "explanation": "2 × 50 USD = 100 USD, sin restar costos."
    },
    "sources": [
      {
        "title": "FINRA — Riesgos de trading frecuente",
        "url": "https://syndication.finra.org/content/frequent-intraday-trading-understanding-basics"
      }
    ]
  },
  {
    "id": "expectedvalue",
    "title": "Probabilidad y valor esperado",
    "level": "Nivel 3",
    "time": 12,
    "desc": "Aprende por qué ganar más veces no siempre es suficiente.",
    "intro": "La esperanza matemática es un promedio teórico de resultados posibles. No predice el siguiente resultado ni establece ventaja real a partir de pocas operaciones.",
    "points": [
      "Valor esperado = probabilidad de ganar × ganancia media − probabilidad de perder × pérdida media.",
      "Una tasa alta de aciertos puede perder dinero si las pérdidas superan mucho a las ganancias.",
      "Las muestras pequeñas pueden ser engañosas y cambiar por el azar.",
      "Los costos hacen que el punto de equilibrio sea más exigente."
    ],
    "example": "Con 40% de aciertos, ganancia media 120 USD y pérdida media 60 USD: 0.4×120−0.6×60 = 12 USD hipotéticos antes de costos.",
    "task": "Prueba varios porcentajes y costos en el analizador de esperanza del Laboratorio avanzado.",
    "check": {
      "q": "¿Una estrategia con 80% de operaciones ganadoras es necesariamente rentable?",
      "options": [
        "Sí",
        "No; importa el tamaño de las pérdidas y costos",
        "Sí, incluso sin conocer costos"
      ],
      "answer": 1,
      "explanation": "Unas pocas pérdidas grandes pueden superar muchas ganancias pequeñas."
    },
    "sources": [
      {
        "title": "FINRA — Trading frecuente y costos",
        "url": "https://syndication.finra.org/content/frequent-intraday-trading-understanding-basics"
      }
    ]
  },
  {
    "id": "drawdown",
    "title": "Drawdown y recuperación de pérdidas",
    "level": "Nivel 3",
    "time": 10,
    "desc": "Visualiza la caída desde un máximo y el reto de recuperarse.",
    "intro": "Drawdown es la caída porcentual del capital desde un máximo anterior. No hay que confundirlo con una pérdida temporal diaria.",
    "points": [
      "Una caída del 20% exige una subida posterior del 25% sobre el saldo reducido para volver al máximo.",
      "La pérdida del 50% requiere ganar 100% sobre el saldo restante para recuperarse.",
      "El riesgo de secuencias de pérdidas importa tanto como el promedio.",
      "El tamaño de posición y los límites personales pueden evitar que una caída comprometa necesidades básicas."
    ],
    "example": "Saldo hipotético: 10,000 → 8,000 USD. La caída es 20%; para recuperar 2,000 USD desde 8,000 hace falta 25%.",
    "task": "Observa el ejercicio de drawdown en el Laboratorio avanzado y explica la diferencia entre caída y recuperación.",
    "check": {
      "q": "Tras perder 50%, ¿qué ganancia porcentual se necesita sobre el capital restante para recuperar el valor inicial?",
      "options": [
        "50%",
        "100%",
        "25%"
      ],
      "answer": 1,
      "explanation": "Si 100 se convierte en 50, debes ganar otros 50 sobre 50: +100%."
    },
    "sources": [
      {
        "title": "FINRA — Riesgo de pérdidas",
        "url": "https://syndication.finra.org/content/frequent-intraday-trading-understanding-basics"
      }
    ]
  },
  {
    "id": "backtests",
    "title": "Backtesting, sesgos y sobreajuste",
    "level": "Nivel 4",
    "time": 12,
    "desc": "No confundas resultados históricos con éxito futuro.",
    "intro": "Ajustar una estrategia hasta que funcione bien sobre datos pasados puede producir una ilusión estadística. Un backtest no es una promesa.",
    "points": [
      "Sobreajuste: adaptar excesivamente reglas a una muestra histórica específica.",
      "Sesgo de anticipación: usar información que no estaba disponible en ese momento.",
      "Sesgo de supervivencia: excluir activos que desaparecieron.",
      "Los costos, gaps y las ejecuciones reales pueden diferir del modelo.",
      "La evaluación fuera de muestra reduce algunos riesgos, pero no demuestra capacidad futura."
    ],
    "example": "Si cambias 30 veces una regla hasta lograr una curva histórica perfecta, podrías estar capturando ruido del pasado.",
    "task": "Crea una hipótesis simple y nombra tres formas en que una prueba histórica puede engañarte.",
    "check": {
      "q": "¿Qué es sobreajustar una estrategia?",
      "options": [
        "Encontrar una garantía",
        "Ajustar reglas excesivamente a datos pasados",
        "No registrar resultados"
      ],
      "answer": 1,
      "explanation": "Un sistema puede parecer perfecto en el pasado y fallar con datos nuevos."
    },
    "sources": [
      {
        "title": "CFTC — Alertas sobre bots y resultados pasados",
        "url": "https://www.cftc.gov/LearnAndProtect/forexfrauds"
      }
    ]
  },
  {
    "id": "margin",
    "title": "Margen, liquidación y apalancamiento",
    "level": "Nivel 4",
    "time": 12,
    "desc": "Comprende el peligro de posiciones mayores al capital.",
    "intro": "Operar con dinero prestado aumenta la exposición. Una pérdida de precio relativamente pequeña puede destruir una proporción grande del capital propio.",
    "points": [
      "Apalancamiento 5× implica una exposición nominal cinco veces el capital, antes de ajustes y costos.",
      "En ciertos productos con margen puedes perder más que lo depositado.",
      "Los requisitos de margen y las reglas dependen de país, instrumento y entidad.",
      "Es importante no usar fondos para vivienda, alimentos o compromisos esenciales."
    ],
    "example": "Con 1,000 USD de capital y exposición 5,000 USD, una caída de 10% del nominal son 500 USD, es decir 50% del capital inicial, sin costos.",
    "task": "Escribe un ejemplo que compare caída porcentual del activo con pérdida porcentual sobre capital apalancado.",
    "check": {
      "q": "Con una exposición cinco veces el capital, ¿qué puede pasar con las pérdidas porcentuales?",
      "options": [
        "Pueden amplificarse",
        "Se reducen a cero",
        "Se garantizan beneficios"
      ],
      "answer": 0,
      "explanation": "La exposición aumenta y con ella la magnitud de potenciales pérdidas."
    },
    "sources": [
      {
        "title": "FINRA — Riesgos del margen",
        "url": "https://syndication.finra.org/content/frequent-intraday-trading-understanding-basics"
      },
      {
        "title": "CFTC — Riesgos de Forex",
        "url": "https://www.cftc.gov/LearnAndProtect/forexfrauds"
      }
    ]
  },
  {
    "id": "forexscams",
    "title": "Forex, señales y verificación de plataformas",
    "level": "Nivel 4",
    "time": 13,
    "desc": "Cómo identificar promesas dudosas, bots milagrosos y fraudes.",
    "intro": "La mayoría de los operadores minoristas de Forex OTC pierde dinero según advertencias de la CFTC. Una plataforma bonita o un bot sofisticado no garantiza legitimidad.",
    "points": [
      "Desconfía de rentabilidad garantizada, retornos exagerados y urgencia para depositar.",
      "Verifica registros y licencias en las autoridades competentes de la jurisdicción correspondiente.",
      "Evita compartir claves, códigos 2FA y acceso remoto a tus cuentas.",
      "Pregunta quién custodia el dinero, cómo se calculan spreads y cómo funcionan los retiros.",
      "Un buen registro de resultados pasados no valida ganancias futuras."
    ],
    "example": "Un contacto de redes promete doblar tu capital y solo acepta pagos en criptomonedas. Esto reúne múltiples alertas de posible fraude.",
    "task": "Elabora una lista de cinco verificaciones para investigar una supuesta plataforma.",
    "check": {
      "q": "¿Qué es una señal de alerta?",
      "options": [
        "Información legal clara y verificable",
        "Promesas de ganancias garantizadas con urgencia de pago",
        "Explicación detallada de riesgos"
      ],
      "answer": 1,
      "explanation": "Los beneficios garantizados y la presión para depositar son señales frecuentes de fraude."
    },
    "sources": [
      {
        "title": "CFTC — Forex Frauds",
        "url": "https://www.cftc.gov/LearnAndProtect/forexfrauds"
      },
      {
        "title": "SEC — Riesgos de productos",
        "url": "https://www.investor.gov/introduction-investing/investing-basics/investment-products"
      }
    ]
  }
];
  const glossary=[
  [
    "Drawdown",
    "Caída de valor desde un máximo anterior hasta un valor menor."
  ],
  [
    "Esperanza matemática",
    "Promedio teórico ponderado por probabilidades de ganar o perder."
  ],
  [
    "Unidad R",
    "Medida que expresa resultados en múltiplos del riesgo inicialmente definido."
  ],
  [
    "Sobreajuste",
    "Ajustar un modelo demasiado a un conjunto histórico, perjudicando su generalización."
  ],
  [
    "Sesgo de supervivencia",
    "Error de estudiar solo los activos o estrategias que sobrevivieron."
  ],
  [
    "Gap",
    "Cambio brusco de precio entre momentos de negociación, que puede evitar una ejecución al precio stop."
  ],
  [
    "Orden stop-limit",
    "Orden condicionada por un precio stop que crea una orden limitada cuando se activa."
  ],
  [
    "Trailing stop",
    "Orden que ajusta el nivel de activación en movimientos favorables según una distancia definida."
  ],
  [
    "Correlación",
    "Grado de relación estadística entre variaciones de activos."
  ],
  [
    "Punto de equilibrio",
    "Condición en que ganancias y pérdidas esperadas se compensan después de costos."
  ],
  [
    "Exposición nominal",
    "Valor total del activo sobre el que se tiene exposición, no necesariamente igual al capital propio."
  ]
];
  const quiz=[
  {
    "q": "¿Un stop loss garantiza un precio de salida exacto?",
    "options": [
      "Sí",
      "No; puede ejecutarse a otro precio",
      "Solo en Forex"
    ],
    "answer": 1
  },
  {
    "q": "Si un saldo cae de 100 a 50, ¿qué rendimiento necesita para volver a 100?",
    "options": [
      "+50%",
      "+100%",
      "+25%"
    ],
    "answer": 1
  },
  {
    "q": "¿Qué significa sobreajuste en un backtest?",
    "options": [
      "Ajustar reglas excesivamente a datos pasados",
      "Trabajar con datos futuros genuinos",
      "Tener pocas operaciones"
    ],
    "answer": 0
  },
  {
    "q": "¿Qué suele aumentar el apalancamiento?",
    "options": [
      "El tiempo disponible",
      "La exposición a pérdidas",
      "La garantía de beneficio"
    ],
    "answer": 1
  },
  {
    "q": "¿Qué es una señal de alerta de fraude?",
    "options": [
      "Explicación de costos",
      "Promesa garantizada de duplicar capital con urgencia",
      "Documentación verificable"
    ],
    "answer": 1
  }
];
  return {lessons,glossary,quiz,version:'3.0',updated:'2026-11-16'};
});
