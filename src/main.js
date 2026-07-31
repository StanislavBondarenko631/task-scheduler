i; /*
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

// import { createTaskMarkup } from './js/render-tasks.js'; // так как в процессе перенесли в послеждний импорт !!!
import { refs } from './js/refs.js';
import { createTaskObject } from './js/tasks.js';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from './js/local-storage-api.js';
import { createTaskMarkup, renderTaskList } from './js/render-tasks.js';

// Создаем массив, где будут временно храниться все объекты наших задач
//Делаем на моменте работы с localStorage
let tasks = [];

//НАЧАЛО КОДА - Когда пишем createTaskMarkup, renderTaskList
// Функция, которая запускается один раз при старте приложения
function init() {
  // --- ПРОВЕРКА И ПРИМЕНЕНИЕ ТЕМЫ ПРИ ЗАГРУЗКЕ ---
  const savedTheme = loadFromLocalStorage('theme');

  if (savedTheme === 'light') {
    // Если пользователь выбрал светлую тему, убираем дефолтный темный класс и ставим светлый
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  } else {
    // Если в памяти 'dark' или там вообще пусто — гарантируем, что стоит темная тема
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  }
  // --- КОНЕЦ ПРОВЕРКИ ТЕМЫ ---

  const savedTasks = loadFromLocalStorage('tasks');
  if (savedTasks) {
    tasks = savedTasks;
    const markup = renderTaskList(tasks);
    refs.taskList.innerHTML = markup;
  } else {
    refs.taskList.innerHTML = '';
  }
}
// Вызываем функцию init(), чтобы она сработала прямо сейчас при загрузке скрипта
init();
//!!!!!   Конец кода по createTaskMarkup, renderTaskList

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

  // Добавляем новый объект задачи в наш массив tasks. ПИШЕМ ПРИ РАБОТЕ С localStorage
  tasks.push(newTask);
  // Сохраняем обновленный массив в localStorage под ключом 'tasks'
  saveToLocalStorage('tasks', tasks);

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

  // --- НАЧАЛО НОВОГО КОДА ДЛЯ ПАМЯТИ --- ПИШЕМ ПРИ РАБОТЕ С local
  // 1. Достаем уникальный id из атрибута data-id кнопки, на которую кликнули
  // И сразу переводим его из строки в число через Number()
  const taskId = Number(event.target.dataset.id);
  // 2. Фильтруем наш массив tasks.
  // Оставляем только те задачи, у которых id НЕ РАВЕН id удаленной задачи
  tasks = tasks.filter(task => task.id !== taskId);
  // 3. Перезаписываем обновленный массив в localStorage
  saveToLocalStorage('tasks', tasks);
  // --- КОНЕЦ localStorage КОДА ---

  // Находим всю карточку <li>, в которой лежит эта кнопка
  const listItem = event.target.closest('.task-list-item');

  // Удаляем карточку <li> со страницы
  listItem.remove();
}

// 2. Вешаем слушатель клика на весь список UL
refs.taskList.addEventListener('click', onTaskListClick);

// Пишем логику переключения темы
function onThemeButtonClick() {
  // Проверяем, есть ли сейчас на body класс темной темы
  if (document.body.classList.contains('theme-dark')) {
    // Если есть темный — меняем его на светлый
    document.body.classList.replace('theme-dark', 'theme-light');
    // Сохраняем в память строчку 'light'
    saveToLocalStorage('theme', 'light');
  } else {
    // Если темного нет (значит сейчас светлый) — меняем обратно на темный
    document.body.classList.replace('theme-light', 'theme-dark');
    // Сохраняем в память строчку 'dark'
    saveToLocalStorage('theme', 'dark');
  }
}
// 2. Вешаем слушатель клика на кнопку переключения темы
refs.themeButton.addEventListener('click', onThemeButtonClick);
