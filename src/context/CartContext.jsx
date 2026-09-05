import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY } from '../data/company';

const CartContext = createContext(null);

const STORAGE_KEY = 'hfm_quotation_tray_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Unable to persist quotation tray to localStorage', e);
    }
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.wood === item.wood && i.finish === item.finish
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity = (next[existingIndex].quantity || 1) + 1;
        return next;
      }
      return [
        ...prev,
        {
          ...item,
          quantity: item.quantity || 1,
          addedAt: Date.now(),
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const removeItem = (id, wood, finish) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.wood === wood && item.finish === finish)
      )
    );
  };

  const updateQuantity = (id, wood, finish, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.wood === wood && item.finish === finish) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const totalEstimatedPrice = items.reduce((sum, item) => {
    const rawPrice = typeof item.price === 'number' 
      ? item.price 
      : parseInt(String(item.price || '0').replace(/[^0-9]/g, ''), 10) || 0;
    return sum + rawPrice * (item.quantity || 1);
  }, 0);

  const generateWhatsAppMessage = () => {
    if (items.length === 0) {
      return `Hi Heaven Furniture Mart! I would like to inquire about your bespoke furniture collections.`;
    }

    const itemLines = items.map((item, index) => {
      const woodInfo = item.wood ? `\n   • Timber: ${item.wood}` : '';
      const finishInfo = item.finish ? `\n   • Finish: ${item.finish}` : '';
      const dimInfo = item.dimensions ? `\n   • Dimensions: ${item.dimensions}` : '';
      const priceInfo = item.priceDisplay || (item.price ? `৳${item.price.toLocaleString('en-IN')}` : 'Price on request');
      return `${index + 1}. *${item.title}* (Qty: ${item.quantity || 1})${woodInfo}${finishInfo}${dimInfo}\n   • Est: ${priceInfo}`;
    }).join('\n\n');

    const totalText = totalEstimatedPrice > 0 
      ? `\n\n*Estimated Total:* ৳${totalEstimatedPrice.toLocaleString('en-IN')}`
      : '';

    return [
      `🏛️ *Quotation & Consultation Request — Heaven Furniture Mart*`,
      `Flagship Atelier: Agrabad Access Road, Chattogram`,
      ``,
      `*Selected Pieces:*`,
      itemLines,
      totalText,
      ``,
      `I would like to verify timber availability, delivery timelines, and schedule an in-person showroom consultation.`,
    ].join('\n');
  };

  const getWhatsAppOrderUrl = () => {
    const msg = generateWhatsAppMessage();
    return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        toggleDrawer: () => setIsDrawerOpen((prev) => !prev),
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        totalEstimatedPrice,
        getWhatsAppOrderUrl,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    return {
      items: [],
      isDrawerOpen: false,
      openDrawer: () => {},
      closeDrawer: () => {},
      toggleDrawer: () => {},
      addItem: () => {},
      removeItem: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      itemCount: 0,
      totalEstimatedPrice: 0,
      getWhatsAppOrderUrl: () => '',
      generateWhatsAppMessage: () => '',
    };
  }
  return ctx;
}
