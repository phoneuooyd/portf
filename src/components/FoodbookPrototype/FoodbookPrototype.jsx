import React from 'react';

const FoodbookPrototype = () => {
  return (
    <section className="panel panel--xl">
      <div className="route-col">
        <div className="route-steps">
          <div className="route-step">
            <strong>Ścieżka 1</strong>
            <p>Opis ścieżki 1</p>
          </div>
          <div className="route-step" style={{display: 'none'}}>
            <strong>Ścieżka 2</strong>
            <p>Opis ścieżki 2</p>
          </div>
        </div>
        <div className="route-now" style={{ display: 'none' }}>
          <small>Aktualny route</small>
          <code>/example/route</code>
        </div>
      </div>
    </section>
  );
};

export default FoodbookPrototype;