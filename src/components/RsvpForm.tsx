import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';

const RsvpForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    attendance: '',
  });

  // Função para aplicar máscara de telefone
  const applyPhoneMask = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');

    // Aplica máscara baseada no número de dígitos
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      // Aplica máscara de telefone
      const maskedValue = applyPhoneMask(value);
      setFormData((prev) => ({ ...prev, [name]: maskedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmPresence();
  };

  const confirmPresence = () => {
    if (!formData.phone || !formData.attendance) {
      toast.error('Por favor, preencha telefone e confirmação de presença.');
      return;
    }

    // Valida telefone (deve ter 10 ou 11 dígitos)
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      toast.error('Por favor, insira um telefone válido (10 ou 11 dígitos).');
      return;
    }

    // Construct WhatsApp message
    const message = `*Confirmar Presença*\n\n*Telefone:* ${formData.phone}\n*Presença:* ${formData.attendance}`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5513991903515?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Reset form after sending to WhatsApp
    setFormData({
      phone: '',
      attendance: '',
    });

    toast.success(
      'Obrigado pela confirmação! Você será redirecionado para o WhatsApp.'
    );
  };

  return (
    <div className='mx-auto max-w-2xl'>
      <div className='bg-white dark:bg-dark-bg backdrop-blur-sm p-10 rounded-2xl shadow-lg border border-wedding-gold/20'>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label
              htmlFor='phone'
              className='block text-sm font-semibold mb-2 text-gray-700 dark:text-white'
            >
              Telefone <span className='text-red-500 ml-1'>*</span>
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='(11) 98765-4321'
              maxLength={15}
              className='w-full px-4 py-3 bg-white dark:bg-dark-bg border border-wedding-rose/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all duration-200 text-gray-700 dark:text-white'
              required
            />
          </div>

          <div className='mb-8'>
            <label
              htmlFor='attendance'
              className='block text-sm font-semibold mb-2 text-gray-700 dark:text-white'
            >
              Você poderá comparecer?{' '}
              <span className='text-red-500 ml-1'>*</span>
            </label>
            <select
              id='attendance'
              name='attendance'
              value={formData.attendance}
              onChange={handleChange}
              className='w-full px-4 py-3 bg-white dark:bg-dark-bg border border-wedding-rose/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all duration-200 text-gray-700 dark:text-white'
              required
            >
              <option value=''>Selecione uma opção</option>
              <option value='Sim, estarei presente'>
                Sim, estarei presente
              </option>
              <option value='Não poderei comparecer'>
                Não poderei comparecer
              </option>
            </select>
          </div>

          <button
            type='submit'
            className='w-full py-4 px-6 bg-gradient-to-r from-wedding-gold to-wedding-gold/90 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg'
          >
            Confirmar Presença
          </button>
        </form>
      </div>
    </div>
  );
};

export default RsvpForm;
