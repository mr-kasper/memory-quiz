import { useContext } from 'react';
import TextContext from '../context/TextProvider';
import { UseTextContextType } from '../context/TextProvider';

export default function useTexts(): UseTextContextType {
  return useContext(TextContext);
}
