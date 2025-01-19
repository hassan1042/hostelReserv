import React, { useState } from "react";
import { addHostel, uploadFile } from "../../services/addHostel";
import LoginPage from "../common/auth/LoginPage";
import { useAuth } from "../../contexts/AuthContext";
import { serverTimestamp } from "firebase/firestore"; // Import this for adding the timestamp
import Modal from "../common/Modal";
import LoadingPage from "./HostelSubmissionLoading";
import { amenities } from "./AmenitiesData";
import SubmitHostel from "./SubmitHostel";
import Amenities from "./Amenities";
import TopSection from "./TopSection";
import MiddleSection from "./MiddleSection";
import BottomSection from "./BottomSection";

const RegisterHostel = () => {
  const { currentUser } = useAuth();
    const [hostel, setHostel] = useState({
    name: "",
    location: "",
    beds: "",
    bathroom: "attached",
    wifi: "available",
    mess: "available",
    ground: "available",
    canteen: "available",
    mosque: "available",
    description: "",
    images: [],
    video: null,
    contact: "",
    booking: "",
    instruction: "",
    price: "",
    roomNumber: 0,
    featured: false,
    payment: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For submission effect
  const [modalMessage, setModalMessage] = useState(""); // For popup messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostel({ ...hostel, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "video") {
      // Ensure only video files are selected
      if (files.length > 1 || !files[0].type.startsWith("video/")) {
        setError("Please upload only one video file.");
        return;
      }
    }

    setError("");
    setHostel({ ...hostel, [name]: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading effect

    // Check if all fields are filled
    if (
      !hostel.name ||
      !hostel.location ||
      !hostel.beds ||
      !hostel.bathroom ||
      !hostel.description ||
      hostel.images.length === 0 ||
      !hostel.contact ||
      !hostel.booking ||
      !hostel.instruction ||
      !hostel.canteen ||
      !hostel.ground ||
      !hostel.mess ||
      !hostel.mosque ||
      !hostel.price ||
      !hostel.roomNumber ||
      !hostel.payment
    ) {
      setError("All fields must be filled out.");
      setLoading(false); // Stop loading effect
      return;
    }

    try {
      const processedHostel = {
        ...hostel,
        name: hostel.name.toLowerCase(),
        location: hostel.location.toLowerCase(),
        description: hostel.description.toLowerCase(),
        instruction: hostel.instruction.toLowerCase(),
        booking: hostel.booking.toLowerCase(),
      };
      const imageUrls = await Promise.all(
        Array.from(hostel.images).map((file) => uploadFile(file, "images"))
      );
      const videoUrl = hostel.video
        ? await uploadFile(hostel.video[0], "videos")
        : null;

      const newHostel = {
        ...processedHostel,
        images: imageUrls,
        video: videoUrl,
        ownerId: currentUser.uid,
        addedDate: serverTimestamp(), // Add the current timestamp
      };

      const hostelId = await addHostel(newHostel);
      console.log("Hostel added with ID:", hostelId);
      setModalMessage("Hostel added successfully!");
      setError("");
      // Reset the hostel state
      setHostel({
        name: "",
        location: "",
        beds: 0,
        bathroom: 0,
        description: "",
        images: [],
        video: null,
        contact: "",
        booking: "",
        instruction: "",
        canteen: "unavailable",
        ground: "unavailable",
        mess: "unavailable",
        mosque: "unavailable",
        price: "",
        roomNumber: "",
      });
    } catch (error) {
      console.error("Failed to add hostel:", error);
      setModalMessage("Failed to add hostel. Please try again.");
    } finally {
      setLoading(false); // Stop loading effect
    }
  };

  if (!currentUser) {
    return <LoginPage />;
  }
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="dark:bg-cardDark py-10 ">
      <div className="container mx-auto   ">
        <h1 className="text-2xl font-bold mb-4 max-md:text-center  text-textDark dark:text-text">
          Register your Hostel
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/** Name Address RoomNumber*/}

          <TopSection hostel={hostel} handleChange={handleChange} />

          {/** Beds Description price */}
          <MiddleSection hostel={hostel} handleChange={handleChange} />
          {/** Img Vid Booking Instructions Contact Payment  */}

          <BottomSection
            hostel={hostel}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />

          <Amenities
            amenities={amenities}
            hostel={hostel}
            handleChange={handleChange}
          />

          <SubmitHostel loading={loading} />
        </form>

        {/* Modal Popup */}
        {modalMessage && (
          <Modal onClose={() => setModalMessage("")}>
            <p>{modalMessage}</p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default RegisterHostel;