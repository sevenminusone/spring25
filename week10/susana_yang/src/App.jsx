import { useState } from 'react';
import './App.css';
import ShoppingList from './ShoppingList';
import Flow from './Flow';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [tab, setTab] = useState('list'); // list or flow
  const budget = 100;

  const addItem = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
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
      <div className="tabs">
        <button onClick={() => setTab('list')} className={tab === 'list' ? 'active' : ''}>Shopping List</button>
        <button onClick={() => setTab('flow')} className={tab === 'flow' ? 'active' : ''}>Flow</button>
      </div>

      {tab === 'list' && (
        <>
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
      )}

      {tab === 'flow' && <Flow />}
    </>
  );
}

export default App;
