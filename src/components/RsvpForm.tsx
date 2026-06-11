import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';

const RsvpForm = () => {
  const [formData, setFormData] = useState({ phone: '', attendance: '' });
  const [errors, setErrors] = useState({ phone: '', attendance: '' });

  const applyPhoneMask = (value: string) => {
    const n = value.replace(/\D/g, '');
    if (n.length <= 2)  return `(${n}`;
    if (n.length <= 6)  return `(${n.slice(0,2)}) ${n.slice(2)}`;
    if (n.length <= 10) return `(${n.slice(0,2)}) ${n.slice(2,6)}-${n.slice(6)}`;
    return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7,11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const masked = name === 'phone' ? applyPhoneMask(value) : value;
    setFormData(prev => ({ ...prev, [name]: masked }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { phone: '', attendance: '' };
    let hasError = false;

    if (!formData.phone) {
      newErrors.phone = 'Por favor, informe seu telefone.';
      hasError = true;
    } else {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        newErrors.phone = 'Telefone inválido. Informe 10 ou 11 dígitos.';
        hasError = true;
      }
    }

    if (!formData.attendance) {
      newErrors.attendance = 'Por favor, selecione uma opção.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const message = `*Confirmar Presença*\n\n*Telefone:* ${formData.phone}\n*Presença:* ${formData.attendance}`;
    window.open(`https://wa.me/5513974069615?text=${encodeURIComponent(message)}`, '_blank');

    setFormData({ phone: '', attendance: '' });
    setErrors({ phone: '', attendance: '' });
    toast.success('Obrigado pela confirmação! Você será redirecionado para o WhatsApp.');
  };

  return (
    <div className='mx-auto max-w-2xl'>
      <div className='bg-white dark:bg-dark-bg backdrop-blur-sm p-10 rounded-2xl shadow-lg border border-wedding-gold/20'>
        <form onSubmit={handleSubmit} noValidate>

          <div className='mb-6'>
            <label htmlFor='phone' className='block text-sm font-semibold mb-2 text-gray-700 dark:text-white'>
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
              className={`w-full px-4 py-3 bg-white dark:bg-dark-bg border rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all duration-200 text-gray-700 dark:text-white ${
                errors.phone ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-wedding-rose/30'
              }`}
            />
            {errors.phone && (
              <p className='mt-1.5 text-sm text-red-500'>{errors.phone}</p>
            )}
          </div>

          <div className='mb-8'>
            <label htmlFor='attendance' className='block text-sm font-semibold mb-2 text-gray-700 dark:text-white'>
              Você poderá comparecer? <span className='text-red-500 ml-1'>*</span>
            </label>
            <select
              id='attendance'
              name='attendance'
              value={formData.attendance}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white dark:bg-dark-bg border rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-wedding-gold transition-all duration-200 text-gray-700 dark:text-white ${
                errors.attendance ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-wedding-rose/30'
              }`}
            >
              <option value=''>Selecione uma opção</option>
              <option value='Sim, estarei presente'>Sim, estarei presente</option>
              <option value='Não poderei comparecer'>Não poderei comparecer</option>
            </select>
            {errors.attendance && (
              <p className='mt-1.5 text-sm text-red-500'>{errors.attendance}</p>
            )}
          </div>

          <button
            type='submit'
            className='btn-shine-white w-full py-4 px-6 bg-gradient-to-r from-wedding-gold to-wedding-gold/90 text-white font-semibold rounded-full uppercase tracking-wide hover:shadow-xl transition-all duration-300 shadow-lg'
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
            }}
          >
            Confirmar Presença
          </button>
        </form>
      </div>
    </div>
  );
};

export default RsvpForm;
