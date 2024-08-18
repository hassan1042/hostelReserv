import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';

const CountUpSection = () => {
  const [triggered, setTriggered] = useState(false);
  const [counts, setCounts] = useState({
    students: 0,
    hostels: 0,
    bookings: 0,
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setTriggered(true);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const studentsCount = 1000;

      // Fetch number of hostels
      const hostelsSnapshot = await getDocs(collection(firestore, 'hostels'));
      const hostelsCount = hostelsSnapshot.size;

      // Fetch number of bookings
      const bookingsSnapshot = await getDocs(collection(firestore, 'bookings'));
      const bookingsCount = bookingsSnapshot.size;

      setCounts({
        students: studentsCount,
        hostels: hostelsCount,
        bookings: bookingsCount,
      });
    };

    fetchData();
  }, []);

  const stats = [
    { id: 1, end: counts.students, suffix: '+', title: 'Happy Students' },
    { id: 2, end: counts.hostels, suffix: '+', title: 'Hostels Available' },
    { id: 3, end: counts.bookings, suffix: '+', title: 'Bookings Every Day' },
  ];

  return (
    <section ref={ref} className="my-16 text-center bg-gray-100 py-12 px-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-4xl font-bold text-blue-600">
              {triggered && (
                <CountUp start={0} end={stat.end} suffix={stat.suffix} duration={2.5} />
              )}
            </h3>
            <p className="text-lg mt-2 text-gray-700">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountUpSection;
