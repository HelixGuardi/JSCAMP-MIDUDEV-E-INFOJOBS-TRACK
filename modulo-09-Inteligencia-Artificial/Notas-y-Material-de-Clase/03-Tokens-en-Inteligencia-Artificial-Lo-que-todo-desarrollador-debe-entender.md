# 🧩 Tokens en Inteligencia Artificial

En esta clase vamos a ver ****uno de los conceptos más importantes y más ignorados cuando se empieza con IA****: los ****tokens****. Si vas a trabajar con modelos de lenguaje como desarrollador, ****entender los tokens no es opcional****.

Los modelos de IA ****no entienden texto como lo hacemos los humanos****. Aunque lo parezca, ****no procesan palabras ni frases****, procesan ****tokens****.

## 🧠 ¿Qué es un token?

Un ****token**** es un fragmento de texto. Puede ser:

-   Una palabra completa
-   Parte de una palabra
-   Un carácter especial
-   Incluso espacios o combinaciones de letras

Por ejemplo, una palabra como `hola` puede ser:

-   1 token
-   2 tokens
-   O más

Y aquí viene lo importante: ****cómo se divide el texto en tokens depende del modelo****.

## 🤖 Los modelos no tokenizan igual

No todos los modelos dividen el texto de la misma forma:

-   GPT
-   Gemini
-   Claude (Anthropic)

Cada uno tiene ****su propio sistema de tokenización****, por lo que:

-   El mismo texto puede tener ****11 tokens en un modelo****
-   Y ****17 o 29 tokens en otro****

👉 ****Los tokens no son comparables entre modelos****.

Esto es totalmente normal y hay que asumirlo como parte del juego.

## 🌍 El idioma importa (y mucho)

El idioma que uses afecta directamente al número de tokens y, por tanto, al coste.

Algunos puntos clave:

-   El ****inglés suele ser el idioma más eficiente****
-   El ****español no es malo****, pero no es el mejor
-   Idiomas como el ****alemán**** suelen generar más tokens
-   Otros idiomas pueden ser especialmente ineficientes

Ejemplo real:

-   `"I am"` en inglés puede ser ****1 solo token****
-   `"yo soy"` en español suelen ser ****2 tokens****

Parece una diferencia pequeña, pero ****a escala, suma mucho****.

## 💸 ¿Por qué los tokens son tan importantes?

Porque ****la IA se paga por tokens****, no por texto.

Los modelos te cobran por:

-   Tokens de ****entrada**** (lo que tú envías)
-   Tokens de ****salida**** (lo que el modelo responde)

Por ejemplo:

-   Un modelo puede cobrar ~1,7 $ por millón de tokens de entrada
-   Y ~14 $ por millón de tokens de salida

Cuantos más tokens:

-   Más coste
-   Más latencia
-   Más consumo innecesario

## 📊 Diferencias de precio entre modelos

Cada proveedor tiene su estrategia:

-   Algunos modelos son más baratos pero menos potentes
-   Otros son más caros pero más precisos
-   Algunos cambian el precio según:
-   -   Si envías menos de X tokens
    -   O si superas cierto umbral (por ejemplo 200.000 tokens)

👉 ****Diseñar bien los prompts es también optimizar costes****.

## 🛠️ Herramientas para contar tokens

Existen herramientas oficiales que permiten ver:

-   Cómo se tokeniza un texto
-   Cuántos tokens usa cada modelo
-   Cómo cambia según el idioma o el proveedor

No son perfectas, pero ****te ayudan a evitar sorpresas****.

## 🎯 Qué debes quedarte de esta clase

-   Los modelos de IA ****no entienden texto****, entienden tokens
-   Los tokens ****dependen del modelo****
-   El idioma influye directamente en el coste
-   Los tokens determinan:
-   -   Precio
    -   Rendimiento
    -   Escalabilidad
-   Optimizar prompts ****no es solo escribir mejor****, es escribir más eficiente

> 💡 ****Tip realista****: si algo te parece barato al principio, revisa los tokens cuando escales. La mayoría de sustos en producción con IA vienen de aquí.