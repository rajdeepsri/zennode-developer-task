function calculateDiscount(products) {
  let totalQuantity = 0;
  let productsTotal = 0;

  // Calculate total quantity and products total
  for (const product in products) {
    const quantity = products[product].quantity;
    const price = products[product].price;
    totalQuantity += quantity;
    productsTotal += quantity * price;
  }

  // Apply discounts
  let discountApplied = false;
  let discountAmount = 0;

  if (productsTotal > 200) {
    discountApplied = true;
    discountAmount = 10;
  } else if (totalQuantity > 20) {
    discountApplied = true;
    discountAmount = 10;
  } else if (totalQuantity > 30) {
    for (const product in products) {
      const quantity = products[product].quantity;
      if (quantity > 15) {
        discountApplied = true;
        discountAmount += (quantity - 15) * (products[product].price * 0.5);
      }
    }
  } else {
    for (const product in products) {
      const quantity = products[product].quantity;
      if (quantity > 10) {
        discountApplied = true;
        discountAmount += products[product].price * 0.05;
      }
    }
  }

  return { discountApplied, discountAmount };
}

function calculateTotal(cart, giftWrapFee, shippingFee) {
  let subtotal = 0;
  let totalQuantity = 0;

  for (const product in cart) {
    const quantity = cart[product].quantity;
    const price = cart[product].price;
    subtotal += quantity * price;
    totalQuantity += quantity;
  }

  const { discountApplied, discountAmount } = calculateDiscount(cart);

  if (discountApplied) {
    subtotal -= discountAmount;
  }

  const total = subtotal + giftWrapFee + shippingFee;

  return {
    subtotal,
    discountApplied,
    discountAmount,
    shippingFee,
    giftWrapFee,
    total,
  };
}

function main() {
  const cart = {
    ProductA: { price: 20, quantity: 0, giftWrap: 0 },
    ProductB: { price: 40, quantity: 0, giftWrap: 0 },
    ProductC: { price: 50, quantity: 0, giftWrap: 0 },
  };

  for (const product in cart) {
    const quantity = parseInt(prompt(`Enter quantity for ${product}:`));
    const isGiftWrap = confirm(`Is ${product} wrapped as a gift?`);
    cart[product].giftWrap = isGiftWrap ? 1 : 0;

    cart[product].quantity = quantity;
  }

  const giftWrapFee = Object.values(cart).reduce(
    (total, product) => total + product.quantity * product.giftWrap,
    0
  );
  const shippingFee =
    Math.ceil(
      Object.values(cart).reduce(
        (total, product) => total + product.quantity,
        0
      ) / 10
    ) * 5;

  const { subtotal, discountApplied, discountAmount, total } = calculateTotal(
    cart,
    null,
    giftWrapFee,
    shippingFee
  );

  // Display results
  console.log("Product Quantity Total");
  for (const product in cart) {
    const quantity = cart[product].quantity;
    const totalAmount = cart[product].price * quantity;
    console.log(`${product} ${quantity} $${totalAmount}`);
  }

  console.log("Subtotal: $" + subtotal);

  if (discountApplied) {
    console.log(`Discount Applied: -$${discountAmount}`);
  }

  console.log(`Shipping Fee: $${shippingFee}`);
  console.log(`Gift Wrap Fee: $${giftWrapFee}`);
  console.log(`Total: $${total}`);
}

// Run the program
main();
