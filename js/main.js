
const form = document.querySelector(".list__form");
const formInput = document.querySelector(".list__input");
const listItems = document.querySelector(".list-items");
const listCount = document.querySelector(".list__cnt");

let cnt = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addElem();
});

listItems.addEventListener("click", delElem);
function addElem() {
  const formElem = formInput.value;
  if (formElem === "") return;
  const listItem = document.createElement("li");
  listItem.classList.add("list-items__item");
  listItem.innerHTML = `<p class="list-items__text">${formElem} </p> <button class="list-item__button">Удалить</button>`;
  listItems.appendChild(listItem);
  formInput.value = "";
  listCount.textContent = ++cnt;
}

function delElem(e) {
  if (e.target.classList.contains("list-item__button")) {
    e.target.closest(".list-items__item").remove();
    cnt--;
    listCount.textContent = cnt;
  }
}
