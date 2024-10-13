import React, { useState, useEffect, Suspense } from 'react';
import { Box, Paper, Typography, CircularProgress, Grid, Button, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { faker } from '@faker-js/faker';  // 使用faker
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';  // 使用axios

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';

// 使用懒加载
const SalesOverviewChart = React.lazy(() => import('../../Components/LazeLoadingCom/SalesOverviewChart'));
const UserGrowthChart = React.lazy(() => import('../../Components/LazeLoadingCom/UserGrowthChart'));

// 创建一个容器组件来包裹整个Dashboard
const DashboardWrapper = styled(Box)({
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  padding: '20px',
});

// 模拟数据生成
const generateTestData = () => {
  return {
    activeUsers: faker.number.int({ min: 1000, max: 5000 }),
    totalSales: faker.finance.amount({ min: 10000, max: 50000, dec: 2 }),  // Updated to use a single object
    growthRate: faker.number.int({ min: 5, max: 25 }),
  };
};

// Modify the stock data generation code
const generateStockData = () => {
  const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];
  const data = [];
  for (let i = 0; i < stockSymbols.length; i++) {
    data.push({
      symbol: stockSymbols[i],
      price: faker.finance.amount({ min: 100, max: 1500, dec: 2 }),  // Updated to use object with min, max, and decimals
      change: faker.finance.amount({ min: -10, max: 10, dec: 2 }),  // Updated to use object with min, max, and decimals
    });
  }
  return data;
};

const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      month: faker.date.month(),
      sales: faker.number.int({ min: 5000, max: 50000 }),
    });
  }
  return data;
};

interface Props {
  message: string;
}

// 创建一个函数组件并使用 Props 类型
const DashBoardPage: React.FC<Props> = ({ message }) => {
  const [data, setData] = useState({
    activeUsers: 0,
    totalSales: '0',
    growthRate: 0,
  });

  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState(generateStockData());
  const [chartData, setChartData] = useState(generateChartData());
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [chartType, setChartType] = useState('line');

  // 模拟从后端获取数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateTestData());
      setLoading(false);
    }, 1000);  // 模拟1秒延迟
    return () => clearTimeout(timer);
  }, []);

  // 股票选择更新
  const handleStockChange = (event: SelectChangeEvent<string>) => {
    setSelectedStock(event.target.value);
  };

  // 图表类型切换
  const handleChartTypeChange = (event: SelectChangeEvent<string>) => {
    setChartType(event.target.value);
  };

  // 生成一个随机用户数据
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    avatar: faker.image.avatar(),
  };

  // 生成商业数据
  const company = {
    companyName: faker.company.name(),
    catchPhrase: faker.company.catchPhrase(),
    department: faker.commerce.department(),
    productName: faker.commerce.productName(),
  };

  return (
    <DashboardWrapper>
      <Typography variant="h4" gutterBottom>
        Cool Modern Dashboard (Using MUI present the data and ongoing developing...)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* 统计数据的网格布局 */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6">Active Users</Typography>
                  <Typography variant="h4">{data.activeUsers}</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6">Total Sales</Typography>
                  <Typography variant="h4">${data.totalSales}</Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6">Growth Rate</Typography>
                  <Typography variant="h4">{data.growthRate}%</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* 股票市场数据展示 */}
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6">Stock Market</Typography>
                  <Select value={selectedStock} onChange={handleStockChange}>
                    {stockData.map((stock, index) => (
                      <MenuItem key={index} value={stock.symbol}>
                        {stock.symbol}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="h5" mt={2}>
                    {selectedStock} Price: ${stockData.find(stock => stock.symbol === selectedStock)?.price}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6">Stock Price Change</Typography>
                  <LineChart
                    width={500}
                    height={300}
                    data={generateChartData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* 图表类型选择 */}
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h6">Chart Type</Typography>
                  <Select value={chartType} onChange={handleChartTypeChange}>
                    <MenuItem value="line">Line Chart</MenuItem>
                    <MenuItem value="pie">Pie Chart</MenuItem>
                  </Select>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* 图表展示 */}
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3}>
                <Typography variant="h6" gutterBottom align="center" mt={2}>
                  Sales Overview
                </Typography>
                <Suspense fallback={<CircularProgress />}>
                  <SalesOverviewChart />
                </Suspense>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3}>
                <Typography variant="h6" gutterBottom align="center" mt={2}>
                  User Growth
                </Typography>
                <Suspense fallback={<CircularProgress />}>
                  <UserGrowthChart />
                </Suspense>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </DashboardWrapper>
  );
};

export default DashBoardPage;
