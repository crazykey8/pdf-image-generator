import jsPDF from 'jspdf'

export function manualHard() {
  // Максимальное количество изображений на одной странице
  const maxImagesPerPage = 12

  // Создание списка изображений
  const imageList = document.querySelector('.image-list') as HTMLDivElement
  const selectedList = document.querySelector(
    '.selected-list',
  ) as HTMLDivElement
  const generatePdfButton = document.getElementById(
    'generate-pdf',
  ) as HTMLButtonElement

  // Создаем новую PDF
  const pdf = new jsPDF({
    orientation: 'portrait', // Горизонтальная ориентация
  })

  // Обработчик событий по клику изображений
  imageList.addEventListener('click', (event) => {
    const target = event.target as HTMLImageElement

    // Проверяем, что кликнули на изображение и не превысили максимальное количество изображений на странице
    if (target.tagName === 'IMG') {
      // Создаем копию изображения
      const selectedImage = target.cloneNode() as HTMLImageElement
      selectedImage.classList.add('selected-item')

      // Добавляем выбранное изображение в секцию с выбранными
      selectedList.appendChild(selectedImage)

      // Удаляем изображение из секции с изображениями
      imageList.removeChild(target)
    }
  })

  // Обработчик событий по клику на генерировать PDF
  generatePdfButton.addEventListener('click', () => {
    // Размеры изображений на странице
    const imageWidth = 60
    const imageHeight = 60

    const domain = window.location.origin // Получаем текущий домен

    // Координаты для размещения изображений
    const positions = [
      // первая строчка
      { x: 12, y: 0 + 35 + 3 },
      { x: imageWidth + 15, y: -20 + 43 },
      { x: imageWidth + 78, y: 0 + 35 + 3 },
      // вторая строчка
      { x: 12, y: imageHeight + 35 + 3 + 3 },
      { x: imageWidth + 15, y: imageHeight - 20 + 43 + 3 },
      { x: imageWidth + 78, y: imageHeight + 35 + 3 + 3 },
      // третья строчка
      { x: 12, y: imageHeight * 2 + 35 + 6 + 3 },
      { x: imageWidth + 15, y: imageHeight * 2 - 20 + 43 + 6 },
      { x: imageWidth + 78, y: imageHeight * 2 + 35 + 6 + 3 },
      // четвертая строчка
      { x: 12, y: imageHeight * 3 + 35 + 9 + 3 },
      { x: imageWidth + 15, y: imageHeight * 3 - 20 + 43 + 9 },
      { x: imageWidth + 78, y: imageHeight * 3 + 35 + 9 + 3 },
    ]

    // Итерируемся по выбранным изображениям и добавляем их на страницу PDF
    const selectedImages = selectedList.querySelectorAll('.selected-item')
    let imagesOnCurrentPage = 0
    let currentPage = 1

    const imagesCount = selectedImages.length
    let totalPages = 1

    if (imagesCount > maxImagesPerPage) {
      totalPages = Math.ceil(imagesCount / maxImagesPerPage)
    }

    const buttonsWidth = 60
    const buttonsHeight = 12
    const buttonsPositionY = 23

    if (currentPage === 1) {
      pdf.addImage('./on-pdf/green-start.png', 'jpeg', 0, 0, 210, 27)
    }
    selectedImages.forEach((image, index) => {
      const linkPath = image.getAttribute('link')
      if (index % maxImagesPerPage === 0 && index !== 0) {
        // Создаем новую страницу при необходимости
        pdf.addPage()
        currentPage++
        imagesOnCurrentPage = 0
      }

      pdf.addImage(
        './on-pdf/buy-ticket.png',
        'jpeg',
        12,
        buttonsPositionY,
        buttonsWidth,
        buttonsHeight,
        undefined,
        'FAST',
      )
      pdf.addImage(
        './on-pdf/select-hotel.png',
        'jpeg',
        138,
        buttonsPositionY,
        buttonsWidth,
        buttonsHeight,
        undefined,
        'FAST',
      )

      pdf.link(12, buttonsPositionY, buttonsWidth, buttonsHeight, {
        url: `${domain}/buy-tickets`,
      })
      pdf.link(138, buttonsPositionY, buttonsWidth, buttonsHeight, {
        url: `${domain}/select-hotel`,
      })

      /*
      не понятно как, но без этого фрагмента кода
      картинки бы не смогли перекрывать футер :/
      */
      if (index % maxImagesPerPage === 0) {
        if (currentPage === totalPages) {
          pdf.addImage('./on-pdf/green-end.png', 'jpeg', 0, 280, 210, 27)
        }
      }

      // Боковые зеленые линии по бокам
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      pdf.setFillColor(80, 138, 24) // Зеленый цвет
      pdf.rect(0, 0, 8, pageHeight, 'F') // Левая боковая область
      pdf.rect(pageWidth - 8, 0, 10, pageHeight, 'F') // Правая боковая область

      const position = positions[index % maxImagesPerPage]
      pdf.addImage(
        image.dataset.pdf as string,
        'PNG',
        position.x,
        position.y,
        imageWidth,
        imageHeight,
        undefined,
        'FAST',
      )
      pdf.link(position.x, position.y, imageWidth, imageHeight, {
        url: `${domain}${linkPath}`,
      })

      // Увеличиваем счетчик изображений на странице
      imagesOnCurrentPage++
    })

    // Сохраняем PDF
    pdf.save('selected_images.pdf')
  })
}
