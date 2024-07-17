import React, { useEffect } from 'react';
import './App.css';
import ExampleComponent from './components/example/ExampleComponent';
import { AppDispatch, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './store/states/user/userSlice';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserDetails());
    }
  }, [token, dispatch]);

  return (
    <ExampleComponent />
  );
}

export default App;
