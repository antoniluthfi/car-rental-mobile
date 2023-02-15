import moment from "moment";

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

export const passwordValidation = (p1: string, p2: string) =>
  p1 === p2 && /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(p1);

// format expected YYYY/MM/DD
export const dateFormatter = (date: string) => {
  if (date) {
    return moment(date.replace(/\//g, '-')).format('DD-MM-YY');
  }

  return '';
}