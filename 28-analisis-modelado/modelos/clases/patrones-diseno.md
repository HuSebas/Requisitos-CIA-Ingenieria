# Patrones de diseño aplicados

| Campo | Valor |
|---|---|
| Versión | 1.0 · 2026-11-16 |
| Parte del proyecto | La solicitud de compra: su ciclo de vida y su ruta de aprobación |
| Diagramas | [DCL-03 · State](dcl-03-patron-state.puml) · [DCL-04 · Cadena de responsabilidad](dcl-04-patron-cadena-responsabilidad.puml) |
| Naturaleza | Propuesta de diseño para quien construya el sistema. No es un requisito: muestra que el modelo de análisis se puede llevar a clases sin perder las reglas |

## Por qué esta parte

La solicitud de compra concentra las reglas más delicadas del sistema: cuatro estados con operaciones permitidas distintas (DES-01) y una tabla de decisión de quién aprueba (RN-02 a RN-05). Son las dos cosas que la empresa todavía puede cambiar, porque los montos y topes están por confirmar (PD-02, PD-03). El diseño debe permitir cambiarlas sin tocar el resto.

## 1. State: el ciclo de vida de la solicitud

### Problema

Lo que se puede hacer con una solicitud depende de su estado. Sin el patrón, cada operación (`aprobar`, `rechazar`, `anular`) empieza con una cadena de condiciones sobre el estado, y agregar un estado obliga a revisar todas.

### Solución

Cada estado de DES-01 es una clase que realiza la interfaz `EstadoSolicitud`. `SolicitudCompra` delega en su estado actual y no pregunta en cuál está.

| Elemento del patrón | En el proyecto |
|---|---|
| Contexto | `SolicitudCompra` |
| Estado | Interfaz `EstadoSolicitud` |
| Estados concretos | `Pendiente`, `Aprobada`, `Rechazada`, `Anulada` |

### Correspondencia con el modelo de análisis

| Transición de DES-01 | Dónde queda |
|---|---|
| T-02, T-03, T-04 · aprobar | `Pendiente.aprobar()`: evalúa la guarda y decide si sigue pendiente, reasigna la ruta o pasa a `Aprobada`. |
| T-05 · rechazar | `Pendiente.rechazar()`: exige el motivo y pasa a `Rechazada`. |
| T-06 · anular | `Pendiente.anular()`: comprueba que quien anula es el solicitante y pasa a `Anulada`. |
| Celdas «✗» de la matriz estado × evento | `Aprobada`, `Rechazada` y `Anulada` rechazan las tres operaciones. |
| Registro de cambio (RF-034) | `SolicitudCompra.cambiarEstado()` escribe el `RegistroCambio` en un solo lugar. |

```java
public interface EstadoSolicitud {
    void aprobar(SolicitudCompra solicitud, Usuario aprobador);
    void rechazar(SolicitudCompra solicitud, Usuario aprobador, String motivo);
    void anular(SolicitudCompra solicitud, Usuario solicitante, String motivo);
    String nombre();
}

final class Rechazada implements EstadoSolicitud {
    public void aprobar(SolicitudCompra s, Usuario a) { throw new OperacionNoPermitida(nombre(), "aprobar"); }
    public void rechazar(SolicitudCompra s, Usuario a, String m) { throw new OperacionNoPermitida(nombre(), "rechazar"); }
    public void anular(SolicitudCompra s, Usuario u, String m) { throw new OperacionNoPermitida(nombre(), "anular"); }
    public String nombre() { return "Rechazada"; }
}
```

### Consecuencias

- Agregar un estado, por ejemplo «En visto bueno técnico», es agregar una clase.
- El costo son cuatro clases pequeñas en lugar de un atributo. Se justifica porque las reglas por estado ya existen y pueden crecer.

## 2. Cadena de responsabilidad: la ruta de aprobación

### Problema

La tabla de decisión tiene cuatro columnas hoy, con montos por confirmar. Escrita como condiciones anidadas, cada cambio de la empresa obliga a modificar un método que mezcla todos los niveles.

### Solución

Cada nivel de aprobación es un eslabón que responde una sola pregunta: ¿me corresponde esta solicitud? Si sí, entrega la ruta; si no, la pasa al siguiente. `AsignadorDeRuta` solo conoce el primer eslabón.

| Elemento del patrón | En el proyecto | Regla |
|---|---|---|
| Manejador | Clase abstracta `NivelDeAprobacion` | — |
| Manejadores concretos | `DentroDelSaldo` | RN-02, RN-03 |
| | `ExcesoEnImprevistos` | RN-04 |
| | `ExcesoSobreImprevistos` | RN-05 |
| Cliente | `AsignadorDeRuta` | RF-003, RF-043 |
| Resultado | `Ruta`: lista ordenada de aprobadores | RN-19 |

```java
abstract class NivelDeAprobacion {
    private NivelDeAprobacion siguiente;

    Ruta resolver(SolicitudCompra solicitud) {
        if (leCorresponde(solicitud)) return ruta(solicitud);
        if (siguiente == null) throw new SinNivelDeAprobacion(solicitud);
        return siguiente.resolver(solicitud);
    }

    protected abstract boolean leCorresponde(SolicitudCompra solicitud);
    protected abstract Ruta ruta(SolicitudCompra solicitud);
}
```

`resolver` es además un método plantilla: fija el orden y deja a cada nivel la condición y la ruta.

### Por qué no Strategy

Strategy sirve cuando el cliente elige un algoritmo entre varios equivalentes. Aquí nadie elige: los niveles se prueban en orden hasta que uno responde, y ese orden es la regla del negocio.

### Consecuencias

- Un nivel nuevo, por ejemplo una junta para montos muy altos, se inserta en la cadena sin tocar los demás.
- El mismo `AsignadorDeRuta` sirve al registrar la solicitud (RF-003) y al decidirla (RF-043), así que la regla está en un solo lugar.

## 3. Principios SOLID

| Principio | Cómo se cumple |
|---|---|
| Responsabilidad única | `SolicitudCompra` guarda datos y delega; cada estado conoce sus transiciones; cada nivel conoce una regla. |
| Abierto/cerrado | Estados y niveles nuevos se agregan como clases, sin modificar las existentes. |
| Sustitución de Liskov | Cualquier estado puede ocupar el lugar de `EstadoSolicitud`: todos responden las tres operaciones, aunque sea rechazándolas de forma explícita. |
| Segregación de interfaces | Los niveles dependen de `ConsultaDeSaldos`, que solo ofrece los dos saldos que necesitan, y no del presupuesto completo. |
| Inversión de dependencias | Los niveles dependen de la interfaz `ConsultaDeSaldos`, no de cómo se almacenan o calculan los saldos. |

## 4. Tipos de relación usados

| Tipo | Dónde |
|---|---|
| Realización | `Pendiente`, `Aprobada`, `Rechazada` y `Anulada` realizan `EstadoSolicitud` (DCL-03). |
| Generalización | `DentroDelSaldo`, `ExcesoEnImprevistos` y `ExcesoSobreImprevistos` heredan de `NivelDeAprobacion` (DCL-04). |
| Agregación | `SolicitudCompra` tiene su estado actual; cada nivel tiene su siguiente. |
| Dependencia | `Pendiente` crea los otros estados; los niveles usan `ConsultaDeSaldos`, evalúan `SolicitudCompra` y producen `Ruta`. |
| Asociación dirigida | `AsignadorDeRuta` conoce el primer nivel. |
| Composición | En el dominio: `Compra`–`Decision` y `Compra`–`Soporte` (DCL-01). |
