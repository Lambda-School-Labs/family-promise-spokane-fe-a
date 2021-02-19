import React, { useEffect } from 'react';
import RenderHomePage from './RenderHomePage';
import { setCurrentUser, getFamily } from '../../../state/actions/index';
import { useDispatch, useSelector } from 'react-redux';

function HomeContainer({ LoadingComponent }) {
  const dispatch = useDispatch();
  const LOGGED_IN = useSelector(state => state.LOGGED_IN);
  const LOADING = useSelector(state => state.LOADING);
  // eslint-disable-next-line

  useEffect(() => {
    if (!LOGGED_IN) {
      dispatch(setCurrentUser());
      dispatch(getFamily());
    }
  }, []);

  if (LOADING) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }
  return (
    <>
      <RenderHomePage />
    </>
  );
}

export default HomeContainer;
