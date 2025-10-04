import FormContact from "./form-contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-app-white text-app-gray">
      <section className="outer-wrapper">
        <div className="inner-wrapper">
          <div className="text-caption">CONTACT US</div>
          <div className="mt-8">
            <h2 className="w-full max-w-[430px] span-inner-red text-heading1">
              <div>
                <span>We're here to assist you.</span>
              </div>
              Connect with us for more information
            </h2>
          </div>
          <div className="mt-8 w-full h-px bg-app-gray" />
          <FormContact />
        </div>
      </section>
    </div>
  );
}
