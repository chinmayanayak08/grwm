import React from 'react';

export default function Footer() {
  return (
    <footer style={{padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem'}}>
      <small>© {new Date().getFullYear()} Get Ready With Me</small>
    </footer>
  );
}
