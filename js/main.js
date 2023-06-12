// Función para verificar si un elemento está visible en la ventana
function isElementVisible(element) {
	var elementPosition = element.getBoundingClientRect()
	var windowHeight = window.innerHeight

	return elementPosition.top < windowHeight
	// && elementPosition.bottom >= 0
}

// Función para animar los elementos cuando lleguen a la vista
function animateElements() {
	var elements = document.querySelectorAll('.fade-in')

	elements.forEach(function (element) {
		if (isElementVisible(element)) {
			element.classList.add('show')
		} else {
			element.classList.remove('show')
		}
	})
}

// Escucha el evento 'scroll' para animar los elementos cuando lleguen a la vista
window.addEventListener('scroll', animateElements)

// Animar los elementos cuando se cargue la página (en caso de que ya estén en la vista)
animateElements()

// Obtener el contenedor donde se insertarán las cards
const portfolioContainer = document.querySelector('.row-cols-1')

// Cargar el archivo JSON
fetch('../data/portfolio.json')
	.then((response) => response.json())
	.then((data) => {
		// Recorrer los datos del portfolio
		data.portfolio.forEach((item) => {
			// Crear elementos de la card
			const col = document.createElement('div')
			col.classList.add('col')
			col.classList.add('mb-3')

			const card = document.createElement('div')
			card.classList.add('card', 'portfolio-grid-element', 'h-100', 'bg-dark')

			const image = document.createElement('img')
			image.src = item.image
			image.classList.add('card-img-top')
			image.alt = 'Card Image'

			const cardBody = document.createElement('div')
			cardBody.classList.add('card-body')

			const title = document.createElement('h3')
			title.classList.add('card-title')
			title.textContent = item.title

			const category = document.createElement('p')
			category.classList.add('card-text')
			category.textContent = item.category

			const link = document.createElement('a')
			link.href = item.link
			link.classList.add('btn', 'color-orange')
			link.textContent = 'Ver Más'

			const cardFooter = document.createElement('div')
			cardFooter.classList.add('card-footer')

			const updated = document.createElement('p')
			updated.classList.add('card-text')
			updated.textContent = `Actualizado: ${item.updated}`

			// Insertar los elementos en la card
			cardBody.appendChild(title)
			cardBody.appendChild(category)
			cardBody.appendChild(link)
			cardFooter.appendChild(updated)

			card.appendChild(image)
			card.appendChild(cardBody)
			card.appendChild(cardFooter)

			col.appendChild(card)

			// Insertar la card en el contenedor
			portfolioContainer.appendChild(col)
		})
	})
