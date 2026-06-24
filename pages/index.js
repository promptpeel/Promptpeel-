import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error al crear el pago');
        setLoading(false);
      }
    } catch (e) {
      alert('Error de conexión');
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui', background: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '40px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>PromptPeel</h1>
      <p style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: '40px' }}>
        1000+ prompts premium para ChatGPT, Midjourney y más
      </p>
      
      <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '30px', maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>$20.000 COP</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '25px' }}>Pago único. Acceso de por vida.</p>
        <button 
          onClick={handleCheckout} 
          disabled={loading}
          style={{ 
            background: loading ? '#52525b' : '#2563eb', 
            color: 'white', 
            border: 'none', 
            padding: '15px 30px', 
            fontSize: '1.1rem', 
            borderRadius: '8px', 
            width: '100%', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600'
          }}
        >
          {loading ? 'Cargando...' : 'Comprar con Mercado Pago'}
        </button>
      </div>

      <p style={{ marginTop: '60px', color: '#71717a', fontSize: '0.9rem' }}>
        Entrega inmediata por email después del pago
      </p>
    </div>
  );
}
