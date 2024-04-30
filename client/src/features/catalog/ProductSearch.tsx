import { TextField, debounce } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { setProductParams } from './catalogSlice';
import { useState } from 'react';
 

const ProductSearch = () => {

  const {productParams} = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch();

  const [searchterm, setSearchTerm] = useState(productParams.searchTerm);

  const debouncedSearch = debounce((event: any) =>{
    dispatch(setProductParams({searchTerm: event.target.value}))
  }, 1000)


  return (
    <TextField label="Search products" variant="outlined" fullWidth
    value = {searchterm || ''}
    onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
    } }
    />
  )
}

export default ProductSearch