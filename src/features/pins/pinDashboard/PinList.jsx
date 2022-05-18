import React, { useState, useEffect } from 'react';
import PinListItem from './PinListItem';
import { fetchPinsFromFirestore } from '../../../app/firebase/firestoreService';
import { auth, firestore } from '../../../app/firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { pinActions } from '../pinReducer';
import { onSnapshot, collection } from 'firebase/firestore';

function PinList() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.auth);
  const { pins } = useSelector((state) => state.pin);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPins() {
      try {
        setLoading(true);
        const pinArr = await fetchPinsFromFirestore();
        dispatch(pinActions.fetchPins(pinArr));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getPins();
  }, [dispatch]);

  console.log('pinsssss: ', pins);
  return (
    <>
      {!loading && pins?.map((pin) => <PinListItem key={pin.id} pin={pin} />)}
    </>
  );
}

export default PinList;
