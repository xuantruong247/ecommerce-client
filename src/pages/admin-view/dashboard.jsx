import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/v1/product?limit=3&hot=true'
        );
        const data = await response.json();

        const items = data?.data?.items || [];
        const labels = items.map((item) => item.name);
        const hotValues = items.map((item) => item.hot);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Top Sản phẩm Hot nhất',
              data: hotValues,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Thống kê Sản phẩm Hot</h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Top 3 Sản phẩm Hot nhất',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
