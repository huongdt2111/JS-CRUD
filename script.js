// Validate form input before submiting data
function validateForm(){
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var detail = document.getElementById("detail").value;
    var color = document.getElementById("color").value;
    var material = document.getElementById("material").value;

    if(id == ""){
        alert("ID is required");
        return false;
    }

    if(name == "") {
        alert("Name is required");
        return false;
    }

    if(price == ""){
        alert("Price is required");
        return false;
    }
    else if(price < 1){
        alert("Price must not be zero or less than zero");
        return false
    }

    if(detail == ""){
        alert("Detail is required");
        return false;
    }

    if(color == ""){
        alert("Color is required");
        return false;
    }

    if(material == ""){
        alert("Material is required");
        return false;
    }

    return true;
}

// function to show data
function showData(){
    var productList;
    if(localStorage.getItem("productList") == null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    var html = "";

    productList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + element.id +"</td>";
        html += "<td>" + element.name +"</td>";
        html += "<td>" + element.price +"</td>";
        html += "<td>" + element.detail +"</td>";
        html += "<td>" + element.color +"</td>";
        html += "<td>" + element.material +"</td>";
        html += 
            '<td><button onclick="updateData(' + 
            index + 
            ')" class="btn btn-warning">Edit</button><button onclick="deleteData(' + 
            index + 
            ')" class="btn btn-danger m-2">Delete</button><td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// loads all data from local storage when document or page loaded
document.onload = showData();

// funcion to add data
function AddData(){
    // if form is validate
    if(validateForm() == true){
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var price = document.getElementById("price").value;
        var detail = document.getElementById("detail").value;
        var color = document.getElementById("color").value;
        var material = document.getElementById("material").value;

        var productList;
        if(localStorage.getItem("productList") == null){
            productList = [];
        }
        else{
            productList = JSON.parse(localStorage.getItem("productList"));
        }

        productList.push({
            id: id,
            name: name,
            price: price,
            detail: detail,
            color: color,
            material: material,
        });

        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("detail").value = "";
        document.getElementById("color").value = "";
        document.getElementById("material").value = "";
    }
}

// function to delete data from local storage
function deleteData(index){
    var productList;
    if(localStorage.getItem("productList") == null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    if (confirm('Are you sure to delete this data?')) {
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    showData();
    }
}


// function to update/edit
function updateData(index){
    // submit button will hide and update button will show for updating of data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var productList;
    if(localStorage.getItem("productList") == null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    document.getElementById("id").value = productList[index].id;
    document.getElementById("name").value = productList[index].name;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("detail").value = productList[index].detail;
    document.getElementById("color").value = productList[index].color;
    document.getElementById("material").value = productList[index].material;

    document.querySelector("#Update").onclick = function(){
        if(validateForm() == true){
            productList[index].id = document.getElementById("id").value;
            productList[index].name = document.getElementById("name").value;
            productList[index].price = document.getElementById("price").value;
            productList[index].detail = document.getElementById("detail").value;
            productList[index].color = document.getElementById("color").value;
            productList[index].material = document.getElementById("material").value;

            localStorage.setItem("productList", JSON.stringify(productList));
            showData();

            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("detail").value = "";
            document.getElementById("color").value = "";
            document.getElementById("material").value = "";

            // update button will hide and submit button will show 
        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";
        }
    }
}
