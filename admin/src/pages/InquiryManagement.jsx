import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Send, Paperclip } from "lucide-react";
import md5 from "md5";


const InquiryManagement = () => {
    const [emails, setEmails] = useState([]);
    const [replyText, setReplyText] = useState("");
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [replies, setReplies] = useState({});
    const [replyMessage, setReplyMessage] = useState("");
    const [extractedInfo, setExtractedInfo] = useState({ firstName: '', lastName: '', email: '', message: '' });

    // Fetch all emails
    useEffect(() => {
        axios.get("http://localhost:6400/api/send-email/all")
            .then((res) => {
                setEmails(res.data);
                if (res.data.length > 0) {
                    setSelectedInquiry(res.data[0]); // Set first inquiry as default selected
                }
            })
            .catch((err) => console.error("Error fetching emails:", err));
    }, []);
    // Function to generate Gravatar URL based on email
    const getGravatarUrl = (email, size = 40) => {
        const emailHash = md5(email.trim().toLowerCase()); // Hash email to lowercase
        return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=identicon`; // Gravatar URL with optional size and default image
    };

    // Function to extract the information

    useEffect(() => {
        if (selectedInquiry && selectedInquiry.text) {
            const newText = selectedInquiry.text;
            extractInformation(newText);
        }
    }, [selectedInquiry]);


    const extractInformation = (newtext) => {
        const namePattern = /Name:\s+(\w+)\s+(\w+)/;
        const emailPattern = /Email:\s+([\w\.]+@[\w\.]+)/;
        const messagePattern = /Message:\s+(.*)/;

        const nameMatch = newtext.match(namePattern);
        const emailMatch = newtext.match(emailPattern);
        const messageMatch = newtext.match(messagePattern);

        if (nameMatch && emailMatch && messageMatch) {
            const firstName = nameMatch[1];
            const lastName = nameMatch[2];
            const email = emailMatch[1];
            const message = messageMatch[1];

            setExtractedInfo({ firstName, lastName, email, message });
        } else {
            console.log("Could not extract the information.");
        }
    };
    // Handle reply submission
    const handleReply = async (emailId) => {
        try {
            await axios.post("http://localhost:6400/api/send-email/reply", { emailId, replyText });
            alert("Reply sent successfully!");
            setReplyText("");
        } catch (error) {
            console.error("Failed to send reply:", error);
            alert("Failed to send reply.");
        }
    };
  
    console.log(selectedInquiry?.reply.text)
    return (
        <div className="flex h-full bg-gray-200 font-figtree">
            <Sidebar />
            <div className="flex-1 p-6">
                <Topbar title="Inquiry Management" />
                <div className="flex mt-8">
                    {/* Left Sidebar: Inquiry List */}
                    <div className="w-1/3 bg-white p-4 rounded-xl">
                        <h2 className="text-xl font-semibold text-black mb-4">Inquiries</h2>
                        {emails.map((inq) => (
                            <div
                                key={inq.id}
                                className={`flex items-center gap-4 p-3 mb-1 rounded-lg cursor-pointer hover:bg-gray-100 transition ${selectedInquiry?._id === inq._id ? "bg-gray-200" : ""
                                    }`}
                                onClick={() => setSelectedInquiry(inq)}
                            >
                                <img src={getGravatarUrl(inq.from)} alt={inq.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-medium text-gray-800">{inq.from}</p>
                                    <p className="text-sm text-gray-500">{inq.subject} </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Section: Inquiry Details */}
                    {selectedInquiry ? (
                        <div className="w-2/3 bg-white p-4 rounded-xl ml-4">
                            <h2 className="text-2xl font-semibold mb-6">{selectedInquiry.from}</h2>

                            <div className="space-y-5">
                                {/* First Name & Last Name */}
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium">First Name</label>
                                        <input
                                            type="text"
                                            value={extractedInfo.firstName}
                                            disabled
                                            className="w-full p-2 rounded-md bg-gray-100"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            value={extractedInfo.lastName}
                                            disabled
                                            className="w-full p-2 rounded-md bg-gray-100"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium">Email Address</label>
                                    <input
                                        type="text"
                                        value={selectedInquiry.from}
                                        disabled
                                        className="w-full p-2 rounded-md bg-gray-100"
                                    />
                                </div>

                                {/* Client Message */}
                                <div>
                                    <label className="block text-sm font-medium">Message</label>
                                    <textarea
                                        value={extractedInfo.message}
                                        disabled
                                        className="w-full p-2 rounded-md bg-gray-100"
                                    />
                                </div>
                                {/* Replies */}
                                <div>
                                    <label className="block text-sm font-medium">Replies</label>
                                    <div className="bg-gray-100 p-3 rounded-md space-y-2">
                                        {selectedInquiry?.reply.text ? (
                                            <div key={selectedInquiry.reply._id} className="rounded-md">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <p>{selectedInquiry.reply.text} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No replies yet.</p>
                                        )}
                                    </div>
                                </div>


                                {/* Reply Input */}
                                <div>
                                    <label className="block text-sm font-medium">Your Reply</label>
                                    <textarea
                                        placeholder="Type your reply here..."
                                        value={replyText} onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full p-3 focus:outline-none focus:ring-0 bg-gray-100"
                                        autoFocus
                                    />

                                    <div className="flex justify-end space-x-6 mt-3">
                                        

                                        {/* Send Button */}
                                        <button
                                            onClick={() => handleReply(selectedInquiry._id)}
                                            className="text-[#009990] px-1 py-2 rounded-md flex cursor-pointer items-center space-x-1"
                                        >
                                            <Send size={18} />
                                            <span>Send</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-black ml-4">Select an inquiry to view details.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InquiryManagement;