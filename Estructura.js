// File: app.js (sin carrito)
(function(){
  angular.module('tiendaApp',[])
  .service('productService', ['$http','$q', function($http,$q){
    var service = {};
    service.getProducts = function(){
      return $http.get('data/products.json').then(function(res){
        return res.data;
      }).catch(function(){
        var local = [
          {id:1,name:'Producto A',category:'Embutidos',price:99.00,description:'Producto embutido de alta calidad. Ideal para tus recetas.',image:'/mnt/data/b9397ff9-4c58-49e4-a067-5030dcfd1327.png'},
          {id:2,name:'Producto B',category:'Embutidos',price:79.50,description:'Sabor tradicional, envase sellado.',image:'/mnt/data/b9397ff9-4c58-49e4-a067-5030dcfd1327.png'},
          {id:3,name:'Producto C',category:'Lácteos',price:49.99,description:'Lácteo fresco, empaquetado el mismo día.',image:'/mnt/data/b9397ff9-4c58-49e4-a067-5030dcfd1327.png'},
          {id:4,name:'Producto D',category:'Bebidas',price:19.99,description:'Bebida refrescante baja en azúcares.',image:'/mnt/data/b9397ff9-4c58-49e4-a067-5030dcfd1327.png'},
          {id:5,name:'Producto E',category:'Embutidos',price:129.00,description:'Pack premium con selección especial.',image:'/mnt/data/b9397ff9-4c58-49e4-a067-5030dcfd1327.png'},
          {id:6,name:'Producto F',category:'Lácteos',price:59.00,description:'Yogur cremoso con cultivos vivos.',image:'/mnt/data/b9397ff9-4c58-49e4-a067-5030dcfd1327.png'}
        ];
        return $q.resolve(local);
      });
    };
    return service;
  }])
  .controller('MainCtrl', ['productService',function(productService){
    var vm = this;
    vm.products = [];
    vm.categories = [];
    vm.selectedCategory = '';
    vm.searchText = '';
    vm.detail = null;

    vm.viewDetails = function(p){ vm.detail = p; };
    vm.closeDetail = function(){ vm.detail = null; };

    // filtro combinado
    vm.filterByCategoryAndText = function(item){
      var okCat = !vm.selectedCategory || item.category === vm.selectedCategory;
      var txt = (vm.searchText || '').toLowerCase().trim();
      var okTxt = !txt || (item.name + ' ' + item.description + ' ' + item.category).toLowerCase().indexOf(txt) !== -1;
      return okCat && okTxt;
    };

    // carga inicial productos
    productService.getProducts().then(function(list){
      vm.products = list || [];
      var map = {};
      vm.products.forEach(function(p){ if(p.category) map[p.category] = true; });
      vm.categories = Object.keys(map);
    });

  }]);
})();
