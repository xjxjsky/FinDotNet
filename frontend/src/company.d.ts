export interface CompanySearch {
    currency: string;
    exchangeShortName: string;
    name: string;
    stockExchange: string;
    symbol: string;
  }
  
  export interface CompanyProfile {
    symbol: string;
    price: number;
    beta: number;
    volAvg: number;
    mktCap: number;
    lastDiv: number;
    range: string;
    changes: number;
    companyName: string;
    currency: string;
    cik: string;
    isin: string;
    exchange: string;
    exchangeShortName: string;
    industry: string;
    website: string;
    description: string;
    ceo: string;
    sector: string;
    counter: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dcfDiff: number;
    dcf: number;
    image: string;
    ipoDate: string;
    defaultImage: boolean;
    isEtf: boolean;
    isActivelyTrading: boolean;
    isAdr: boolean;
    isFund: boolean;
  }
  
  export interface CompanyKeyRatios {
    dividendYielTTM: number;
    dividendYielPercentageTTM: number;
    peRatioTTM: number;
    pegRatioTTM: number;
    payoutRatioTTM: number;
    currentRatioTTM: number;
    quickRatioTTM: number;
    cashRatioTTM: number;
    daysOfSalesOutstandingTTM: number;
    daysOfInventoryOutstandingTTM: number;
    operatingCycleTTM: number;
    daysOfPayablesOutstandingTTM: number;
    cashConversionCycleTTM: number;
    grossProfitMarginTTM: number;
    operatingProfitMarginTTM: number;
    pretaxProfitMarginTTM: number;
    netProfitMarginTTM: number;
    effectiveTaxRateTTM: number;
    returnOnAssetsTTM: number;
    returnOnEquityTTM: number;
    returnOnCapitalEmployedTTM: number;
    netIncomePerEBTTTM: number;
    ebtPerEbitTTM: number;
    ebitPerRevenueTTM: number;
    debtRatioTTM: number;
    debtEquityRatioTTM: number;
    longTermDebtToCapitalizationTTM: number;
    totalDebtToCapitalizationTTM: number;
    interestCoverageTTM: number;
    cashFlowToDebtRatioTTM: number;
    companyEquityMultiplierTTM: number;
    receivablesTurnoverTTM: number;
    payablesTurnoverTTM: number;
    inventoryTurnoverTTM: number;
    fixedAssetTurnoverTTM: number;
    assetTurnoverTTM: number;
    operatingCashFlowPerShareTTM: number;
    freeCashFlowPerShareTTM: number;
    cashPerShareTTM: number;
    operatingCashFlowSalesRatioTTM: number;
    freeCashFlowOperatingCashFlowRatioTTM: number;
    cashFlowCoverageRatiosTTM: number;
    shortTermCoverageRatiosTTM: number;
    capitalExpenditureCoverageRatioTTM: number;
    dividendPaidAndCapexCoverageRatioTTM: number;
    priceBookValueRatioTTM: number;
    priceToBookRatioTTM: number;
    priceToSalesRatioTTM: number;
    priceEarningsRatioTTM: number;
    priceToFreeCashFlowsRatioTTM: number;
    priceToOperatingCashFlowsRatioTTM: number;
    priceCashFlowRatioTTM: number;
    priceEarningsToGrowthRatioTTM: number;
    priceSalesRatioTTM: number;
    dividendYieldTTM: number;
    enterpriseValueMultipleTTM: number;
    priceFairValueTTM: number;
    dividendPerShareTTM: number;
  }
  
  export interface CompanyIncomeStatement {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    revenue: number;
    costOfRevenue: number;
    grossProfit: number;
    grossProfitRatio: number;
    researchAndDevelopmentExpenses: number;
    generalAndAdministrativeExpenses: number;
    sellingAndMarketingExpenses: number;
    sellingGeneralAndAdministrativeExpenses: number;
    otherExpenses: number;
    operatingExpenses: number;
    costAndExpenses: number;
    interestIncome: number;
    interestExpense: number;
    depreciationAndAmortization: number;
    ebitda: number;
    ebitdaratio: number;
    operatingIncome: number;
    operatingIncomeRatio: number;
    totalOtherIncomeExpensesNet: number;
    incomeBeforeTax: number;
    incomeBeforeTaxRatio: number;
    incomeTaxExpense: number;
    netIncome: number;
    netIncomeRatio: number;
    eps: number;
    epsdiluted: number;
    weightedAverageShsOut: number;
    weightedAverageShsOutDil: number;
    link: string;
    finalLink: string;
  }
  
  export interface CompanyBalanceSheet {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    cashAndCashEquivalents: number;
    shortTermInvestments: number;
    cashAndShortTermInvestments: number;
    netReceivables: number;
    inventory: number;
    otherCurrentAssets: number;
    totalCurrentAssets: number;
    propertyPlantEquipmentNet: number;
    goodwill: number;
    intangibleAssets: number;
    goodwillAndIntangibleAssets: number;
    longTermInvestments: number;
    taxAssets: number;
    otherNonCurrentAssets: number;
    totalNonCurrentAssets: number;
    otherAssets: number;
    totalAssets: number;
    accountPayables: number;
    shortTermDebt: number;
    taxPayables: number;
    deferredRevenue: number;
    otherCurrentLiabilities: number;
    totalCurrentLiabilities: number;
    longTermDebt: number;
    deferredRevenueNonCurrent: number;
    deferredTaxLiabilitiesNonCurrent: number;
    otherNonCurrentLiabilities: number;
    totalNonCurrentLiabilities: number;
    otherLiabilities: number;
    capitalLeaseObligations: number;
    totalLiabilities: number;
    preferredStock: number;
    commonStock: number;
    retainedEarnings: number;
    accumulatedOtherComprehensiveIncomeLoss: number;
    othertotalStockholdersEquity: number;
    totalStockholdersEquity: number;
    totalEquity: number;
    totalLiabilitiesAndStockholdersEquity: number;
    minorityInterest: number;
    totalLiabilitiesAndTotalEquity: number;
    totalInvestments: number;
    totalDebt: number;
    netDebt: number;
    link: string;
    finalLink: string;
  }
  
  export interface CompanyCashFlow {
    date: string;
    symbol: string;
    reportedCurrency: string;
    cik: string;
    fillingDate: string;
    acceptedDate: string;
    calendarYear: string;
    period: string;
    netIncome: number;
    depreciationAndAmortization: number;
    deferredIncomeTax: number;
    stockBasedCompensation: number;
    changeInWorkingCapital: number;
    accountsReceivables: number;
    inventory: number;
    accountsPayables: number;
    otherWorkingCapital: number;
    otherNonCashItems: number;
    netCashProvidedByOperatingActivities: number;
    investmentsInPropertyPlantAndEquipment: number;
    acquisitionsNet: number;
    purchasesOfInvestments: number;
    salesMaturitiesOfInvestments: number;
    otherInvestingActivites: number;
    netCashUsedForInvestingActivites: number;
    debtRepayment: number;
    commonStockIssued: number;
    commonStockRepurchased: number;
    dividendsPaid: number;
    otherFinancingActivites: number;
    netCashUsedProvidedByFinancingActivities: number;
    effectOfForexChangesOnCash: number;
    netChangeInCash: number;
    cashAtEndOfPeriod: number;
    cashAtBeginningOfPeriod: number;
    operatingCashFlow: number;
    capitalExpenditure: number;
    freeCashFlow: number;
    link: string;
    finalLink: string;
  }
  
  export interface CompanyKeyMetrics {
    revenuePerShareTTM: number;
    netIncomePerShareTTM: number;
    operatingCashFlowPerShareTTM: number;
    freeCashFlowPerShareTTM: number;
    cashPerShareTTM: number;
    bookValuePerShareTTM: number;
    tangibleBookValuePerShareTTM: number;
    shareholdersEquityPerShareTTM: number;
    interestDebtPerShareTTM: number;
    marketCapTTM: number;
    enterpriseValueTTM: number;
    peRatioTTM: number;
    priceToSalesRatioTTM: number;
    pocfratioTTM: number;
    pfcfRatioTTM: number;
    pbRatioTTM: number;
    ptbRatioTTM: number;
    evToSalesTTM: number;
    enterpriseValueOverEBITDATTM: number;
    evToOperatingCashFlowTTM: number;
    evToFreeCashFlowTTM: number;
    earningsYieldTTM: number;
    freeCashFlowYieldTTM: number;
    debtToEquityTTM: number;
    debtToAssetsTTM: number;
    netDebtToEBITDATTM: number;
    currentRatioTTM: number;
    interestCoverageTTM: number;
    incomeQualityTTM: number;
    dividendYieldTTM: number;
    dividendYieldPercentageTTM: number;
    payoutRatioTTM: number;
    salesGeneralAndAdministrativeToRevenueTTM: number;
    researchAndDevelopementToRevenueTTM: number;
    intangiblesToTotalAssetsTTM: number;
    capexToOperatingCashFlowTTM: number;
    capexToRevenueTTM: number;
    capexToDepreciationTTM: number;
    stockBasedCompensationToRevenueTTM: number;
    grahamNumberTTM: number;
    roicTTM: number;
    returnOnTangibleAssetsTTM: number;
    grahamNetNetTTM: number;
    workingCapitalTTM: number;
    tangibleAssetValueTTM: number;
    netCurrentAssetValueTTM: number;
    investedCapitalTTM: number;
    averageReceivablesTTM: number;
    averagePayablesTTM: number;
    averageInventoryTTM: number;
    daysSalesOutstandingTTM: number;
    daysPayablesOutstandingTTM: number;
    daysOfInventoryOnHandTTM: number;
    receivablesTurnoverTTM: number;
    payablesTurnoverTTM: number;
    inventoryTurnoverTTM: number;
    roeTTM: number;
    capexPerShareTTM: number;
    dividendPerShareTTM: number;
    debtToMarketCapTTM: number;
  }
  
  export interface CompanyHistoricalDividend {
    symbol: string;
    historical: Dividend[];
  }
  
  export interface Dividend {
    date: string;
    label: string;
    adjDividend: number;
    dividend: number;
    recordDate: string;
    paymentDate: string;
    declarationDate: string;
  }
  
  export interface CompanyCompData {
    symbol: string;
    peersList: string[];
  }
  
  export interface CompanyTenK {
    symbol: string;
    fillingDate: string;
    acceptedDate: string;
    cik: string;
    type: string;
    link: string;
    finalLink: string;
  }
  
  export interface CompanyCompData{
    symbol: string;
    peersList:string[];
  }

  export interface CompanyTenK{
    symbol: string;
    fillingDate: string;
    acceptedDate: string;
    cik: string;
    type: string;
    link: string;
    finalLink: string;
  }

  /*
  这是一个定义了多个接口（`interface`）的TypeScript文件，通常用于描述公司财务数据和相关信息的结构。每个接口代表特定类型的数据格式，可能会被用于金融或股票分析类的应用程序。具体来说，这些接口可以帮助描述从外部API或数据库中获取的公司财务信息和关键指标。以下是一些主要接口的说明：

1. **`CompanySearch`**: 用于定义公司搜索结果的格式，包含了公司的股票代码、交易所、货币等基本信息。

2. **`CompanyProfile`**: 描述公司的详细信息，如公司名称、股票代码、行业、CEO、网站、员工数等，以及一些财务数据如价格、总市值等。

3. **`CompanyKeyRatios`**: 包含公司的关键财务比率信息，如市盈率、毛利润率、净利润率等，这些指标对于评估公司财务健康状况很重要。

4. **`CompanyIncomeStatement`**: 代表公司的收入报表，包括收入、成本、毛利润、净收入等数据。

5. **`CompanyBalanceSheet`**: 用于描述公司的资产负债表，包括总资产、总负债、股东权益等。

6. **`CompanyCashFlow`**: 描述公司的现金流量表，包括经营活动产生的现金流、投资活动、融资活动等。

7. **`CompanyKeyMetrics`**: 描述公司的关键财务指标，如每股收益、市值、企业价值、股息收益率等。

8. **`CompanyHistoricalDividend`** 和 **`Dividend`**: 用于记录公司的历史股息信息。

9. **`CompanyCompData`**: 定义了公司竞争对手的列表。

10. **`CompanyTenK`**: 代表公司的10-K报表（美国上市公司向SEC提交的年度财务报告）的相关信息。

该文件用于一个金融应用或分析系统中，通过这些接口来定义从外部获取的数据的结构，并确保这些数据在使用时符合相应的类型。
  */