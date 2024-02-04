import './scss/App.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart } from './components/Cart/Cart';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { sneakersConnect } from './API/sneakersConnect';
import { AppContext } from './context';
import { useFetching } from './hooks/useFetching';

function App() {

  const [allSneakers, setAllSneakers] = useState([]);
  const [sneakers, setSneakers] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sneakersPagesCount, setSneakersPagesCount] = useState(0);
  const [sneakersPageLimit, setSneakersPageLimit] = useState(8);
  const [sneakersPage, setSneakersPage] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate()

  const [fetchSneakers, isSneakersLoading, sneakersError] = useFetching(async () => {
    const response = await sneakersConnect.getPage(sneakersPageLimit, sneakersPage)
    setSneakers(response)
  })
  const [fetchAll, isAllLoading, allError] = useFetching(async () => {
    const cartResponse = await sneakersConnect.getCart();
    const favoriteResponse = await sneakersConnect.getFavorites();
    const purchasesResponse = await sneakersConnect.getPurchases();
    const allSneakersResponse = await sneakersConnect.getAll();
    let sneakersTotalCount = allSneakersResponse.length;
    setSneakersPagesCount(Math.ceil(sneakersTotalCount / sneakersPageLimit))
    // setSneakersPagesCount(12)
    setCart(cartResponse)
    setFavorites(favoriteResponse)
    setPurchases(purchasesResponse)
    setAllSneakers(allSneakersResponse)
  })

  useEffect(() => {
    fetchSneakers()
  }, [sneakersPage])

  useEffect(() => {
    fetchAll()
  }, []);

  let isModalVisible = false;
  
  const contextValues = useMemo(() => {
    return { cart, favorites, purchases, sneakersError, isSneakersLoading, isAllLoading, allError }
  }, [cart, favorites, purchases, sneakersError, isSneakersLoading, isAllLoading, allError])


  const displayCart = useCallback(() => {
    const body = document.body;
    const cart = document.querySelector('.overlay');
    if (isModalVisible) {
      cart.style.opacity = 0;
      setTimeout(() => {
        cart.style.visibility = 'hidden'
        body.classList.remove('module-active')
      }, 150);
      isModalVisible = false
    }
    else {
      cart.style.visibility = 'visible'
      cart.style.opacity = 1;
      body.classList.add('module-active')
      isModalVisible = true
    }
  }, [])

  const searchedSneakers = useMemo(() => {
    let result = [...sneakers]
    setSneakersPagesCount(Math.ceil(allSneakers.length / sneakersPageLimit))

    if (searchValue) {
      let j = 0;
      result.length = 0;
      const searchedArray = allSneakers.filter((elem => elem.title.toLowerCase().includes(searchValue.toLowerCase())))
      setSneakersPagesCount(Math.ceil(searchedArray.length / sneakersPageLimit))
      searchedArray.forEach((el, i) => {
        if (i >= (sneakersPage * sneakersPageLimit) - sneakersPageLimit && i < sneakersPage * sneakersPageLimit) {
          result.length++;
          result[j] = el;
          j++;
        }
      })
    }

    return result;
  }, [searchValue, sneakers, sneakersPage])

  return (
    <AppContext.Provider value={contextValues}>
      <div className="App">
        <div className="container">
          <Header
            cart={cart}
            displayCart={displayCart}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
          <div className="wrapper">
            <Main
              sneakers={searchedSneakers}
              setFavorites={setFavorites}
              setCart={setCart}
              pagesCount={sneakersPagesCount}
              currPage={sneakersPage}
              setCurrPage={setSneakersPage}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              navigate={navigate}
            />
          </div>
        </div>
        <Cart
          displayCart={displayCart}
          setCart={setCart}
          totalPrice={totalPrice}
          setPurchases={setPurchases}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
