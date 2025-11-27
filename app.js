const accordions = document.querySelectorAll(".accordions");

const text = document.querySelector(".content");

accordions.forEach((element) => {
  element.addEventListener("click", () => {
    if (text) text.style.display = "none";
  });
});
