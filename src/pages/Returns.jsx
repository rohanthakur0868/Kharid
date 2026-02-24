import React from 'react';

const Returns = () => {
    return (
        <div className="container-custom py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8">Returns & Refunds</h1>

            <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                    We want you to be completely satisfied with your purchase. If you are not happy with your order, we accept returns within 30 days of purchase.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Eligibility for Returns</h3>
                <ul className="list-disc pl-5 space-y-2 mb-8">
                    <li>Your item must be unused and in the same condition that you received it.</li>
                    <li>It must be in the original packaging.</li>
                    <li>You need to have the receipt or proof of purchase.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Process</h3>
                <ol className="list-decimal pl-5 space-y-2 mb-8">
                    <li>Contact our support team at <a href="mailto:support@shopverse.com" className="text-primary hover:underline">support@shopverse.com</a> to initiate a return.</li>
                    <li>We will provide you with a return shipping label and instructions.</li>
                    <li>Pack the item securely and ship it back to us.</li>
                    <li>Once we receive your return, we will inspect it and notify you of the approval or rejection of your refund.</li>
                </ol>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Refunds</h3>
                <p className="mb-6">
                    If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5-10 business days.
                </p>
            </div>
        </div>
    );
};

export default Returns;
