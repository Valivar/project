import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import UsersTable from '../../components/users/UsersTable';
import StoresTable from '../../components/stores/StoresTable';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    stores: 0,
    ratings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, storesRes, ratingsRes] = await Promise.all([
          axios.get('http://localhost:3000/users/count'),
          axios.get('http://localhost:3000/stores/count'),
          axios.get('http://localhost:3000/ratings/count'),
        ]);
        setStats({
          users: usersRes.data,
          stores: storesRes.data,
          ratings: ratingsRes.data,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{stats.users}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Stores</Typography>
            <Typography variant="h3">{stats.stores}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Ratings</Typography>
            <Typography variant="h3">{stats.ratings}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
        <UsersTable />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Stores
        </Typography>
        <StoresTable />
      </Box>
    </Box>
  );
};

export default AdminDashboard;