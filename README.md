# Sistema de Monitoreo Hidrológico 
**By:** **`Oscar Javier García Cabrejo`** 

El proyecto en cuestión se enfoca en el desarrollo de una aplicación frontend para un sistema de monitoreo hidrológico. El propósito principal de este proyecto es proporcionar información crucial para la toma de decisiones relacionadas con el uso adecuado de la recarga de acuíferos.

La aplicación frontend permite a los usuarios cargar archivos especiales con extensión TIFF que contienen datos de diversas variables de entrada, como precipitación, evapotranspiración y variables de recarga.

Una vez que los usuarios han cargado las imágenes, el sistema realiza un procesamiento avanzado que brinda a los usuarios la oportunidad de obtener información valiosa. Este procesamiento incluye la generación de mapas que abordan diferentes aspectos hidrológicos, brindando una perspectiva detallada sobre la distribución espacial y las características de las variables analizadas.

La aplicación frontend se ha diseñado de manera técnica y precisa para garantizar la eficacia en la visualización de datos hidrológicos. Los usuarios pueden acceder a funcionalidades avanzadas y aprovechar la capacidad de procesamiento para obtener información detallada y relevante. Esto permite una mejor comprensión del comportamiento hidrológico y respalda la toma de decisiones informadas para la gestión adecuada de los recursos hídricos.

## Funcionalidades

El aplicativo web cuenta con las siguientes funcionalidades.

- `Carga de archivos especiales`: Los usuarios pueden cargar archivos con extensión TIFF que contienen datos de variables hidrológicas, como precipitación, evapotranspiración y variables de recarga. Esta funcionalidad permite a los usuarios importar los datos necesarios para el análisis hidrológico.

- `Ingreso de datos personalizados`: Los usuarios pueden ingresar datos personalizados, como la capacidad de campo del suelo, el cual es un valor numérico positivo necesario para el procesamiento de los datos.

- `Selección de salidas requeridas`: Los usuarios pueden elegir las salidas hidrológicas que deseen obtener como resultado del análisis.

- `Procesamiento de datos`: El sistema realiza un procesamiento avanzado de los datos cargados, teniendo en cuenta tanto las variables hidrológicas como los datos personalizados ingresados por los usuarios.

- `Generación de mapas`: Los usuarios tienen la posibilidad de obtener mapas temáticos que representan diferentes aspectos hidrológicos. Estos mapas proporcionan una visualización clara y comprensible de la distribución espacial de las variables analizadas.

## Lenguaje de desarrollo

El proyecto se desarrolló utilizando `React` como tecnología principal, en combinación con `Next.js` como framework. React es una popular biblioteca de `JavaScript` que permite crear interfaces de usuario interactivas y escalables. Por su parte, Next.js es un framework que simplifica el desarrollo de aplicaciones web sólidas, enfocado en el rendimiento y la optimización.

Además, se hizo uso de la biblioteca `Sakai` proveniente de` PrimeReact`. Sakai es una biblioteca de componentes de interfaz de usuario, la cual proporciona una amplia gama de componentes predefinidos y personalizables. PrimeReact es una colección de componentes UI ricos en características y fácilmente adaptables.

La combinación de estas tecnologías de desarrollo se traduce en una potente herramienta para el desarrollo de aplicaciones web modernas. Estas tecnologías permiten crear interfaces de usuario atractivas, escalables y altamente funcionales, proporcionando una experiencia de usuario mejorada y una mayor eficiencia en el desarrollo.

## Tecnologías utilizadas

Este proyecto se ha desarrollado utilizando las siguientes tecnologías.

- `next`: Es un framework de react que permite construir aplicaciones web con renderizado del lado del servidor (ssr) y generación de páginas estáticas.

- `react`: Biblioteca de javascript utilizada para construir interfaces de usuario interactivas.

- `react-dom`: Es el paquete el cual permite renderizar componentes de react en el navegador.

- `redux`: Es una colección de recursos de administración del estado que proporciona un flujo de datos predecible y centralizado en la aplicación.

- `react-redux`: Biblioteca que conecta el estado global de redux con componentes de react, facilitando la administración del estado en la aplicación.

- `@reduxjs/toolkit`: Es una colección de recursos que proporciona una capa de abstracción sobre redux, simplificando la administración del estado en las aplicaciones react.

- `primereact`: Es un conjunto de componentes de interfaz de usuario basada en react, que proporciona una amplia variedad de componentes predefinidos y personalizables.

- `primeflex`: Paquetes de estilos css responsivos utilizada en conjunto con primereact.

- `primeicons`: Paquetes de iconos vectoriales utilizados en primereact.

- `chart.js`: Es una una biblioteca de gráficos interactivos para representar datos en forma visual.

- `sweetalert2`: Es una biblioteca para mostrar notificaciones y cuadros de diálogo personalizables y atractivos en la interfaz de usuario.

- `eslint`: Hace referencia a una herramienta de linting que ayuda a mantener la consistencia y calidad del código javascript.

- `eslint-config-next`: Es una configuración específica de eslint para proyectos next.js.

## Dependencias

Para ejecutar este proyecto es necesario tener instalado.

- next: 13.2.3
- react: 18.2.0
- react-dom: 18.2.0
- redux: ^4.2.1
- react-redux: ^8.0.5
- @reduxjs/toolkit: ^1.9.5
- primereact: 9.2.3
- primeflex: 3.3.0
- primeicons: ^6.0.1
- chart.js: 4.2.1
- sweetalert2: ^11.4.8
- eslint: 8.38.0
- eslint-config-next: 13.3.0

## Ejecución para desarrolladores

Para instalar y configurar el aplicativo web, siga los siguientes pasos.

- Clone el repositorio pertinente en su equipo, de ser necesario solicite la `URL`.

```sh
git clone URL
```

- Ejecute el comando npm install para instalar las dependencias del proyecto.

```sh
npm install
```

- Ejecute el comando npm run dev para iniciar el servidor.

```sh
npm run dev
```

Una vez realizado estos pasos el proyecto estará disponible en: `http://localhost:3000` (Verifique que el proyecto efectivamente este corriendo en el puerto correspondiente).

## Consideraciones

> Recuerde que el presente proyecto ofrece una versión de escritorio, de ser necesario consulte la documentación oficial de `Electron` y de este modo poder realizar la ejecución como una app de escritorio. 

## Documentación y recursos adicionales

| Herramienta | Enlace |
| ----------- | ------------------------------------------- |
| React       | `https://es.react.dev/`                     |
| Next        | `https://nextjs.org/`                       |
| Prime react | `https://primereact.org/`                   |
| Sakai       | `https://github.com/primefaces/sakai-react` |
| Electron    | `https://www.electronjs.org/`               |

---
**`V 1.0.0`**
