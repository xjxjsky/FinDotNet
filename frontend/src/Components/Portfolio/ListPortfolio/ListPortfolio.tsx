import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';
import { PortfolioGet } from '../../../Models/Portfolio';

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({portfolioValues, onPortfolioDelete}: Props) => {
  return (
    <section id="portfolio">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My Portfolio
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {portfolioValues.length > 0 ? (
            portfolioValues.map((portfolioValue) => {
              return (
                <CardPortfolio
                  portfolioValue={portfolioValue}
                  onPortfolioDelete={onPortfolioDelete}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center w-full">
              Your portfolio is empty.
            </h3>
          )}
        </>
      </div>
    </section>
  );
};

export default ListPortfolio

/* if I use JSX to write this snippet of code without an interface declaration to in place of the above code
const ListPortfolio = ({ portfolioValues, onPortfolioDelete }) => {
  return (
    <>
      <h3>My Portfolio</h3>
      <ul>
        {portfolioValues && 
          portfolioValues.map((portfolioValue, index) => {
            return <CardPortfolio key={index} portfolioValue={portfolioValue} onPortfolioDelete={onPortfolioDelete} />
          })}
      </ul>
    </>
  );
};

*/