const initialData = {
  delivery_uu: 0,
  open_uu: 0,
  use_uu: 0,
  click_uu: 0,
  display_uu: 0,
  cv_uu: {
    custom: 0,
    final: 0,
    finalAmount: 0,
  },
};

type ReportTableData = {
  delivery_uu?: number;
  open_uu?: number;
  use_uu?: number;
  click_uu?: number;
  display_uu?: number;
  cv_uu?: number;
  cv_type?: 'custom' | 'final';
  cv_amount?: number;
};

const getTableDataGroupedByNotificationType = <
  T extends ReportTableData & { notification_type?: 'line' | 'mail' }
>(
  records: T[] = []
) => {
  return records.reduce(
    (acc, cur) => {
      const type = cur.notification_type;
      if (!type) return acc;

      return {
        ...acc,
        [type]: {
          delivery_uu: acc[type].delivery_uu + (cur.delivery_uu ?? 0),
          open_uu: acc[type].open_uu + (cur.open_uu ?? 0),
          use_uu: acc[type].use_uu + (cur.use_uu ?? 0),
          click_uu: acc[type].click_uu + (cur.click_uu ?? 0),
          display_uu: acc[type].display_uu + (cur.display_uu ?? 0),
          cv_uu: {
            custom:
              cur.cv_type === 'custom'
                ? acc[type].cv_uu.custom + (cur?.cv_uu ?? 0)
                : acc[type].cv_uu.custom,
            final:
              cur.cv_type === 'final'
                ? acc[type].cv_uu.final + (cur?.cv_uu ?? 0)
                : acc[type].cv_uu.final,
            finalAmount:
              cur.cv_type === 'final'
                ? acc[type].cv_uu.finalAmount + (cur?.cv_amount ?? 0)
                : acc[type].cv_uu.finalAmount,
          },
        },
      };
    },
    {
      line: initialData,
      mail: initialData,
    }
  );
};

const getTableData = <T extends ReportTableData>(records: T[] = []) => {
  return records.reduce((acc, cur) => {
    return {
      delivery_uu: acc.delivery_uu + (cur.delivery_uu ?? 0),
      open_uu: acc.open_uu + (cur.open_uu ?? 0),
      use_uu: acc.use_uu + (cur.use_uu ?? 0),
      click_uu: acc.click_uu + (cur.click_uu ?? 0),
      display_uu: acc.display_uu + (cur.display_uu ?? 0),
      cv_uu: {
        custom: cur.cv_type === 'custom' ? acc.cv_uu.custom + (cur?.cv_uu ?? 0) : acc.cv_uu.custom,
        final: cur.cv_type === 'final' ? acc.cv_uu.final + (cur?.cv_uu ?? 0) : acc.cv_uu.final,
        finalAmount:
          cur.cv_type === 'final'
            ? acc.cv_uu.finalAmount + (cur?.cv_amount ?? 0)
            : acc.cv_uu.finalAmount,
      },
    };
  }, initialData);
};

export const ReportUtils = { getTableData, getTableDataGroupedByNotificationType };
