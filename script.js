// 1. Datos de los Plugins
const pluginsData = [
 {
 id: 1,
 name: "SEO Pro",
 description: "Optimiza automáticamente tu contenido para motores de búsqueda...",
 shortDescription: "Optimización SEO avanzada.",
 image: "https://i.imgur.com/HsK2IDm.jpeg",
fullImage: "https://i.imgur.com/ZJxJrA3.jpeg",
 screenshots: ["https://via.placeholder.com/250x150?text=SEO+Dashboard", "https://via.placeholder.com/250x150?text=Analisis+Keywords"],
 moreInfo: "Este plugin incluye análisis de palabras clave, mapas de sitio XML automáticos y sugerencias de contenido para mejorar tu ranking.",
 downloadLink: "https://download2390.mediafire.com/qsuxpqhxioogWpjHOsYQ_OPeUQ-fC1Jd8Kc1rnyHCHPqALKyPGQmGhb7sGQC-0A-DUCyPFg8IqRyxA4H8OMxeLCE6WjLlMTY0F1c09nnBanzeRMXxdQyHbkMpuOsWOc1oKfBBKRsEhsDXiB7oCYgNDrw-QTqjw5CuTHNB_1InkiM/5i3uq8676qqigm7/Gta+San+Andreas+%5BLimpio%5D+-+TheFenix010.rar"
 },
 {
 id: 2,
 name: "Formulario Contacto Fácil",
 description: "Crea formularios de contacto sencillos y seguros sin escribir código.",
 shortDescription: "Constructor de formularios simple.",
 image: "https://via.placeholder.com/100x100?text=FORM",
 fullImage: "https://via.placeholder.com/400x200?text=Form+Easy+Banner",
 screenshots: ["https://via.placeholder.com/250x150?text=Editor+Campos", "https://via.placeholder.com/250x150?text=Configuracion", "https://via.placeholder.com/250x150?text=Vista+Final"],
 moreInfo: "Soporta múltiples campos, integración anti-spam (reCAPTCHA) y notificaciones de email personalizables.",
 downloadLink: "plugins/contacto-facil.zip"
 }
];

const listContainer = document.getElementById('pluginListContainer');
const searchInput = document.getElementById('searchInput');
const detailSection = document.getElementById('pluginDetail');
const detailContent = document.getElementById('detailContent');
const closeButton = document.getElementById('closeDetail');

// 2. Función para crear el contenedor (Card) de un plugin en la lista
function createPluginContainer(plugin) {
 const container = document.createElement('div');
 container.className = 'plugin-container';
 container.setAttribute('data-id', plugin.id);

// Utilizamos 'a' para que el clic abra los detalles, pero el botón maneja la descarga.
 container.innerHTML = `
 <img src="${plugin.image}" alt="${plugin.name} icono" class="plugin-image">
 <div class="plugin-info">
 <h3>${plugin.name}</h3>
 <p>${plugin.shortDescription}</p>
 <a href="${plugin.downloadLink}" download class="download-button" onclick="event.stopPropagation();">
 ⬇️ Descargar
 </a>
 </div>
 `;

 // 3. Añadir el evento de clic para mostrar los detalles
 container.addEventListener('click', () => showPluginDetail(plugin.id));

 return container;
}

// 4. Función para renderizar la lista completa (o filtrada)
function renderPlugins(pluginsToRender) {
listContainer.innerHTML = ''; // Limpiar la lista actual
 if (pluginsToRender.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No se encontraron plugins que coincidan con su búsqueda.</p>';
        return;
    }
 pluginsToRender.forEach(plugin => {
 listContainer.appendChild(createPluginContainer(plugin));
 });
}

// 5. Función para mostrar la vista detallada
function showPluginDetail(id) {
 const plugin = pluginsData.find(p => p.id === id);

 if (!plugin) return;

 const screenshotsHtml = plugin.screenshots.map(src => `<img src="${src}" alt="Captura de ${plugin.name}">`).join('');

 detailContent.innerHTML = `
 <img src="${plugin.fullImage}" alt="${plugin.name} Banner">
 <h2>${plugin.name}</h2>
 <a href="${plugin.downloadLink}" download class="download-button primary-button">
 ⬇️ Descargar ${plugin.name} Ahora
 </a>

 <p><strong>Descripción completa:</strong> ${plugin.description}</p>
 <p>${plugin.moreInfo}</p>
 <h3>Capturas de Pantalla:</h3>
  <div class="screenshot-grid">${screenshotsHtml}</div>
 `;

 detailSection.classList.remove('hidden');
}

// 6. Función de búsqueda (Filtro)
function filterPlugins() {
 const searchTerm = searchInput.value.toLowerCase();
 const filteredPlugins = pluginsData.filter(plugin => {
 // Buscar en el nombre o la descripción corta
 return plugin.name.toLowerCase().includes(searchTerm) || 
plugin.shortDescription.toLowerCase().includes(searchTerm);
 });
 renderPlugins(filteredPlugins);
}

// 7. Event Listeners y Arranque Inicial

// Evento al escribir en la barra de búsqueda
searchInput.addEventListener('keyup', filterPlugins);
searchInput.addEventListener('change', filterPlugins);

// Evento para cerrar la vista detallada
closeButton.addEventListener('click', () => {
 detailSection.classList.add('hidden');
});

// Cargar todos los plugins al iniciar la página
renderPlugins(pluginsData);