import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
};