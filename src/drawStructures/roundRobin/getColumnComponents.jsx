export function getColumnComponents() {
  const columnComponents = [
    {
      key: 'drawPosition',
      getHeader: () => ({ children: <></>, className: '' }),
      getValue: row => {
        return {
          children: <></>,
          className: '',
        };
      },
    },
  ];
  return { columnComponents };
}
