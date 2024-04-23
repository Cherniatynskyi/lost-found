import { useFormikContext } from 'formik';

export default function ImageInput({ handleChange }) {
  const { setFieldValue } = useFormikContext();

  const handleChooseFile = async e => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue('avatar', file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        hidden
        onChange={handleChooseFile}
      />
    </>
  );
}