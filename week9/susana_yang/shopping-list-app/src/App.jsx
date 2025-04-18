import { useState } from 'react';
import './App.css';
import ShoppingList from './ShoppingList';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [budget] = useState(100); // Set budget here

  const addItem = (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());
    formDataObj.cost = parseFloat(formDataObj.cost || 0);
    setShoppingList([...shoppingList, formDataObj]);
    form.reset();
  };

  const removeItem = (indexToRemove) => {
    setShoppingList(shoppingList.filter((_, index) => index !== indexToRemove));
  };

  const totalSpent = shoppingList.reduce((acc, item) => acc + Number(item.cost), 0);
  const remainingBudget = budget - totalSpent;

  return (
    <>
      <h1>Shopping List Manager</h1>
      <div className='card'>
        <form onSubmit={addItem} className='flex-apart'>
          <input type="text" name="name" placeholder='Add item to list...' required />
          <input type="number" name="cost" step="0.01" placeholder='Cost ($)' required />
          <button className='btn purple' type='submit'>Add</button>
        </form>
      </div>

      <ShoppingList
        shoppingList={shoppingList}
        removeItem={removeItem}
        remainingBudget={remainingBudget}
      />
    </>
  );
}

export default App;
