import React from 'react';

const FAQItem = ({ question, answer }) => (
    <details className="group bg-white rounded-xl border border-gray-100 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-gray-900 group-hover:bg-gray-50/50 transition-colors">
            <h2 className="font-bold text-lg">{question}</h2>
            <span className="relative size-5 shrink-0">
                <svg
                    className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </span>
        </summary>
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
            {answer}
        </div>
    </details>
);

const FAQ = () => {
    const faqs = [
        {
            q: "How long does shipping take?",
            a: "Standard shipping typically takes 3-5 business days depending on your location. Express shipping orders arrive within 1-2 business days."
        },
        {
            q: "What is your return policy?",
            a: "We offer a 30-day return policy for unmatched items. The product must be unused and in its original packaging. See our Returns page for more details."
        },
        {
            q: "Do you ship internationally?",
            a: "Yes, we currently ship to over 50 countries worldwide. Shipping costs will be calculated at checkout based on your delivery address."
        },
        {
            q: "How can I track my order?",
            a: "Once your order ships, you will receive a confirmation email with a tracking number. You can use this number on our website to track your shipment."
        },
        {
            q: "Are my payment details secure?",
            a: "Absolutely. We use industry-standard encryption and secure payment gateways (Stripe, PayPal) to ensure your data is perfectly safe."
        }
    ];

    return (
        <div className="container-custom py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-center mb-12">Quick answers to common questions about our products and services.</p>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
            </div>
        </div>
    );
};

export default FAQ;
