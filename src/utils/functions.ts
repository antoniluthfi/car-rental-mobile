export const slugify = (str: string) => {
  if (str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  return '';
};

export const idrFormatter = (price?: number) => {
  if (price) {
    const rupiah = price.toLocaleString('id-ID', {
      currency: 'IDR',
      style: 'currency',
      maximumSignificantDigits: 6,
    });
    const idr = rupiah.replace('Rp', 'IDR');
    const final = idr.replace(',00', ',-');
    return final;
  }

  return 'IDR 0';
};
