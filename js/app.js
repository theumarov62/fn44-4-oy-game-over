import { cars } from "./data.js";

const carsList = document.getElementById("cars-list");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const elDark = document.getElementById("dark");

function renderCars() {
  carsList.innerHTML = "";

  cars.forEach((car, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-transparent shadow-md rounded-lg p-4 border-white border-[1px]";

    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${car.name} <span class="text-gray-500">(${car.year})</span></h3>
      <p class=""><strong>Trim:</strong> ${car.trim}</p>
      <p class=""><strong>Tezlik:</strong> ${car.maxSpeed}</p>
      <p class=""><strong>Ot kuchi:</strong> ${car.horsepower} HP</p>
      <p class=" flex items-center">
        <strong>Rang:</strong> 
        <span class="w-5 h-5 rounded ml-2 mr-1" style="background:${car.color}"></span>
        ${car.colorName}
      </p>
      <div class="mt-4 flex space-x-2">
        <button class="btn-details px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Batafsil</button>
        <button class="btn-edit px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500">Edit</button>
        <button class="btn-delete px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
      </div>
    `;

    card
      .querySelector(".btn-details")
      .addEventListener("click", () => showDetails(car));
    card
      .querySelector(".btn-edit")
      .addEventListener("click", () => editCar(index));
    card
      .querySelector(".btn-delete")
      .addEventListener("click", () => deleteCar(index));

    carsList.appendChild(card);
  });
}

function showDetails(car) {
  modal.classList.remove("hidden");
  modalTitle.textContent = car.name;
  modalBody.innerHTML = `
    <p><strong>Trim:</strong> ${car.trim}</p>
    <p><strong>Yil:</strong> ${car.year}</p>
    <p><strong>Kategoriya:</strong> ${car.category}</p>
    <p><strong>Darvozalar:</strong> ${car.doorCount}</p>
    <p><strong>O‘rindiqlar:</strong> ${car.seatCount}</p>
    <p><strong>Tezlik:</strong> ${car.maxSpeed}</p>
    <p><strong>Acceleration:</strong> ${car.acceleration}</p>
    <p><strong>Engine:</strong> ${car.engine}</p>
    <p><strong>Horsepower:</strong> ${car.horsepower}</p>
    <p><strong>Fuel Type:</strong> ${car.fuelType}</p>
    <p><strong>Fuel Consumption:</strong> ${car.fuelConsumption}</p>
    <p><strong>Country:</strong> ${car.country}</p>
    <p><strong>Description:</strong> ${car.description}</p>
  `;
}

window.closeModal = function () {
  modal.classList.add("hidden");
};

function editCar(index) {
  const newName = prompt("Mashina nomini o‘zgartiring:", cars[index].name);
  if (newName) {
    cars[index].name = newName;
    renderCars();
  }
}

function deleteCar(index) {
  if (confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
    cars.splice(index, 1);
    renderCars();
  }
  localStorage("delete", "del");
}

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
renderCars();
