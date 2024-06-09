import "./ListSizeSelector.styles.css";

interface ListSizeSelectorProps {
  size: number;
  onSizeChange: (newSize: number) => void;
  label: string;
}

const ListSizeSelector: React.FC<ListSizeSelectorProps> = ({
  size,
  onSizeChange,
  label,
}) => {
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSizeChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="listSize">
      <p>Tabloda Gösterilecek {label} Sayısı</p>
      <select value={size} onChange={handleSizeChange}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default ListSizeSelector;
