var prodName = document.getElementById("name");
var prodPrice = document.getElementById("price");
var prodCategory = document.getElementById("category");
var prodDesc = document.getElementById("description");
var prodImage = document.getElementById("inputImage");
var search = document.getElementById("search");
var addProduct = document.getElementById("addProduct");
var updateProduct = document.getElementById("updateProduct");
var products;

var indexUpdate = 0;

if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));

  document.getElementById("products").style.visibility = "visible";

  displayDataAndSearch();
} else {
  products = [];
}

document.getElementById("addProduct").addEventListener("click", function () {
  if (
    validateName() &&
    validatePrice() &&
    validateCategory() &&
    validateDesc()
  ) {
    var product = {
      name: prodName.value,
      price: prodPrice.value,
      category: prodCategory.value,
      description: prodDesc.value,
      image: prodImage.files[0]?.name
        ? `./images/${prodImage.files[0]?.name}`
        : "./images/logo.png",
    };

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("products").style.visibility = "visible";

    displayDataAndSearch();

    clearFields();
  }
});

document.getElementById("deleteAll").addEventListener("click", function () {
  products = [];
  localStorage.removeItem("products");
  displayDataAndSearch();
  document.getElementById("products").style.visibility = "hidden";
});

document
  .getElementById("search")
  .addEventListener("input", displayDataAndSearch());

function clearFields() {
  prodName.value = null;
  prodPrice.value = null;
  prodCategory.value = null;
  prodDesc.value = null;
  prodImage.value = null;

  prodName.classList.remove("is-valid");
  prodPrice.classList.remove("is-valid");
  prodCategory.classList.remove("is-valid");
  prodDesc.classList.remove("is-valid");
}

function displayDataAndSearch() {
  var cartona = "";
  var searchValue = search.value.toLowerCase();

  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      cartona += `
            <tr>
              <td># ${i + 1}</td>
              <td>${products[i].name}</td>
              <td>${products[i].price} $</td>
              <td>${products[i].category}</td>
              <td>${products[i].description}</td>
              <td class="prodImage">
                <img src="${products[i].image}" alt="product" />
              </td>
              <td class="actions">
                <button class="edit" onclick="upFormAgain(${i})">Edit</button>
                <button class="delete" onclick="deleteProduct(${i})">Delete</button>
              </td>
            </tr>
        `;
    }
  }

  document.getElementById("productsList").innerHTML = cartona;
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayDataAndSearch();

  if (products.length == 0) {
    products = [];
    localStorage.removeItem("products");
    document.getElementById("products").style.visibility = "hidden";
  }
}

function upFormAgain(index) {
  prodName.value = products[index].name;
  prodPrice.value = products[index].price;
  prodCategory.value = products[index].category;
  prodDesc.value = products[index].description;

  addProduct.style.display = "none";
  updateProduct.style.display = "block";

  indexUpdate = index;
}

document
  .getElementById("updateProduct")
  .addEventListener("click", function (indexUpdate) {
    var product = {
      name: prodName.value,
      price: prodPrice.value,
      category: prodCategory.value,
      description: prodDesc.value,
      image: `./images/${prodImage.files[0]?.name}`,
    };

    products.splice(indexUpdate, 1, product);

    localStorage.setItem("products", JSON.stringify(products));

    displayDataAndSearch();

    clearFields();
  });

// validation
prodName.addEventListener("input", validateName);
function validateName() {
  var text = prodName.value;
  var regex = /^[A-Z][a-zA-Z ]{1,}[a-z]$/;
  var errorName = document.getElementById("errorName");

  if (regex.test(text)) {
    prodName.classList.add("is-valid");
    prodName.classList.remove("is-invalid");

    errorName.classList.add("notError");
    errorName.classList.remove("error");

    return true;
  } else {
    prodName.classList.add("is-invalid");
    prodName.classList.remove("is-valid");

    errorName.classList.add("error");
    errorName.classList.remove("notError");

    return false;
  }
}

prodPrice.addEventListener("input", validatePrice);
function validatePrice() {
  var price = prodPrice.value;
  var regex = /^\d{1,12}$/;
  var errorPrice = document.getElementById("errorPrice");

  if (regex.test(price)) {
    prodPrice.classList.add("is-valid");
    prodPrice.classList.remove("is-invalid");

    errorPrice.classList.add("notError");
    errorPrice.classList.remove("error");

    return true;
  } else {
    prodPrice.classList.add("is-invalid");
    prodPrice.classList.remove("is-valid");

    errorPrice.classList.add("error");
    errorPrice.classList.remove("notError");

    return false;
  }
}

prodCategory.addEventListener("input", validateCategory);
function validateCategory() {
  var category = prodCategory.value;
  var regex = /^(tv|mobile|screen|electonic)$/i;
  var errorCategory = document.getElementById("errorCategory");

  if (regex.test(category)) {
    prodCategory.classList.add("is-valid");
    prodCategory.classList.remove("is-invalid");

    errorCategory.classList.add("notError");
    errorCategory.classList.remove("error");

    return true;
  } else {
    prodCategory.classList.add("is-invalid");
    prodCategory.classList.remove("is-valid");

    errorCategory.classList.add("error");
    errorCategory.classList.remove("notError");

    return false;
  }
}

prodDesc.addEventListener("input", validateDesc);
function validateDesc() {
  var desc = prodDesc.value;
  var regex = /^.{3,}$/m;
  var errorDesc = document.getElementById("errorDesc");

  if (regex.test(desc)) {
    prodDesc.classList.add("is-valid");
    prodDesc.classList.remove("is-invalid");

    errorDesc.classList.add("notError");
    errorDesc.classList.remove("error");

    return true;
  } else {
    prodDesc.classList.add("is-invalid");
    prodDesc.classList.remove("is-valid");

    errorDesc.classList.add("error");
    errorDesc.classList.remove("notError");

    return false;
  }
}
