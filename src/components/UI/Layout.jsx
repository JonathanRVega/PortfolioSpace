import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useActivePlanet } from '../../hooks/useActivePlanet';
import { usePlanets } from '../../hooks/usePlanets';
import Scene from '../Scene';

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { planets } = usePlanets();
  const { activePlanet, setActivePlanet } =
    useActivePlanet();

  useEffect(() => {
    if (pathname.includes('planets') && pathname.match(/planets\/(.+)/)) {
      const planetName = pathname.match(/planets\/(.+)/)[1];
      const planet = planets.find((planet) => planet.name === planetName);
      setActivePlanet(planet);
    } else {
      setActivePlanet(null);
    }
  }, [pathname, planets]);

  useEffect(() => {
    if (activePlanet) {
      navigate(activePlanet.name);
    }
  }, [activePlanet]);

  return (
    <>
      <Scene />
      <main className="layout">
        <header className="app-navbar">
          <div className="container container_app-navbar">
            <div className="app-navbar_left">
              <Link to="/planets" className="app-navbar_logo">
              </Link>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
}
