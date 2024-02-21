import { useState } from 'react';

const DATA = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' }
];

function Product({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function Category({ category }) {
  return (
    <tr>
      <td colSpan="2">{category}</td>
    </tr>
  );
}

function Table({ marketList, justInStock, filterText }) {
  const rows = [];
  let lastCategory = null;
  marketList.forEach((product) => {
    if (justInStock && !product.stocked) {
      return;
    }
    if (product.name.toLowerCase().includes(filterText.toLowerCase())) {
      if (product.category !== lastCategory) {
        rows.push(
          <Category category={product.category} key={product.category} />
        );
      }
      rows.push(<Product product={product} key={product.name} />);
      lastCategory = product.category;
    }
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

function SearchBar({ onCheckChange, onSearchText }) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearchText(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          onChange={(e) => onCheckChange(e.target.checked)}
        />{' '}
        Only show product in stock
      </label>
    </form>
  );
}

export default function MarketList() {
  const [filterText, setFilterText] = useState('');
  const [justInStock, setJustInStock] = useState(false);

  return (
    <>
      <SearchBar onCheckChange={setJustInStock} onSearchText={setFilterText} />

      <Table
        marketList={DATA}
        justInStock={justInStock}
        filterText={filterText}
      />
    </>
  );
}
