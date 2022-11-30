
export const currencyFormat = (
    num?: number,
    prefix: string = 'Rp.',
    thousandSeparator: string = '.',
  ) => {
    if (num === undefined) {
      return '';
    }
    num = Math.round(num);
    return (
      num
        ? [
            prefix,
            num
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousandSeparator),
          ].filter(d => d)
        : [prefix, 0]
    ).join(' ');
  };