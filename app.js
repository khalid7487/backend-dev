const acc = document.querySelectorAll(".accordions");

const text = document.querySelector(".content");

acc.forEach((element) => {
  element.addEventListener("click", () => {
    if (text) text.style.display = "none";
  });
});
