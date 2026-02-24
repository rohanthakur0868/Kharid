import React from 'react';

const Shipping = () => {
    return (
        <div className="container-custom py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>

            <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                    At ShopVerse, we strive to deliver your orders as quickly and safely as possible. We work with trusted logistics partners to ensure your products reach you on time.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Shipping Rates & Estimates</h3>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                    <li><strong>Standard Shipping (3-5 business days):</strong> Free for orders over $50, otherwise $5.99.</li>
                    <li><strong>Express Shipping (1-2 business days):</strong> $12.99 per order.</li>
                    <li><strong>International Shipping:</strong> Calculated at checkout based on destination.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Order Processing</h3>
                <p className="mb-6">
                    Orders are processed within 24 hours of payment confirmation. Orders placed on weekends or holidays will be processed on the next business day.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Tracking Your Order</h3>
                <p className="mb-6">
                    You will receive a shipment confirmation email containing your tracking number(s) once your order has shipped. The tracking number will be active within 24 hours.
                </p>
            </div>
        </div>
    );
};

export default Shipping;
