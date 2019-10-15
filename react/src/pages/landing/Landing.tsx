import React from 'react';
import { Link } from 'react-router-dom'
export default function LandingPage(props: any) {
  return (
    <>
      <h3> Welcome to Star Track</h3>
      <p>Star Track is a simple way to interact with Apple Music.</p>
      <Link to='browse'>Get Started</Link>
    </>
  );
}
