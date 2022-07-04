import { useEffect, useState } from 'react';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { firebaseStorage, auth } from '../firebase/firebase';
import { getFileExtension } from '../common/util/functions';

const useStorageForBlob = (file, filename) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    const userUid = auth.currentUser.uid;
    const photoRef = ref(firebaseStorage, `${userUid}/pin_photos/${filename}`);

    // uploadBytes(photoRef, file).then((snapshot) => {
    //   console.log('uploaded blob file');
    //   console.log('snapshot: ', snapshot);
    // });
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
          console.log('File available at', downloadURL);
          setImgURL(downloadURL);
        });
      }
    );
  }, [file]);

  return { progress, imgURL, error };
};

export default useStorageForBlob;
