const form = document.querySelector("form");
const nameInput = document.querySelector("#name-input");
const countrySelect = document.querySelector("#country-select");
const countryList = document.querySelector("#country-list");
const imageInput = document.getElementById("image-url-input");

function handleSubmit(e) {
  e.preventDefault();

  if (nameInput.value < 1) {
    alert("You must enter a city name");
    return;
  }

  // Set a default image URL
  const defaultImageUrl =
    "https://www.shutterstock.com/image-vector/background-scene-buildings-city-illustration-260nw-1718113291.jpg";
  const imageUrl = imageInput.value.trim()
    ? imageInput.value.trim()
    : defaultImageUrl;

  let userRating = document.querySelector('input[name="rating"]:checked').value;
  let body = {
    name: nameInput.value,
    rating: +userRating,
    countryId: +countrySelect.value,
    image_url: imageUrl,
  };

  axios.post("http://localhost:4004/cities", body).then(() => {
    countrySelect.value = 1;
    nameInput.value = "";
    document.querySelector("#rating-one").checked = true;
    getCities();
  });
}

function deleteCard(id) {
  axios
    .delete(`http://localhost:4004/cities/${id}`)
    .then(() => getCities())
    .catch((err) => console.log(err));
}

function getCities() {
  countryList.innerHTML = "";

  axios.get("http://localhost:4004/cities/").then((res) => {
    res.data.forEach((elem) => {
      const { city_name, name: country, rating, city_id, image_url } = elem;
      let countryCard = `<div class="country-card">
      <div class="city-image" style="background-image: url('${image_url}')"></div>
      <div class="card-content">
          <h2>${city_name}</h2>
          <h2>${country}</h2>
          <h3>Rating: ${rating}/5</h3>
          <button onclick="deleteCard(${city_id})">Delete</button>
      </div>
  </div>
  `;

      countryList.innerHTML += countryCard;
    });
  });
}

function getCountries() {
  axios.get("http://localhost:4004/countries").then((res) => {
    res.data.forEach((country) => {
      const option = document.createElement("option");
      option.setAttribute("value", country["country_id"]);
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  });
}

getCountries();
getCities();
form.addEventListener("submit", handleSubmit);
