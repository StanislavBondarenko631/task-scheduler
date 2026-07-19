//  <li class="task-list-item">
//       <button class="task-list-item-btn">Delete</button>
//       <h3>Заголовок</h3>
//       <p>Текст</p>
//   </li>
// Обрати внимание: кнопке "Delete" мы сразу добавим специальный атрибут data-id="${task.id}". Это наш скрытый маркер. Когда пользователь нажмет "Delete", программа по этому id поймет, какую именно задачу нужно удалить!

// Функция принимает объект задачи и возвращает HTML-строку
export function createTaskMarkup(task) {
  return `
    <li class="task-list-item">
    <button class="task-list-item-btn" data-id="${task.id}">Delete</button>
    <h3>${task.name}</h3>
    <p>${task.description}</p>
</li>

    `;
}

// РАБОТА С localStorage
// Функция принимает МАССИВ задач и возвращает одну общую HTML-строку для всех задач
export function renderTaskList(tasksArray) {
  // Проходим по каждому элементу массива, вызываем для него createTaskMarkup,
  // а затем склеиваем получившиеся карточки в единую строку без запятых
  return tasksArray.map(task => createTaskMarkup(task)).join('');
}
