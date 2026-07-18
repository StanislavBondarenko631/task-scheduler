(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();function a(t){return`
    <li class="task-list-item">
    <button class="task-list-item-btn" data-id="${t.id}">Delete</button>
    <h3>${t.name}</h3>
    <p>${t.description}</p>
</li>

    `}const c={taskForm:document.querySelector("#task-form"),taskList:document.querySelector("#task-list"),themeButton:document.querySelector("#themeToggle")};function l(t,s){return{id:Date.now(),name:t,description:s}}function u(t){t.preventDefault();const s=t.currentTarget.elements.taskName.value.trim(),i=t.currentTarget.elements.taskDescription.value.trim();if(s===""||i===""){alert("Будь-ласка заповніть пусті поля!");return}const o=l(s,i),e=a(o);c.taskList.insertAdjacentHTML("beforeend",e),console.log(o),t.currentTarget.reset()}c.taskForm.addEventListener("submit",u);function m(t){if(!t.target.classList.contains("task-list-item-btn"))return;console.log("Кликнули по кнопке Delete!"),t.target.closest(".task-list-item").remove()}c.taskList.addEventListener("click",m);
//# sourceMappingURL=index.js.map
