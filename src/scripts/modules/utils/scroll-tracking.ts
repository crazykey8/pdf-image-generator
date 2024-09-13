export function scrollTracking(blockId: string, callback: () => void) {
  let hasReachedGoal = false // Флаг для отслеживания выполнения действия

  // Функция для выполнения действия
  function reachGoalOnce() {
    if (!hasReachedGoal) {
      callback()

      hasReachedGoal = true
    }
  }

  // Функция для отслеживания прокрутки и выполнения действия
  function trackScrollAndReachGoal() {
    const block = document.getElementById(blockId)

    if (block && !hasReachedGoal) {
      const scrollY = window.scrollY || window.pageYOffset
      const blockY = block.getBoundingClientRect().top + scrollY
      const triggerY = window.innerHeight * 0.8
      if (scrollY + triggerY >= blockY) {
        reachGoalOnce()
      }
    }
  }

  // Слушатель событий прокрутки
  window.addEventListener('scroll', () => {
    trackScrollAndReachGoal()
  })

  // Вызвать действие, если блок виден при загрузке страницы (если необходимо)
  window.addEventListener('load', () => {
    trackScrollAndReachGoal()
  })
}
