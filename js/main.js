document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".list__form");
  const formInput = document.querySelector(".list__input");
  const listItems = document.querySelector(".list__items");
  const listCount = document.querySelector(".list__cnt");

  let cnt = 1;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    addElem();
  });

  listItems.addEventListener("click", function (e) {
    if (e.target.classList.contains("list__items-button")) {
      deleteElem(e.target.parentElement);
    } else if (e.target.classList.contains("list__item-button")) {
      completeElem(e.target.parentElement);
    }
  });

  function addElem() {
    const formElem = formInput.value.trim();
    if (formElem === "") return;

    const listItem = document.createElement("li");
    listItem.classList.add("list__item-block");
    listItem.innerHTML = `
      <p class="list-items__text">${formElem}</p>
      <button class="list__item-button">complete</button>
      <button class="list__items-button">delete</button>
    `;

    listItems.insertBefore(listItem, listItems.firstChild);

    formInput.value = "";
    listCount.textContent = ++cnt;
  }

  function deleteElem(elem) {
    elem.remove();
    cnt--;
    listCount.textContent = cnt;
  }

  function completeElem(elem) {
    elem.classList.toggle("completed");
    listItems.insertBefore(elem, listItems.end);
  }
});

$('.switch-btn').click(function(){
  $(this).toggleClass('switch-on');
  if ($(this).hasClass('switch-on')) {
    $(this).trigger('on.switch');
  } else {
    $(this).trigger('off.switch');
  }
});