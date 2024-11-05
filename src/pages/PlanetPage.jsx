import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActivePlanet } from '../hooks/useActivePlanet';

const BulletItem = ({ title, value }) => (
  <div className="bullets_item bullet">
    <div className="bullet_value">{value}</div>
    <div className="bullet_title">{title}</div>
  </div>
);

export default function PlanetPage() {
  const { planetId } = useParams();
  const [planet, setPlanet] = useState({});

  useEffect(() => {
    fetch('../data/textInfo.json')
      .then((response) => response.json())
      .then((data) => {
        setPlanet(data.find((planet) => planet.id === planetId));
      })
      .catch((e) => console.error(e));
  }, [planetId]);

  return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="container"
        >
          <div className="planet">
            <div className="planet_wrapper">
              <h1 className="planet_title">{planet.name}</h1>
              <div
                className="planet_description"
                dangerouslySetInnerHTML={{ __html: planet.description }}
              ></div>
              <div className="planet_bullets bullets">
                {planet.bullets &&
                  planet.bullets.map((bullet, index) => (
                    <BulletItem
                      key={index}
                      title={bullet.title}
                      value={bullet.value}
                    />
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
  );
}
