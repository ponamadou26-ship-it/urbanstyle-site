/* ===== КОРЗИНА ===== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

function addToCart(name, price, image) {
  cart.push({ name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(name + " добавлен в корзину");
}

function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.innerText = cart.length;
  });
}

/* ===== ОТОБРАЖЕНИЕ КОРЗИНЫ ===== */
function displayCart() {
  const list = document.getElementById("cart-items");
  const totalBox = document.getElementById("total");
  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img src="${item.image}">
      <div>
        <strong>${item.name}</strong><br>
        ${item.price} €
      </div>
    `;
    list.appendChild(li);
  });

  if (totalBox) totalBox.innerText = "Итого: " + total + " €";
}

displayCart();

function checkout() {
  document.getElementById("payment-box").style.display = "block";
}

/* ===== СЛАЙДЕР НА ГЛАВНОЙ ===== */
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

if (slides.length > 0 && next && prev) {

  next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  // Автопрокрутка
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 6000);
}

function pay() {
  alert("Оплата принята ✔ Спасибо за покупку!");
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  window.location = "index.html";
}
