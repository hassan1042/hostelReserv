import React, { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from '@use-gesture/react';

const cards = [
  { title: 'Card 1', content: 'This is the first card.' },
  { title: 'Card 2', content: 'This is the second card.' },
  { title: 'Card 3', content: 'This is the third card.' },
  { title: 'Card 4', content: 'This is the fourth card.' },
];

const StackedCardSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize springs for each card
  const [springs, api] = useSprings(cards.length, i => ({
    x: 0,
    y: i * 10,
    scale: i === activeIndex ? 1.1 : 1,
    zIndex: cards.length - i,
    config: { mass: 5, tension: 500, friction: 80 },
  }));

  const bind = useGesture({
    onDrag: ({ args: [index], down, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (distance > 100 && !down) {
        // Move the top card to the bottom
        setActiveIndex(prevIndex => (prevIndex + 1) % cards.length);

        // Update springs for new card order
        api.start(i => ({
          x: 0,
          y: (i - (activeIndex + 1) % cards.length) * 10,
          scale: i === (activeIndex + 1) % cards.length ? 1.1 : 1,
          zIndex: cards.length - i,
        }));

        cancel();
      } else {
        // Update spring animation for dragging effect
        api.start(i => ({
          x: down && i === activeIndex ? mx : 0,
          scale: down && i === activeIndex ? 1.1 : 1,
        }));
      }
    },
  });

  const updateCardOrder = (newIndex) => {
    setActiveIndex(newIndex);
    api.start(i => ({
      x: 0,
      y: (i - newIndex) * 10,
      scale: i === newIndex ? 1.1 : 1,
      zIndex: cards.length - i,
    }));
  };

  const goToNextCard = () => {
    updateCardOrder((activeIndex + 1) % cards.length);
  };

  const goToPreviousCard = () => {
    updateCardOrder((activeIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-64 h-96 mx-auto mt-16">
      {springs.map((style, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          className="absolute w-full h-full bg-white shadow-lg rounded-xl flex flex-col justify-center items-center text-center"
          style={style}
        >
          <h2 className="text-2xl font-bold mb-4">{cards[i].title}</h2>
          <p>{cards[i].content}</p>
        </animated.div>
      ))}

      {/* Navigation Buttons */}
      <div className=" top-1/2 left-0 right-0 flex justify-between px-4">
        <button
          onClick={goToPreviousCard}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={goToNextCard}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StackedCardSlider;
