import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useField } from 'formik';
import { firebaseStorage, auth } from '../firebase/firebase';
import { PIN_PHOTOS } from '../common/constants/storageConstants';

const useStorageForImage = (
  file,
  filename,
  fieldName = 'coverPhoto',
  directory = PIN_PHOTOS
) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [helpers, meta] = useField(fieldName);
  const { setValue } = helpers;

  useEffect(() => {
    const userUid = auth.currentUser.uid;
    const photoRef = ref(
      firebaseStorage,
      `${userUid}/${directory}/${filename}`
    );

    const uploadTask = uploadBytesResumable(photoRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          setImgURL(downloadURL);
        });
      }
    );
  }, [file]);

  return { progress, imgURL, error };
};

export default useStorageForImage;
