import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

const useImageReader = () => {
  const [file, setFile] = useState<any>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleImageChange = useCallback((e: any) => {
    try {
      e.preventDefault();
      const newFile = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = () => {
        setFile(newFile);
        setImagePreviewUrl(reader.result as string);
      };

      if (newFile) {
        reader.readAsDataURL(newFile);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  }, []);

  return { file, imagePreviewUrl, handleImageChange };
};

export default useImageReader;
