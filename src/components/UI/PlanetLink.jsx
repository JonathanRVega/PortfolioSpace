import React, { useEffect, useRef } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function PlanetLink({ children, to, ...props }) {
  const ref = useRef();
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  useEffect(() => {
    if (match) {
      ref.current.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    }
  }, [match]);

  return (
    <Link
      ref={ref}
      to={to}
      className={
        match ? 'planets-nav_item planets-nav_item--active' : 'planets-nav_item'
      }
      {...props}
    >
      <span className="planets-nav_text">{children}</span>
    </Link>
  );
}
