# 🧠 Agent Skills y MCP - Extendiendo las capacidades de la IA

En esta clase entramos en uno de los conceptos ****más importantes y más mal entendidos**** del desarrollo con IA moderna: la diferencia entre ****Agent Skills**** y ****Model Context Protocol (MCP)****.

Ambos sirven para ****ampliar lo que puede hacer una IA****, pero ****no son lo mismo****, y confundirlos lleva a arquitecturas incorrectas y problemas de seguridad.

## 🔌 MCP - Funcionalidad y conexión a herramientas

El ****Model Context Protocol (MCP)**** es el mecanismo que permite a una inteligencia artificial:

-   Conectarse a ****herramientas externas****
-   Acceder a ****APIs de terceros****
-   Autenticarse automáticamente
-   Controlar aplicaciones como ****Chrome, Figma o servicios externos****
-   Ejecutar acciones reales en el entorno

👉 Piensa en MCP como ****funcionalidad****.

Sin MCP, la IA:

-   No puede abrir un navegador
-   No puede controlar una app externa
-   No puede conectarse directamente a una API real

MCP es lo que convierte a un modelo en algo ****operativo****, no solo conversacional.

## 🧩 Agent Skills - Conocimiento reutilizable

Las ****Agent Skills**** son otra cosa completamente distinta.

Una skill es un ****módulo reutilizable de conocimiento**** que incluye:

-   Instrucciones
-   Contexto
-   Reglas
-   Buenas prácticas
-   Metadatos
-   Guías paso a paso

👉 Piensa en las skills como ****know-how****, no como herramientas.

No ejecutan acciones externas por sí mismas, pero ****mejoran enormemente el contexto**** con el que razona la IA.

## ⚖️ MCP vs Agent Skills - La diferencia clave

| Concepto     | Qué aporta                                                |
| ------------ | --------------------------------------------------------- |
| MCP          | Funcionalidad, conexión a herramientas, ejecución real    |
| Agent Skills | Conocimiento, contexto, forma correcta de hacer las cosas |

-   MCP = brazos y manos
-   Skills = cerebro y experiencia

No compiten, ****se complementan****.

## 📦 Catálogo de Agent Skills

Existen catálogos enormes de skills reutilizables. Por ejemplo, el catálogo de Vercel cuenta con ****más de 53.000 skills**** disponibles.

Algunos ejemplos:

-   Frontend
-   React
-   Angular
-   Backend
-   Diseño de interfaces
-   Buenas prácticas de UI/UX

Una de las más populares es ****Frontend Design****, instalada decenas de miles de veces por semana.

## 🎨 Ejemplo práctico - Frontend Design Skill

La skill ****Frontend Design**** aporta contexto para:

-   Evitar interfaces genéricas de IA
-   Mejorar composición visual
-   Ajustar tono y propósito
-   Crear UIs más profesionales

Lo interesante es que:

-   No tienes que invocarla explícitamente
-   La IA decide usarla ****automáticamente**** cuando el contexto lo requiere

Puedes tener ****1000 skills instaladas****, pero la IA solo usará las que tengan sentido en ese momento.

## ⚠️ Seguridad - Mucho cuidado con las Skills

Esto es ****muy importante****.

Las skills:

-   Se ejecutan con los permisos del agente
-   Pueden contener ****prompt injection****
-   Pueden incluir instrucciones maliciosas

Buenas prácticas:

-   Revisa siempre el contenido de una skill
-   No instales skills de origen desconocido
-   Verifica el código y las instrucciones varias veces
-   Trata una skill como si fuera código de un tercero

## 🧪 Flujo recomendado de uso

1.  Usa ****MCP**** cuando necesites:
2.  -   Conectar APIs
    -   Controlar herramientas externas
    -   Ejecutar acciones reales
3.  Usa ****Agent Skills**** para:
4.  -   Mejorar calidad de resultados
    -   Añadir experiencia y criterio
    -   Estandarizar comportamientos
    -   Evitar repetir instrucciones en cada prompt

## 🔮 Idea clave para quedarte

> MCP te da ****poder****. Las skills te dan ****criterio****.

Entender esta diferencia es fundamental para construir ****agentes de IA escalables, seguros y realmente útiles****.

En las siguientes clases veremos cómo combinarlos correctamente para crear agentes mucho más inteligentes y fiables.

> 💡 ****Tip****: Si algo puede hacerse solo con prompts, probablemente debería ser una skill. Si necesita tocar el mundo real, necesitas MCP.