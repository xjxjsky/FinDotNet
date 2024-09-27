import axios from "axios"
import { CompanyBalanceSheet, CompanyCashFlow, CompanyCompData, CompanyIncomeStatement, 
        CompanyKeyMetrics, CompanyProfile, CompanySearch, 
        CompanyTenK} from "./company";

interface SearchResponse{
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) =>{
    try{
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
            
        );
        return data;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message);
            return error.message;
        }else{
            console.log("unexpected error: ", error);
            return "An expected error has occured."; 
        }
    }
};

export const getCompanyProfile = async (query: string) => {
    try{
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`
           

        )
        let log = `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${process.env.REACT_APP_API_KEY}`;
        console.log('getCompanyProfile:'+log);
        return data;
    }catch(error:any){
        console.log("error message from API: ", error.message);
    }
};

export const getKeyMetrics = async (query: string) => {
    try{
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
           

        )
        let log =  `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        console.log('getKeyMetrics:' + log);
        return data;
    }catch(error:any){
        console.log("error message from API: ", error.message);
    }
};

export const getIncomeStatement = async (query: string) => {
    try{
        console.log('getIncomeStatement: I am here!');
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
           

        )
        let log =  `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        console.log('getIncomeStatement:' + log);
        return data;
    }catch(error:any){
        console.log("error message from API: ", error.message);
    }
};

export const getBalanceSheet = async (query: string) => {
    try{
        console.log('getIncomeStatement: I am here!');
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
           

        )
        let log =  `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        console.log('getIncomeStatement:' + log);
        return data;
    }catch(error:any){
        console.log("error message from API: ", error.message);
    }
};

export const getCashFlowStatement = async (query: string) => {
    try{
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
           

        )
        let log =  `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
        console.log('getCashFlowStatement:' + log);
        return data;
    }catch(error:any){
        console.log("error message from API: ", error.message);
    }
};

export const getCompData = async (query: string) => {
    try {
      const data = await axios.get<CompanyCompData[]>(
        `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
      );
      let log =  `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
      console.log('getCompData:' + log);
      return data;
    } catch (error: any) {
      console.log("error message: ", error.message);
    }
  };

  export const getTenk = async (query: string) => {
    try {
      const data = await axios.get<CompanyTenK[]>(
        `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${process.env.REACT_APP_API_KEY}`
      );
      let log =  `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${process.env.REACT_APP_API_KEY}`
      console.log('getTenk:' + log);
      return data;
    } catch (error: any) {
      console.log("error message: ", error.message);
    }
  };

  /*Common api for business uses, actually it is a Service that should be put into Service project folder where has been located at ./Services*/