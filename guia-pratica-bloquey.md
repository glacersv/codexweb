# Guía Práctica: Página Web "Bloquey/Scrappy" con Carrito de Compras

## Objetivo
Crear una página web con estilo "bloquey" o "scrappy" (con apariencia de bloques superpuestos, etiquetas manuscritas, estética rústica o de notas adhesivas) que incluya:
- Un banner principal
- Un menú de navegación
- Un carrito de compras
- Estructura lista para transformar en una tienda de perfumes

---

## Paso 1: Configuración básica

Crearemos un archivo `index.html` con la estructura semántica necesaria.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda de Perfumes - Bloquey Style</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- ==================== BANNER ==================== -->
  <header class="banner">
    <h1>📦 TIENDA DE PERFUMES 📦</h1>
    <p>Essencias únicas para ti</p>
  </header>

  <!-- ==================== MENÚ ==================== -->
  <nav class="menu">
    <ul>
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#perfumes">Perfumes</a></li>
      <li><a href="#carrito">Carrito</a></li>
      <li><a href="#about">Nosotros</a></li>
    </ul>
  </nav>

  <!-- ==================== CONTENIDO PRINCIPAL ==================== -->
  <main>
    <section id="inicio" class="hero">
      <h2>Bienvenido a nuestra tienda</h2>
      <p>Descubre nuestras fragancias exclusivas</p>
    </section>

    <section id="perfumes" class="productos">
      <h2>Nuestros Perfumes</h2>
      <div class="producto">
        <h3>Perfume Clásico</h3>
        <p>$50.00</p>
        <button class="agregar-carrito">Agregar al carrito</button>
      </div>
      <div class="producto">
        <h3>Perfume Floral</h3>
        <p>$45.00</p>
        <button class="agregar-carrito">Agregar al carrito</button>
      </div>
    </section>

    <section id="carrito" class="carrito">
      <h2>𛀚 Carrito de Compras</h2>
      <ul id="lista-carrito">
        <!-- Los artículos se agregarán aquí dinámicamente -->
      </ul>
      <p>Total: $<span id="total">0</span></p>
      <button>Comprar</button>
    </section>
  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer>
    <p>2024 Tienda de Perfumes. Hecho con estilo bloquey.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

---

## Paso 2: Estilos "Bloquey/Scrappy" (style.css)

Aquí añadimos la "magia" visual: bloques superpuestos, colores pastel, efectos de mano alzada y etiquetas adhesivas.

```css
/* ===== VARIABLES DE ESTILO ===== */
:root {
  --color-fondo: #fdf6e3; /* Crema suave */
  --color-acento: #d4a574; /* Marrón cálido */
  --color-texto: #3d312c; /* Café oscuro */
  --color-boton: #c49a6a; /* Botón vintage */
}

/* ===== RESET BASICO ===== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--color-fondo);
  color: var(--color-texto);
  line-height: 1.6;
}

/* ===== BANNER CON ESTILO DE ETIQUETA ===== */
.banner {
  background: linear-gradient(135deg, var(--color-acento), #e8d0a8);
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
}

.banner h1 {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 0 #a07d54, /* Sombra tipo "bloque"
                 -2px -2px 0 #a07d54;
  margin: 0.5rem 0;
}

.banner p {
  font-size: 1.2rem;
  color: #fff;
  margin: 0;
}

/* ===== MENÚ ESTILO BOTONES ===== */
.menu {
  background: #fff;
  padding: 0.5rem 1rem;
  border: 2px dashed #d4a574;
  margin-bottom: 2rem;
}

.menu ul {
  display: flex;
  justify-content: center;
  gap: 1rem;
  list-style: none;
}

.menu a {
  text-decoration: none;
  color: var(--color-texto);
  font-weight: bold;
  padding: 0.5rem 1rem;
  background: #fdf6e3;
  border-radius: 4px;
  transition: background 0.3s;
}

.menu a:hover {
  background: #e8d0a8;
}

/* ===== PRODUCTOS EN BLOQUES ===== */
.productos {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.producto {
  background: #fff;
  border: 3px solid #d4a574;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  transition: transform 0.2s;
}

.producto:hover {
  transform: translateY(-4px);
}

.producto h3 {
  color: var(--color-acento);
  margin-bottom: 0.5rem;
}

.producto p {
  color: #666;
  font-size: 1.1rem;
}

.agregar-carrito {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: var(--color-boton);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

/* ===== CARRITO DE COMPRAS ===== */
.carrito {
  background: #fff;
  border: 3px solid #d4a574;
  padding: 1.5rem;
  margin-top: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

#lista-carrito li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

#total {
  font-weight: bold;
  color: var(--color-acento);
}

/* ===== EFECTOS ADICIONALES "MANO ALZADA" ===== */
.etiqueta {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #fff3e0;
  border: 2px solid #d4a574;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  color: #b76e4f;
  border-radius: 2px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
  .menu ul {
    flex-direction: column;
    align-items: center;
  }
  
  .producto {
    margin: 1rem 0;
  }
}
```

