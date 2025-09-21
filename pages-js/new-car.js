const form = document.getElementById("carForm");
const addBtn = document.getElementById("newCarButton");
const cardsContainer = document.getElementById("cardsContainer");
const elDark = document.getElementById("dark");
const modal = document.getElementById("carModal");
const modalContent = document.getElementById("modalContent");
const modalTitle = document.getElementById("modalTitle");
const closeModalBtn = document.getElementById("closeModal");

const inputs = {
  carsName: document.getElementById("carsName"),
  trim: document.getElementById("trim"),
  generation: document.getElementById("generation"),
  year: document.getElementById("year"),
  color: document.getElementById("color"),
  colorName: document.getElementById("colorName"),
  category: document.getElementById("category"),
  doorCount: document.getElementById("doorCount"),
  seatCount: document.getElementById("seatCount"),
  maxSpeed: document.getElementById("maxSpeed"),
  acceleration: document.getElementById("acceleration"),
  engine: document.getElementById("engine"),
  horsepower: document.getElementById("horsepower"),
  fuelType: document.getElementById("fuelType"),
  fuelConsumtion: document.getElementById("fuelConsumtion"),
  country: document.getElementById("country"),
  description: document.getElementById("description"),
};

const storageKey = "carsList_v1";

form.addEventListener("submit", (e) => e.preventDefault());

let cars = JSON.parse(localStorage.getItem(storageKey) || "[]");

function saveCars() {
  localStorage.setItem(storageKey, JSON.stringify(cars));
}

function gatherInput() {
  const obj = {};
  for (const k in inputs) {
    obj[k] = inputs[k].value?.trim() || "";
  }
  return obj;
}

function clearInputs() {
  for (const k in inputs) inputs[k].value = "";
}

function renderCards() {
  cardsContainer.innerHTML = "";

  cars.forEach((car, idx) => {
    const card = document.createElement("article");
    card.className =
      "bg-white p-4 rounded-2xl border shadow-sm flex flex-col justify-between";

    const info = document.createElement("div");
    const title = document.createElement("h3");
    title.className = "text-lg font-semibold";
    title.textContent = car.carsName || "—";
    info.appendChild(title);

    const meta = document.createElement("p");
    meta.className = "text-sm text-gray-600 mt-1";
    meta.textContent = `${car.trim || "—"} • ${car.generation || "—"} • ${
      car.year || "—"
    }`;
    info.appendChild(meta);

    const bottomRow = document.createElement("div");
    bottomRow.className = "mt-4 flex items-center justify-between gap-3";

    const left = document.createElement("div");
    left.className = "flex items-center gap-3";

    const swatch = document.createElement("span");
    swatch.className = "w-5 h-5 rounded border";
    if (car.color) swatch.style.backgroundColor = car.color;
    left.appendChild(swatch);

    const colorText = document.createElement("span");
    colorText.className = "text-sm text-gray-600";
    colorText.textContent = car.colorName || car.color || "—";
    left.appendChild(colorText);

    bottomRow.appendChild(left);

    const btns = document.createElement("div");
    btns.className = "flex items-center gap-2";

    const detailsBtn = document.createElement("button");
    detailsBtn.className =
      "px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm";
    detailsBtn.textContent = "Batafsil";
    detailsBtn.type = "button";
    detailsBtn.dataset.index = idx;
    btns.appendChild(detailsBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className =
      "px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm";
    deleteBtn.textContent = "O'chirish";
    deleteBtn.type = "button";
    deleteBtn.dataset.index = idx;
    btns.appendChild(deleteBtn);

    bottomRow.appendChild(btns);

    card.appendChild(info);
    card.appendChild(bottomRow);
    cardsContainer.appendChild(card);

    detailsBtn.addEventListener("click", () => openModalWithCar(idx));
    deleteBtn.addEventListener("click", () => {
      if (!confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;
      cars.splice(idx, 1);
      saveCars();
      renderCards();
    });
  });
}

function openModalWithCar(index) {
  const car = cars[index];
  if (!car) return;

  modalTitle.textContent = car.carsName || "Ma'lumotlar";

  modalContent.innerHTML = "";

  const labels = {
    carsName: "Nomi",
    trim: "Trim",
    generation: "Generation",
    year: "Year",
    color: "Rang (hex)",
    colorName: "Color name",
    category: "Category",
    doorCount: "Door Count",
    seatCount: "Seat Count",
    maxSpeed: "Max Speed",
    acceleration: "Acceleration",
    engine: "Engine",
    horsepower: "Horse Power",
    fuelType: "Fuel Type",
    fuelConsumtion: "Fuel Consumption",
    country: "Country",
    description: "Description",
  };

  Object.keys(labels).forEach((key) => {
    const row = document.createElement("div");
    row.className = "flex items-start justify-between gap-3";

    const kEl = document.createElement("div");
    kEl.className = "font-medium text-gray-700 w-40";
    kEl.textContent = labels[key];

    const vEl = document.createElement("div");
    vEl.className = "text-right text-gray-800 break-words";
    if (key === "color") {
      const sw = document.createElement("span");
      sw.className = "inline-block w-4 h-4 rounded border mr-2 align-middle";
      if (car.color) sw.style.backgroundColor = car.color;
      vEl.appendChild(sw);
      vEl.appendChild(document.createTextNode(car[key] || "—"));
    } else {
      vEl.textContent = car[key] || "—";
    }

    row.appendChild(kEl);
    row.appendChild(vEl);
    modalContent.appendChild(row);
  });

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  closeModalBtn.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

addBtn.addEventListener("click", () => {
  const newCar = gatherInput();

  if (!newCar.carsName) {
    alert("Iltimos, mashina nomini kiriting.");
    inputs.carsName.focus();
    return;
  }

  cars.push(newCar);
  saveCars();
  renderCards();
  clearInputs();
});

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
elDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    elDark.classList.add("border-black");
    elDark.classList.add("border-[1px]");
  } else {
    localStorage.setItem("theme", "light");
    elDark.classList.add("border-white");
  }
});
renderCards();
