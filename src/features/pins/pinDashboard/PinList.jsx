import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PinListItem from './PinListItem';
import { asyncActions } from '../../../app/async/asyncReducer';
import { fetchPinsFromFirestore } from '../../../app/firebase/firestoreService';
import { pinActions } from '../pinReducer';

function PinList() {
  const { loading } = useSelector((state) => state.async);
  const { pins } = useSelector((state) => state.pin);
  const dispatch = useDispatch();

  async function getPins() {
    dispatch(asyncActions.asyncActionStart());
    try {
      const pinArr = await fetchPinsFromFirestore();
      dispatch(pinActions.storePins(pinArr));
      dispatch(asyncActions.asyncActionFinish());
    } catch (error) {
      console.error(error);
      dispatch(asyncActions.asyncActionError());
    }
  }
  useEffect(() => {
    getPins();
  }, [dispatch]);

  return (
    <>
      {!loading && pins?.map((pin) => <PinListItem key={pin.id} pin={pin} />)}
    </>
  );
}

export default PinList;
