// context
import { useView } from '../../../context/ViewContext';

export const useIsRecycleBin = () => {
  const { view } = useView();

  const isRecycleBin = view.toString().includes('BIN');

  return { isRecycleBin };
};
