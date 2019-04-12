import React from 'react';
export default function LandingPage(props: any) {
  return (
    <>
      <h3> Welcome to Star Track</h3>
      <p>Star Track is a simple way to interact with Apple Music.</p>
      <button role="link" onClick={() => props.history.push('/browse')}>
        Get Started
      </button>
    </>
  );
}
