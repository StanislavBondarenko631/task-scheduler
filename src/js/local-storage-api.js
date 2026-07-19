// Функция для сохранения данных в localStorage
// Она принимает ключ (под каким именем сохранить) и само значение (что сохранить)
export function saveToLocalStorage(key, value) {
  // Превращаем наш массив или объект в строку
  const serializedState = JSON.stringify(value);
  // Записываем полученную строку в localStorage браузера
  localStorage.setItem(key, serializedState);
}

// Функция для загрузки данных из localStorage
// Она принимает только ключ (имя, под которым мы данные сохраняли)
export function loadFromLocalStorage(key) {
  // Пробуем достать строчку из памяти браузера
  const serializedState = localStorage.getItem(key);
  // Если там ничего нет (вернулся null), возвращаем null.
  // Если строка есть — превращаем её обратно в JS-объект с помощью JSON.parse
  return serializedState ? JSON.parse(serializedState) : null;
}
