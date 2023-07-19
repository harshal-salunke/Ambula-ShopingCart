import React, { useState, useEffect } from "react";

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    var v = c === "x" ? r : r & 0x3;
    return v.toString(16);
  });
};

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addItem = (item) => {
    setItems([...items, item]);
    setTotalItems(totalItems + 1);
  };

  const removeItem = (item) => {
    setItems(items.filter((i) => i !== item));
    setTotalItems(totalItems - 1);
  };

  useEffect(() => {
    // This function will run once when the component mounts
    // and whenever the `items` prop changes
    setTotalItems(items.length);
  }, [items]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <AddItems items={items} addItem={addItem} />
      <RemoveItems items={items} removeItem={removeItem} />
      <TotalItems items={items} totalItems={totalItems} />
    </div>
  );
};

const AddItems = ({ items, addItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    addItem({ name: inputValue });
    setInputValue("");
  };

  return (
    <div>
      <h2>Add Items</h2>
      <input
        type="text"
        placeholder="Item name"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

const RemoveItems = ({ items, removeItem }) => {
  return (
    <div>
      <h2>Remove Items</h2>
      <ul>
        {items.map((item) => (
          <li key={uuid()}>
            {item.name}
            <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TotalItems = ({ items, totalItems }) => {
  return (
    <div>
      <h2>Total Items</h2>
      <p>{totalItems}</p>
    </div>
  );
};

export default ShoppingCart;
