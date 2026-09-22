export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-gray-600">
          Please read these terms carefully before using our services.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-indigo-600">
            1. Membership
          </h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            By signing up for a membership, you agree to abide by all gym rules
            and regulations. Memberships are non-transferable and must be used
            only by the registered member.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-indigo-600">2. Payments</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            All payments must be made in advance through approved methods.
            Refunds are only provided under exceptional circumstances as
            determined by management.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-indigo-600">
            3. Health & Safety
          </h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Members are responsible for ensuring they are medically fit to
            exercise. The gym is not liable for injuries sustained due to
            negligence or misuse of equipment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-indigo-600">
            4. Code of Conduct
          </h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Respect fellow members and staff. Harassment, abuse, or misuse of
            facilities will result in immediate termination of membership.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-indigo-600">
            5. Changes to Terms
          </h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            We reserve the right to update these terms at any time. Members will
            be notified of significant changes via email or app notifications.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        Last updated: September 2026
      </div>
    </div>
  );
}
