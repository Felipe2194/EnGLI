# Comunicacion de datos - 21/08/2026

> Clase anterior revisaron la presentacion de la unidad 1 hasta la pagina 28.
> Ahora arrancamos con el practico, primeros puntos de la guia.

```
 file:///C:/Dev/Facultad/Materias/Materias/Comunicaciones%20de%20Datos/EI%20N1%20-%20Diagn%C3%B3stico%20de%20Fallas%20y%20Redise%C3%B1o%20de%20Topolog%C3%ADas%20de%20Red.pdf
```

## Ejercicio Integrador Nº1

### Ejercicio 1 de la guia

El sector numero 1 (Bedelia) maneja una topologia fisica de Estrella, 16 nodos conectados a un HUB

<img src="file:///C:/Users/bonzo/AppData/Roaming/marktext/images/2026-08-21-12-56-47-image.png" title="" alt="" data-align="center">

El sector numero 2 (Laboratorio) maneja una topologia fisica EN BUS ya que al cortar el cableado principal queda toda las secciones incomunicadas.
<img src="file:///C:/Users/bonzo/AppData/Roaming/marktext/images/2026-08-21-12-59-09-image.png" title="" alt="" data-align="center">

### Ejercicio 2

NroNodos = 16

NroEnlaces = 120

NroPuertos = 15

NroPuertosTotales = 240 (15 puertos por cada Nodo)

<img src="file:///C:/Users/bonzo/AppData/Roaming/marktext/images/2026-08-21-13-15-11-image.png" title="" alt="" data-align="center">

### Ejercicio 3

La migracion del Sector 1 a Malla completa no es la solucion mas conveniente de cara a costo, complejidad e implementacion fisica, ya que tendriamos un numero elevado de enlaces y mucho mas la cantidad de puertos por nodo.

Una de las mejores opciones de cara a solucionar la problematica de unico punto de falla seria una topologia fisica de Anillo o anillo doble si queremos mayor seguridad, en caso de usar un anillo simple tendriamos:

NroNodos = 16

NroEnlaces = 16

NroPuertosTotales  = 32

A esto mismo podemos duplicar los numeros si queremos una topologia fisica de anillo doble.

<img src="file:///C:/Users/bonzo/AppData/Roaming/marktext/images/2026-08-21-13-15-21-image.png" title="" alt="" data-align="center">

## Ejercicio Integrador Nº2

NroNodosIniciales = 12

NroEnlaces = 11

NroPuertosTotales = 1

---

NroNodosFinal = 36

NroEnlaces = 35

Tenemos 35 enlaces menos 11 de los anteriores por ende vamos a tener unos 24 enlaces mas, a 50 dolares cada uno nos da una inversion total de 1200 dolares en enlaces.

<img src="file:///C:/Users/bonzo/AppData/Roaming/marktext/images/2026-08-21-13-37-29-image.png" title="" alt="" data-align="center">

Vamos a necesitar 24 puertos mas para poder concentrar la totalidad de la conexiones de la red con los neuvos nodos.

### Ejercicio 2

NroNodos = 36 

NroEnlaces = 630

NroPuertoPorNodo = 35

NroPuertoTotal = 1260

Habria que instalar unos 618 nuevos enlaces para poder cumplir con la nueva topologia fisica de red. Teniendo unos 618 enlaces nuevos a 50 dolares cada enlace nos da un total de 30,900 Dolares de inversion.

Tenemos una diferencia economica de mas menos 29,100 mil dolares de diferencia de cara a elegir una topologia y otra, teniendo en cuenta que tenemos la misma cantidad de nodos (36) y por cada nodo nos cobran 50 dolares por enlace, en la topologia Estrella tenemos unos 1800 dolares de inversion total y en la topologia Malla completa tenemos dicha cantidad de nodos y utilizando la formula para calcular enlaces nos da un total de 30,900 dolares de inversion total . Elegir una topologia en Malla completa deja de ser una opcion razonable cuando pasamos a tener muchos nodos y deja de ser razonable afrontar economicamente dicho esfuerzo.


