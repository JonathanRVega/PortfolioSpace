import React from 'react';
import { Outlet } from 'react-router-dom';
import PlanetLink from './PlanetLink';

export default function PlanetsLayout() {
  return (
    <>
      <div className="content">
        <Outlet />
      </div>
      <div className="planets-nav">
        <PlanetLink to="Mercury">About</PlanetLink>
        <PlanetLink to="Venus">Experience</PlanetLink>
        <PlanetLink to="Earth">Education</PlanetLink>
        <PlanetLink to="Mars">Skills</PlanetLink>
        <PlanetLink to="Jupiter">About me</PlanetLink>
        <PlanetLink to="Saturn">Technologies</PlanetLink>
        <PlanetLink to="Uranus">Portfolio</PlanetLink>
        <PlanetLink to="Neptune">Current Projects</PlanetLink>
      </div>
    </>
  );
}
