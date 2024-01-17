#include<bits/stdc++.h>
using namespace std;

int main() {
    map<string, pair<int, int>> cart;
    // Product prices
    map<string, int> prices = {{"ProductA", 20}, {"ProductB", 40}, {"ProductC", 50}};

    // Get quantity and gift wrap info for each product
    for (const auto& product : prices) {
        cout << "Enter quantity for " << product.first << ": ";
        int quantity;
        cin >> quantity;

        cout << "Is " << product.first << " wrapped as a gift? (yes/no): ";
        string giftWrap;
        cin >> giftWrap;

        cart[product.first] = {quantity, (giftWrap == "yes" ? 1 : 0)};
    }

    // Calculate gift wrap and shipping fee
    int giftWrapFee = accumulate(cart.begin(), cart.end(), 0,
                                [](int total, const auto& p) { return total + p.second.first * p.second.second; });

    int totalQuantity = accumulate(cart.begin(), cart.end(), 0,
                                   [](int total, const auto& p) { return total + p.second.first; });

    int shippingFee = (totalQuantity + 9) / 10 * 5;

    // Calculate subtotal, discount, and total
    int subtotal = accumulate(cart.begin(), cart.end(), 0,
                              [&prices](int total, const auto& p) { return total + p.second.first * prices[p.first]; });

    int discountAmount = 0;

    if (subtotal > 200) {
        discountAmount = 10;
    } else if (totalQuantity > 20) {
        discountAmount = 10;
    } else if (totalQuantity > 30) {
        for (const auto& p : cart) {
            if (p.second.first > 15) {
                discountAmount += (p.second.first - 15) * (prices[p.first] * 0.5);
            }
        }
    } else {
        for (const auto& p : cart) {
            if (p.second.first > 10) {
                discountAmount += prices[p.first] * 0.05;
            }
        }
    }

    int total = subtotal - discountAmount + giftWrapFee + shippingFee;

    // Display results
    cout << "Product Quantity Total" << endl;
    for (const auto& p : cart) {
        cout << p.first << " " << p.second.first << " $" << p.second.first * prices[p.first] << endl;
    }

    cout << "Subtotal: $" << subtotal << endl;

    if (discountAmount > 0) {
        cout << "Discount Applied: -$" << discountAmount << endl;
    }

    cout << "Shipping Fee: $" << shippingFee << endl;
    cout << "Gift Wrap Fee: $" << giftWrapFee << endl;
    cout << "Total: $" << total << endl;

    return 0;
}
