var app = angular.module("myApp", ["firebase"]);

app.controller("myController", function ($scope, $firebaseArray) {
    // Referência ao nó que será usado no Firebase
    var ref = firebase.database().ref().child("products");
    $scope.products = $firebaseArray(ref);

    // Classe CSS dinâmica
    $scope.buttonLabel = "Add product";
    $scope.buttonClass = "btn btn-success";

    // Objeto com os campos necessários
    $scope.product_ = {
        name: "",
        category: "",
        price: 0,
        quantity: 0
    }
    
    // Variáveis de controle
    $scope.updating = false;
    $scope.productIsAdded = false;
    $scope.productIsRemoved = false;
    $scope.productIsUpdated = false;

    $scope.addProduct = function () {

        console.log("Name ", $scope.product_.name);
        console.log("Category ", $scope.product_.category);
        console.log("Price ", $scope.product_.price);
        console.log("Quantity ", $scope.product_.quantity);

        // Adicionar no Firebase
        $scope.products.$add({
            name: $scope.product_.name,
            category: $scope.product_.category,
            price: $scope.product_.price,
            quantity: $scope.product_.quantity
        });

        // Limpar Campos
        $scope.clearFields();

        // Mostrar a mensagem de sucesso
        $scope.productIsAdded = true;

        // Apagar a mensagem de sucesso após 1 segundo
        window.setTimeout(function () { $scope.productIsAdded = false; }, 1000);

    }

    $scope.removeProduct = function (product) {
        // Remover do Firebase
        $scope.products.$remove(product);

        $scope.productIsRemoved = true;
        // Apagar a mensagem de sucesso após 1 segundo
        window.setTimeout(function () { $scope.productIsRemoved = false; }, 1000);
    }

    $scope.editProduct = function (product) {
        $scope.updating = true;

        // Altera o CSS do botão
        $scope.buttonLabel = "Update product";
        $scope.buttonClass = "btn btn-primary";

        console.log(product);
        
        // Preenche o objeto local com os dados do produto a ser atualizado
        $scope.product_ = product;
    }

    $scope.updateProduct = function () {
        // Atualizar no Firebase
        $scope.products.$save($scope.product_);

        $scope.productIsUpdated = true;
        // Apagar a mensagem de sucesso após 1 segundo
        window.setTimeout(function () { $scope.productIsUpdated = false; }, 1000);
        // Limpar os campos
        $scope.cancelUpdate();
    }

    $scope.cancelUpdate = function () {
        $scope.updating = false;
        $scope.buttonLabel = "Add product";
        $scope.buttonClass = "btn btn-success";
        $scope.clearFields();
    }

    $scope.clearFields = function() {
        $scope.product_ = null;
    }

});