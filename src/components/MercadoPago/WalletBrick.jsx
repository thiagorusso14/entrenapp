import { useEffect } from 'react';
import api from '../../axios/axios';

const WalletBrick = ({ servicio }) => {
  useEffect(() => {
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
            items: [
              {
                id: servicio._id,
                title: servicio.name,
                description: `${servicio.category} con ${servicio.trainer.name}`,
                quantity: 1,
                unit_price: servicio.price,
              },
            ],
            purpose: 'wallet_purchase',
          };

          return new Promise((resolve, reject) => {
            api
              .post('/create_preference', body)
              .then((res) => resolve(res.data.preference_id))
              .catch(() => reject());
          });
        },
      },
    };

    await bricksBuilder.create('wallet', 'walletBrick_container', settings);
  };

  return <div id="walletBrick_container" />;
};

export default WalletBrick;
