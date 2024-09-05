import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../common/Card";

function LatestHostels() {
  const [latestHostels, setLatestHostels] = useState([]);
  useEffect(() => {
    const fetchLatestHostels = async () => {
      try {
        const hostelsQuery = query(
          collection(firestore, "hostels"),
          orderBy("addedDate", "desc"), // Sorting by addedDate field in descending order
          limit(5) // Limiting to 5 hostels
        );
        const querySnapshot = await getDocs(hostelsQuery);
        const fetchedHostels = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestHostels(fetchedHostels);
      } catch (error) {
        console.error("Error fetching latest hostels:", error);
      }
    };

    fetchLatestHostels();
  }, []);

  return (
    <section
      data-aos="fade-left"
      data-aos-duration="3000"
      className="my-10 container mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4  text-textDark dark:text-text">Latest Hostels</h2>

      <Card hostels={latestHostels} />
    </section>
  );
}

export default LatestHostels;
