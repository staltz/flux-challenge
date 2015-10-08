
(function (App) {

	App.dispatcher.on('Products:addToCart',function(product){
		if (!App.Cart.products.some(function (value) { 
				if (value.image() == product.image()) {
					value.quantityPlus();
					return true;
				}
			})) {
			App.Cart.products.add(product);
		}
	});

})(App);
