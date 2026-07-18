/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/

import { createTaskMarkup } from './js/render-tasks.js';
import { refs } from './js/refs.js';
import { createTaskObject } from './js/tasks.js';

// Создаем функцию, которая будет срабатывать при отправке формы
function onFormSubmit(event) {
  // Отменяем стандартное поведение формы (перезагрузку страницы)
  event.preventDefault();

  // 1. Получаем значения из инпутов по их атрибутам name
  // event.currentTarget — это наша форма, elements — её элементы
  const taskName = event.currentTarget.elements.taskName.value.trim(); // trim убираем случайные пробелы  по краям
  const taskDescription =
    event.currentTarget.elements.taskDescription.value.trim();

  // 2. Проверяем, что поля не пустые
  // Если taskName ПУСТОЙ ИЛИ (||) taskDescription ПУСТОЙ
  if (taskName === '' || taskDescription === '') {
    alert('Будь-ласка заповніть пусті поля!');
    return; // Останавливаем функцию, чтобы пустая задача не пошла дальше
  }

  // Создаем объект задачи, передавая в функцию собранные из инпутов строки
  const newTask = createTaskObject(taskName, taskDescription);

  // Генерируем HTML-строку для новой задачи
  const taskMarkup = createTaskMarkup(newTask);

  // Вставляем полученную строку на страницу внутрь списка ul (помним, что ссылка на него лежит в refs.taskList)
  refs.taskList.insertAdjacentHTML('beforeend', taskMarkup);

  console.log(newTask);

  event.currentTarget.reset(); // очищаем поля после добавления задания
}

refs.taskForm.addEventListener('submit', onFormSubmit);

// 1. Создаем функцию, которая будет срабатывать при клике внутри списка UL
function onTaskListClick(event) {
  // Проверяем, содержит ли элемент, на который кликнули, класс кнопки удаления
  // event.target — это конкретный элемент, на который пришелся клик пальцем или мышкой
  if (!event.target.classList.contains('task-list-item-btn')) {
    // Если кликнули НЕ по кнопке Delete, то сразу выходим из функции и ничего не делаем
    return;
  }

  // Если код дошел досюда, значит клик точно был по кнопке Delete!
  console.log('Кликнули по кнопке Delete!');

  // Находим всю карточку <li>, в которой лежит эта кнопка
  const listItem = event.target.closest('.task-list-item');

  // Удаляем карточку <li> со страницы
  listItem.remove();
}

// 2. Вешаем слушатель клика на весь список UL
refs.taskList.addEventListener('click', onTaskListClick);
