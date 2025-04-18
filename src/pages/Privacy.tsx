
const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-heading font-semibold mb-4">Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (email, password)</li>
              <li>Recipe preferences and dietary restrictions</li>
              <li>Favorite recipes and search history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our recipe recommendation service</li>
              <li>To personalize your experience and content</li>
              <li>To communicate with you about your account or our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. Your data is stored securely using industry-standard encryption and security practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Update or correct your information</li>
              <li>Delete your account and associated data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:skand7x@gmail.com" className="text-pantry-green hover:underline">
                skand7x@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
