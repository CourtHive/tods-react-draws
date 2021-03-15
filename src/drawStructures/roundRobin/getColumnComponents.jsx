export function getColumnComponents() {
  const columnComponents = [
    {
      key: 'drawPosition',
      getHeader: () => ({ node: undefined, className: '' }),
      getValue: row => {
        return <></>;
      },
    },
  ];
  return { columnComponents };
}
