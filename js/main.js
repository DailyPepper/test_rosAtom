document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".list__form");
  const formInput = document.querySelector(".list__input");
  const listItems = document.querySelector(".list__items");
  const listCount = document.querySelector(".list__cnt");
  const checkBoxAdd = document.querySelector(".block__item--odd");
  const checkBoxAddEven = document.querySelector(".block__item--even");
  const removeButton = document.querySelector(".block__button-first");
  const removeBtnEnd = document.querySelector(".block__button-end");

  let cnt = 1;
  let tasks = [];

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      renderTasks();
    }
  }

  function addTask(taskText) {
    tasks.push(taskText);
    saveTasksToLocalStorage();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
  }

  function renderTasks() {
    listItems.innerHTML = "";
    tasks.forEach((taskText) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list__item-block");
      listItem.innerHTML = `
        <p class="list-items__text">${taskText}</p>
        <button class="list__item-button">complete</button>
        <button class="list__items-button">delete</button>
      `;
      listItems.appendChild(listItem);
    });
    listCount.textContent = tasks.length;
  }


  loadTasksFromLocalStorage();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formElem = formInput.value.trim();
    if (formElem === "") return;
    addTask(formElem);
    renderTasks();
    formInput.value = "";
  });

  listItems.addEventListener("click", function (e) {
    if (e.target.classList.contains("list__items-button")) {
      const listItem = e.target.parentElement;
      const index = Array.from(listItems.children).indexOf(listItem);
      deleteTask(index);
      listItem.remove();
      renderTasks();
    } else if (e.target.classList.contains("list__item-button")) {
      completeElem(e.target.parentElement);
    }
  });

  function completeElem(elem) {
    elem.classList.toggle("completed");
    listItems.insertBefore(elem, listItems.lastChild.nextSibling);
  }


  function handleCheckbox() {
    if (checkBoxAdd.checked) {
      listItems.classList.add("block__item--odd");
    } else {
      listItems.classList.remove("block__item--odd");
    }
  }

  checkBoxAdd.addEventListener("change", handleCheckbox);

  function changeCheckboxEven() {
    if (checkBoxAddEven.checked) {
      listItems.classList.add("block__item--even");
    } else {
      listItems.classList.remove("block__item--even");
    }
  }

  checkBoxAddEven.addEventListener("change", changeCheckboxEven);

  removeButton.addEventListener("click", function () {
    const firstItem = listItems.querySelector("li:first-child");

    if (firstItem) {
      const index = Array.from(listItems.children).indexOf(firstItem);
      deleteTask(index);
      firstItem.remove();
      renderTasks();
    }
  });

  removeBtnEnd.addEventListener("click", function () {
    const lastItem = listItems.querySelector("li:last-child");

    if (lastItem) {
      const index = Array.from(listItems.children).indexOf(lastItem);
      deleteTask(index);
      lastItem.remove();
      renderTasks();
    }
  });
});
