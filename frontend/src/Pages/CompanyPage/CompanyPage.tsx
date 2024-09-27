import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Siderbar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);

  const companyLinks = [
    { to: "company-profile", label: "Company Profile" },
    { to: "income-statement", label: "Income Statement" },
    { to: "balance-sheet", label: "Balance Sheet" },
    { to: "cashflow-statement", label: "Cashflow Statement" },
  ];

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <Sidebar links={companyLinks} title="Company Dashboard"/>
        <CompanyDashboard ticker={ticker!}>
          <Tile title="Company Name" subTitle={company.companyName}/>
          <Tile title="Price" subTitle={"$" + company.price.toString()}/>
          <Tile title="DCF" subTitle={"$" + company.dcf.toString()}/>
          <Tile title="Sector" subTitle={company.sector}/>
         
          <CompFinder ticker={company.symbol} />
          <TenKFinder ticker={company.symbol}/>
          <p className="bg-white shadow rounded text-medium text-gray-900 p-3 m-4">
            {company.description}
          </p>
        </CompanyDashboard>

        </div>
      ) : (
        <Spinner/>
      )}
    </>
  );
};

export default CompanyPage;
