import { useEffect, useRef } from 'react';
import api from '../../axios/axios';

const WalletBrick = ({ servicio }) => {
  const containerRef = useRef(null);
  const initializedRef = useRef(false); // 👈 flag para evitar doble render

  useEffect(() => {
    if (initializedRef.current) return; // evitar doble inicialización
    initializedRef.current = true;

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = () => initializeWalletBrick();
    document.body.appendChild(script);

    return () => {
      window.walletBrickController?.destroy();
    };
  }, []);

  const initializeWalletBrick = async () => {
    if (!containerRef.current) return;
    try {
      const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
        locale: 'es-AR',
      });

      const bricksBuilder = mp.bricks();

      const settings = {
        initialization: {
          redirectMode: 'blank',
        },
        customization: {
          theme: 'dark',
          valueProp: 'security_safety',
          customStyle: {
            hideValueProp: false,
            valuePropColor: 'blue',
            buttonHeight: '48px',
            borderRadius: '6px',
            verticalPadding: '8px',
            horizontalPadding: '0px',
          },
          checkout: {
            theme: {
              elementsColor: '#4287F5',
              headerColor: '#4287F5',
            },
          },
        },
        callbacks: {
          onSubmit: (formData) => {
            const body = {
              title: `${servicio.name} - ${servicio.trainer.name}`,
              unit_price: servicio.price,
            };

            return new Promise((resolve, reject) => {
              api
                .post('/services/create-preference', body)
                .then((res) => resolve(res.data.preference_id))
                .catch((err) => {
                  console.error("Error creando preferencia:", err);
                  reject();
                });
            });
          },
        },
      };

      await bricksBuilder.create('wallet', 'walletBrick_container', settings);
    } catch (error) {
      console.error("Error inicializando el WalletBrick:", error);
    }
  };

  return <div ref={containerRef} id="walletBrick_container" />;
};

export default WalletBrick;
