import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Send, Paperclip } from "lucide-react";

const inquiries = [
    { id: 1, name: "Pete Deemer", message: "Need help booking!", avatar: "", email: "pete@gmail.com" },
    { id: 2, name: "LeeAnn Deemer", message: "Need help booking!", avatar: "", email: "leeanndeemer@gmail.com" },
    { id: 3, name: "Shanika Weerasinghe", message: "Need help booking!", avatar: "", email: "shanika@gmail.com" },
];

const InquiryManagement = () => {
    const [selectedInquiry, setSelectedInquiry] = useState(inquiries.length > 0 ? inquiries[0] : null);
    const [replies, setReplies] = useState({});
    const [replyMessage, setReplyMessage] = useState("");

    const handleSendMessage = () => {
        if (!replyMessage.trim()) return; // Prevent empty messages

        setReplies((prev) => ({
            ...prev,
            [selectedInquiry.id]: [...(prev[selectedInquiry.id] || []), replyMessage],
        }));

        setReplyMessage(""); // Clear input
    };

    const handleAttachFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("File attached:", file.name);
        }
    };

    const [isEditing, setIsEditing] = useState(null);
    const [editedReply, setEditedReply] = useState("");

    const handleEdit = (index, reply) => {
        setIsEditing(index); // Set the current index to be in editing mode
        setEditedReply(reply); // Set the current reply to the input field
    };

    const handleSaveEdit = (index) => {
        const updatedReplies = [...replies[selectedInquiry.id]];
        updatedReplies[index] = editedReply;
        setReplies((prev) => ({
            ...prev,
            [selectedInquiry.id]: updatedReplies,
        }));
        setIsEditing(null); // Exit the editing mode
    };


    return (
        <div className="flex h-full bg-gray-200 font-figtree">
            <Sidebar />
            <div className="flex-1 p-6">
                <Topbar title="Inquiry Management" />
                <div className="flex mt-8">
                    {/* Left Sidebar: Inquiry List */}
                    <div className="w-1/3 bg-white p-4 rounded-xl">
                        <h2 className="text-xl font-semibold text-black mb-4">Inquiries</h2>
                        {inquiries.map((inq) => (
                            <div
                                key={inq.id}
                                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition ${selectedInquiry?.id === inq.id ? "bg-gray-200" : ""
                                    }`}
                                onClick={() => setSelectedInquiry(inq)}
                            >
                                <img src={inq.avatar} alt={inq.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-medium text-gray-800">{inq.name}</p>
                                    <p className="text-sm text-gray-500">{inq.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Section: Inquiry Details */}
                    {selectedInquiry ? (
                        <div className="w-2/3 bg-white p-4 rounded-xl ml-4">
                            <h2 className="text-2xl font-semibold mb-6">{selectedInquiry.name}</h2>

                            <div className="space-y-5">
                                {/* First Name & Last Name */}
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium">First Name</label>
                                        <input
                                            type="text"
                                            value={selectedInquiry.name.split(" ")[0] || ""}
                                            disabled
                                            className="w-full p-2 rounded-md bg-gray-100"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            value={selectedInquiry.name.includes(" ") ? selectedInquiry.name.split(" ")[1] : ""}
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
                                        value={selectedInquiry.email}
                                        disabled
                                        className="w-full p-2 rounded-md bg-gray-100"
                                    />
                                </div>

                                {/* Client Message */}
                                <div>
                                    <label className="block text-sm font-medium">Message</label>
                                    <textarea
                                        value={selectedInquiry.message}
                                        disabled
                                        className="w-full p-2 rounded-md bg-gray-100"
                                    />
                                </div>



                                {/* Replies */}
                                <div>
                                    <label className="block text-sm font-medium">Replies</label>
                                    <div className="bg-gray-100 p-3 rounded-md space-y-2">
                                        {replies[selectedInquiry.id]?.length > 0 ? (
                                            replies[selectedInquiry.id].map((reply, index) => (
                                                <div key={index} className="rounded-md">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex-1">
                                                            {isEditing === index ? (
                                                                <input
                                                                    type="text"
                                                                    value={editedReply}
                                                                    onChange={(e) => setEditedReply(e.target.value)}
                                                                    onBlur={() => handleSaveEdit(index)}
                                                                    className="w-full bg-transparent p-1 focus:outline-none focus:ring-0"
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                <p>{reply}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end space-x-6 mt-2">
                                                        <button
                                                            className="text-[#009990] text-sm cursor-pointer"
                                                            onClick={() => handleEdit(index, reply)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="text-black text-sm cursor-pointer"
                                                            onClick={() => {
                                                                const updatedReplies = replies[selectedInquiry.id].filter((_, i) => i !== index);
                                                                setReplies((prev) => ({ ...prev, [selectedInquiry.id]: updatedReplies }));
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
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
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                        className="w-full p-3 focus:outline-none focus:ring-0 bg-gray-100"
                                        autoFocus
                                    />

                                    <div className="flex justify-end space-x-6 mt-3">
                                        {/* Attach Button */}
                                        <label className="cursor-pointer p-2 rounded-md flex items-center space-x-1">
                                            <Paperclip size={18} />
                                            <span>Attach</span>
                                            <input type="file" className="hidden" onChange={handleAttachFile} />
                                        </label>

                                        {/* Send Button */}
                                        <button
                                            onClick={handleSendMessage}
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