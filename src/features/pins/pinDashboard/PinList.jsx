import React, { useState, useEffect } from 'react';
import PinListItem from './PinListItem';
import { fetchPinsFromFirestore } from '../../../app/firebase/firestoreService';
import { auth, firestore } from '../../../app/firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { pinActions } from '../pinReducer';
import { onSnapshot, collection } from 'firebase/firestore';
import { asyncActions } from '../../../app/async/asyncReducer';

function PinList() {
  const { loading } = useSelector((state) => state.async);
  const { pins } = useSelector((state) => state.pin);
  const dispatch = useDispatch();

  async function getPins() {
    dispatch(asyncActions.asyncActionStart());
    try {
      const pinArr = await fetchPinsFromFirestore();
      dispatch(pinActions.fetchPins(pinArr));
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