---

## Paso 3: Interactividad con JavaScript (script.js)

Hacemos que el carrito realmente funcione, añadiendo productos al hacer clic.

```javascript
// ===== CARRITO DE COMPRAS =====
const carrito = {
  items: [],
  get total() {
    return this.items.reduce((sum, item) => sum + item.precio, 0);
  }
};

// Elementos del DOM
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');
const botonesAgregar = document.querySelectorAll('.agregar-carrito');

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.items.push({ nombre, precio });
  actualizarCarrito();
}

// Actualizar la interfaz del carrito
function actualizarCarrito() {
  // Limpiar lista actual
  listaCarrito.innerHTML = '';
  
  // Mostrar cada item
  carrito.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    listaCarrito.appendChild(li);
  });
  
  // Mostrar total
  totalSpan.textContent = carrito.total.toFixed(2);
}

// Agregar evento a todos los botones
botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const producto = boton.parentElement;
    const nombre = producto.querySelector('h3').textContent;
    const precio = parseFloat(producto.querySelector('p').textContent.replace('$', ''));
    agregarAlCarrito(nombre, precio);
    
    // Mensaje de confirmación "bloquey"
    alert(`✅ ${nombre} agregado al carrito`);
  });
});

// ===== Mensaje de bienvenida =====
alert('¡Bienvenido a la tienda bloquey! 🎉\n\nHaz clic en "Agregar al carrito" para probar la funcionalidad.');
```

---

## Paso 4: ¿Cómo probarlo?

1. **Crea tres archivos** en la misma carpeta:
   - `index.html` (código anterior)
   - `style.css` (código anterior)  
   - `script.js` (código anterior)

2. **Abre `index.html`** en tu navegador (Chrome, Firefox, Edge).

3. **Interacción**:
   - Pasa el mouse sobre los productos: deberían levantarse un poco (`transform`)
   - Haz clic en "Agregar al carrito": verás un alert y el carrito se actualizará
   - Ve a la sección "Carrito": verás los items agregados y el total

---

## Paso 5: Transformando a tienda de perfumes (usando Notepad)

Ahora que tienes el código base, para crear una página de **tienda de perfumes** usando el bloque de notas:

1. **Abre el Bloc de notas** (Windows + R, escribe `notepad`, Enter)
2. **Copia el `index.html`** pero cambia el título y el contenido:
   - Cambia "TIENDA DE PERFUMES" por tu marca de perfumes
   - Reemplaza los productos por perfumes específicos (ej: "Perfume N°5", "Chanel Classic", etc.)
   - Cambia los precios y descripciones
3. **Modifica `style.css`** con colores y fragancias:
   - Usa colores que evocen las notas del perfume (florales, maderados, cítricos)
   - Cambia la paleta: `--color-acento: #ff69b4` (rosa fragancia) o `#2ca3cc` (céano oceánico)
4. **Ajusta `script.js`** si deseas añadir más productos o funcionalidades específicas.

### Ejemplo rápido de cambio de productos en HTML:

```html
<!-- En lugar de "Perfume Clásico" -->
<div class="producto">
  <h3>Perfume N°5</h3>
  <p>$150.00</p>
  <button class="agregar-carrito">Agregar al carrito</button>
</div>

<!-- En lugar de "Perfume Floral" -->
<div class="producto">
  <h3>Jasmin Puro</h3>  
  <p>$85.00</p>
  <button class="agregar-carrito">Agregar al carrito</button>
</div>
```

---

## Mensaje de logro 🎉

**¡Muy bien!** Has creado exitosamente:
- ✅ Una página web con estilo "bloquey/ scrappy" único
- ✅ Un banner atractivo con efecto de etiqueta
- ✅ Un menú de navegación funcional
- ✅ Un carrito de compras que realmente funciona
- ✅ Código con comentarios explicando cada parte
- ✅ Un sistema listo para transformarse en cualquier tienda (¡incluso de perfumes!)

**Siguiente paso**: Usa el Bloc de notas para personalizar los perfumes, cambiar colores que evocan olores y hacer tu tienda única. ¡El código es tu lienzo creativo!

¿Necesitas ayuda para alguna parte específica o quieres agregar más features al carrito?