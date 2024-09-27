import React, { useEffect, useState } from 'react'
import { CompanyTenK } from '../../company';
import { getTenk } from '../../api';
import TenKFinderItem from './TenKFinderItem/TenKFinderItem';
import Spinner from '../Spinner/Spinner';

type Props = {
    ticker: string;
}

const TenKFinder = ({ticker}: Props) => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>();
    useEffect(() =>{
        const getTenKDate = async ()=> {
            const value = await getTenk(ticker);
            setCompanyData(value?.data);
        };
        getTenKDate();
    },[ticker]);
  return (
    <div className="inline-flex rounded-md shadow-sm m-4">
        {companyData?(
            companyData?.slice(0,5).map((tenK)=>{
                return <TenKFinderItem tenK={tenK}/>
            })
        ) 
        : (<Spinner/>)}
    </div>
  )
}

export default TenKFinder