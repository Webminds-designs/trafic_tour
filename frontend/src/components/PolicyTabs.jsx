import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import logoBlack from "../assets/logoBlack.png";
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 
import Navbar from "./Navbar";

const sections = ["Privacy Policy", "Return & Refund Policy", "Terms & Conditions"];

const PolicyTabs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const tabParam = query.get("tab");

    const [selectedSection, setSelectedSection] = useState(sections[0]);

    useEffect(() => {
        if (tabParam && sections.includes(tabParam)) {
            setSelectedSection(tabParam);
        }
    }, [tabParam]);

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        navigate(`/policies?tab=${encodeURIComponent(section)}`);
    };

    const formattedDate = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-30">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
                    <div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base m-1">
                            <span className="border-b-2">Our</span>
                        </h1>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-base m-1">Policies</h1>
                    </div>
                    <div className="text-xs sm:text-sm font-base">
                        Explore our terms, privacy practices, and return policies. <br />
                        At Traffictours, transparency and trust are the foundation <br />
                        of every unforgettable journey we offer.
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-col sm:flex-row bg-gray-100 rounded-lg overflow-hidden  mb-8">
                    {sections.map((section, index) => (
                        <button
                            key={index}
                            onClick={() => handleSectionClick(section)}
                            className={`flex-1 text-center py-3 px-4 text-sm sm:text-base font-medium transition-all duration-300 
              ${selectedSection === section
                                    ? "border-b-4 border-teal-600 text-black "
                                    : "text-gray-700 hover:bg-teal-100"}`}
                        >
                            {section}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className=" p-6 rounded-lg shadow border border-gray-200">
                    {selectedSection === "Privacy Policy" && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Effective Date:</strong> {formattedDate}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Traffic Tour Travels  is committed to safeguarding your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit our website <a href="https://srilankatraffictours.com/">srilankatraffictours.com</a> or engage with our services.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
                            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed">
                                <li><strong>Personal Identification Information:</strong> Name, passport details, nationality, date of birth, email address, postal address, phone number, and other contact information.</li>
                                <li><strong>Payment Information:</strong> Credit/debit card details, billing address, and other financial information necessary to process your payments.</li>
                                <li><strong>Travel Preferences and Requirements:</strong> Dietary requirements, accommodation preferences, and other special requests.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our website.</li>
                                <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">2. How We Use Your Information</h3>
                            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed">
                                <li><strong>To Provide Services:</strong> To process bookings, arrange accommodations, and provide you with the services you have requested.</li>
                                <li><strong>To Communicate With You:</strong> To send confirmations, invoices, updates, and respond to inquiries.</li>
                                <li><strong>For Marketing Purposes:</strong> To provide you with information about other services we offer that are similar to those you have already purchased or inquired about.</li>
                                <li><strong>To Improve Our Services:</strong> To administer our website and for internal operations, including troubleshooting, data analysis, testing, research, statistical, and survey purposes.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">3. Disclosure of Your Information</h3>
                            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed">
                                <li><strong>Service Providers:</strong> Third-party vendors, service providers, contractors, or agents who perform services on our behalf or assist us in providing our services to you.</li>
                                <li><strong>Legal Obligations:</strong> When required by law or if we believe that such action is necessary to comply with a legal obligation.</li>
                                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your personal data may be transferred to the acquiring entity.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">4. Data Security</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We have implemented appropriate technical and organizational measures to protect your personal data from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the security of your data transmitted to our website; any transmission is at your own risk.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">5. Your Rights</h3>
                            <p className="text-gray-700 leading-relaxed mb-2">You have the right to:</p>
                            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed">
                                <li><strong>Access Your Information:</strong> Request access to the personal data we hold about you.</li>
                                <li><strong>Correct Your Information:</strong> Request correction of the personal data that we hold about you.</li>
                                <li><strong>Erase Your Information:</strong> Request erasure of your personal data where there is no good reason for us continuing to process it.</li>
                                <li><strong>Object to Processing:</strong> Object to processing of your personal data where we are relying on a legitimate interest and there is something about your particular situation which makes you want to object to processing on this ground.</li>
                                <li><strong>Data Portability:</strong> Request the transfer of your personal data to another party.</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To exercise any of these rights, please contact us at traffictoures999@gmail.com.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">6. Third-Party Websites</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our website may contain links to third-party websites. We do not control and are not responsible for the privacy practices of such websites. We encourage you to read the privacy policies of each website you visit.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">7. Changes to This Privacy Policy</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time. Any changes we make will be posted on this page and, where appropriate, notified to you by email. Please check back frequently to see any updates or changes to our Privacy Policy.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">8. Contact Us</h3>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <ul className="list-none text-gray-700 leading-relaxed">
                                <li>Tarfic Tour Travels</li>
                                <li> 232/1/1, 2nd Floor, 'Laksiri Building', High Level Road,
                                    Waththegedara, Maharagama</li>
                                <li>Email:traffictoures999@gmail.com</li>
                                <li>Phone: +94 76 785 7066</li>
                            </ul>
                        </div>
                    )}


                    {selectedSection === "Return & Refund Policy" && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Return & Refund Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Effective Date:</strong> {formattedDate}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At Traffic Tour Travels, we understand that travel plans can change. This Return & Refund Policy outlines the conditions under which refunds are applicable, the procedures to follow when initiating a refund, and the timelines for processing those refunds.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">1. Booking Cancellations by Client</h3>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                If you need to cancel your booking, please notify us in writing as soon as possible. The following cancellation fees will apply:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
                                <li>More than 30 days before departure: <strong>100% refund</strong> of the tour cost.</li>
                                <li>15 to 30 days before departure: <strong>50% refund</strong> of the tour cost.</li>
                                <li>Less than 15 days before departure: <strong>No refund</strong>.</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Note:</strong> Certain services may be non-refundable, such as visa fees, airline tickets, or hotel bookings, depending on the supplier's policies.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">2. Booking Cancellations by Us</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right to cancel any tour due to unforeseen circumstances. In such cases, you will receive a full refund or the option to reschedule.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">3. Refund Process</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Approved refunds will be processed within 14 business days to the original payment method. Please note that bank processing times may vary.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">4. Non-Refundable Services</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Certain services, such as special promotions, discounted packages, or services provided by third-party suppliers, may be non-refundable. These will be clearly indicated at the time of booking.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">5. Contact Us</h3>
                            <p className="text-gray-700 leading-relaxed mb-2">
                                For return and refund inquiries, please contact:
                            </p>
                            <ul className="list-none text-gray-700 leading-relaxed">
                                <li>Tafic Tour Travels</li>
                                <li> 232/1/1, 2nd Floor, 'Laksiri Building', High Level Road,
                                    Waththegedara, Maharagama</li>
                                <li>Email:traffictoures999@gmail.com</li>
                                <li>Phone: +94 76 785 7066</li>
                            </ul>
                        </div>
                    )}


                    {selectedSection === "Terms & Conditions" && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Effective Date:</strong> {formattedDate}
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                These Terms and Conditions ("Terms") govern your use of the services provided by Tafic Tour Travels . By booking our services, you agree to comply with and be bound by these Terms. Please read them carefully.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">1. Booking and Payment</h3>
                            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
                                <li><strong>Booking Confirmation:</strong> A booking is confirmed only when we receive a deposit of 100% of the total tour cost. The balance is due 7 days before the commencement of the tour.</li>
                                <li><strong>Payment Methods:</strong> We accept payments via [insert accepted payment methods, e.g., bank transfer, credit card, etc.].</li>
                                <li><strong>Pricing:</strong> All prices are quoted in LKR/USD and are subject to change without prior notice. However, once a deposit is received, the price is guaranteed against any increase.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">2. Cancellations and Refunds</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Please refer to our <strong>Return & Refund Policy</strong> for detailed information on cancellations and refunds.
                            </p>

                            <h3 className="text-xl font-semibold mb-2">3. Travel Documents</h3>
                            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
                                <li><strong>Passports and Visas:</strong> It is your responsibility to ensure that you have valid travel documents, including passports and visas, if required.</li>
                                <li><strong>Health Requirements:</strong> You are responsible for meeting any health requirements, such as vaccinations, necessary for your travel.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">4. Travel Insurance</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We strongly recommend that you obtain comprehensive travel insurance to cover trip cancellations, medical expenses, personal accidents, and other unforeseen incidents.
                            </p>
                        </div>
                    )}

                </div>

            </div>
            <Footer />
        </div>
    );
};

export default PolicyTabs;
