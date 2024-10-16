import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import UniversityOverviewChart from './UniversityOverviewChart';

const data = {
  classrooms: [
    { building: 'Engineering', roomNumber: '101', capacity: 50 },
    { building: 'Engineering', roomNumber: '102', capacity: 30 },
    { building: 'Science', roomNumber: '201', capacity: 40 },
    { building: 'Science', roomNumber: '202', capacity: 20 },
    { building: 'Arts', roomNumber: '301', capacity: 60 },
  ],
  students: [
    { id: 'S001', name: 'Alice', deptName: 'CS', totCred: 30 },
    { id: 'S002', name: 'Bob', deptName: 'Math', totCred: 28 },
    { id: 'S003', name: 'Charlie', deptName: 'CS', totCred: 22 },
    { id: 'S004', name: 'Daisy', deptName: 'Math', totCred: 25 },
    { id: 'S005', name: 'Eva', deptName: 'Physics', totCred: 18 },
    { id: 'S006', name: 'Frank', deptName: 'CS', totCred: 30 },
    { id: 'S007', name: 'Grace', deptName: 'Math', totCred: 29 },
    { id: 'S008', name: 'Hank', deptName: 'Physics', totCred: 24 },
  ],
  courses: [
    { courseId: 'CS101', title: 'Intro to CS', deptName: 'CS', credits: 3 },
    { courseId: 'CS102', title: 'Data Structures', deptName: 'CS', credits: 3 },
    { courseId: 'MATH201', title: 'Calculus II', deptName: 'Math', credits: 4 },
    { courseId: 'MATH202', title: 'Linear Algebra', deptName: 'Math', credits: 3 },
    { courseId: 'PHY101', title: 'Physics I', deptName: 'Physics', credits: 4 },
    { courseId: 'PHY102', title: 'Physics II', deptName: 'Physics', credits: 4 },
  ],
  departments: [
    { deptName: 'CS', building: 'Engineering', budget: 150000 },
    { deptName: 'Math', building: 'Science', budget: 120000 },
    { deptName: 'Physics', building: 'Science', budget: 130000 },
    { deptName: 'Arts', building: 'Arts', budget: 80000 },
  ],
  instructors: [
    { id: 'I001', name: 'Dr. Smith', deptName: 'CS', salary: 90000 },
    { id: 'I002', name: 'Prof. Johnson', deptName: 'Math', salary: 85000 },
    { id: 'I003', name: 'Dr. Brown', deptName: 'Physics', salary: 70000 },
    { id: 'I004', name: 'Ms. Green', deptName: 'Arts', salary: 60000 },
  ],
};

const Dashboard = () => {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [filters, setFilters] = useState({
    building: '',
    deptName: '',
    totCred: '',
    capacity: '',
  });

  const handleEntityChange = (entity) => {
    setSelectedEntity(entity);
    setFilters({});
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const filteredData = selectedEntity
    ? data[selectedEntity].filter((item) =>
        Object.keys(filters).length === 0 ||
        Object.keys(filters).every((key) =>
          filters[key] === '' ||
          String(item[key]).toLowerCase().includes(filters[key].toLowerCase())
        )
      )
    : [];

  // University Overview Data
  const universityOverviewData = [
    { name: 'Courses', value: data.courses.length },
    { name: 'Departments', value: data.departments.length },
    { name: 'Classrooms', value: data.classrooms.length },
    { name: 'Instructors', value: data.instructors.length },
    { name: 'Students', value: data.students.length },
  ];

  return (
    <div>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">University Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} style={{ padding: '2rem' }}>
        {/* University Overview */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h5" align="center"> University Overview</Typography>
            <UniversityOverviewChart data={universityOverviewData} />
          </Paper>
        </Grid>

        {/* Entity Selection */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Typography variant="h6">Select Data to Visualize</Typography>
            <Select
              value={selectedEntity}
              onChange={(e) => handleEntityChange(e.target.value)}
              fullWidth
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="">-- Select an Entity --</MenuItem>
              <MenuItem value="classrooms">Classrooms</MenuItem>
              <MenuItem value="students">Students</MenuItem>
              <MenuItem value="courses">Courses</MenuItem>
              <MenuItem value="departments">Departments</MenuItem>
              <MenuItem value="instructors">Instructors</MenuItem>
            </Select>
          </Paper>
        </Grid>

        {/* Filters */}
        {selectedEntity && (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '1rem' }}>
              <Typography variant="h6">Additional Filters</Typography>
              {selectedEntity === 'classrooms' && (
                <>
                  <Select
                    value={filters.building}
                    onChange={(e) => handleFilterChange('building', e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '1rem' }}
                  >
                    <MenuItem value="">-- Select Building --</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Arts">Arts</MenuItem>
                  </Select>
                  <div style={{ marginBottom: '1rem' }}>
                    <Typography variant="body1">Capacity :</Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleFilterChange('capacity', '20')}
                      style={{ margin: '0 0.5rem' }}
                    >
                      &lt;= 20
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleFilterChange('capacity', '30')}
                      style={{ margin: '0 0.5rem' }}
                    >
                      &lt;= 30
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleFilterChange('capacity', '40')}
                      style={{ margin: '0 0.5rem' }}
                    >
                      &lt;= 40
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleFilterChange('capacity', '50')}
                      style={{ margin: '0 0.5rem' }}
                    >
                      &lt;= 50
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleFilterChange('capacity', '60')}
                      style={{ margin: '0 0.5rem' }}
                    >
                      &lt;= 60
                    </Button>
                  </div>
                </>
              )}
              {selectedEntity === 'students' && (
                <>
                  <Select
                    value={filters.deptName}
                    onChange={(e) => handleFilterChange('deptName', e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '1rem' }}
                  >
                    <MenuItem value="">-- Select Department --</MenuItem>
                    <MenuItem value="CS">CS</MenuItem>
                    <MenuItem value="Math">Math</MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                  </Select>
                  <TextField
                    label="Total Credits"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleFilterChange('totCred', e.target.value)}
                    style={{ marginBottom: '1rem' }}
                  />
                </>
              )}
              {selectedEntity === 'courses' && (
                <>
                  <Select
                    value={filters.deptName}
                    onChange={(e) => handleFilterChange('deptName', e.target.value)}
                    displayEmpty
                    fullWidth
                    variant="outlined"
                    style={{ marginBottom: '1rem' }}
                  >
                    <MenuItem value="">-- Select Department --</MenuItem>
                    <MenuItem value="CS">CS</MenuItem>
                    <MenuItem value="Math">Math</MenuItem>
                    <MenuItem value="Physics">Physics</MenuItem>
                  </Select>
                  <TextField
                    label="Course Title"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleFilterChange('title', e.target.value)}
                    style={{ marginBottom: '1rem' }}
                  />
                </>
              )}
            </Paper>
          </Grid>
        )}

        {/* Filtered Data Display */}
        {selectedEntity && (
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '1rem' }}>
              <Typography variant="h6">Filtered Data</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {selectedEntity === 'students' && (
                        <>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Total Credits</TableCell>
                        </>
                      )}
                      {selectedEntity === 'courses' && (
                        <>
                          <TableCell>Course ID</TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>Credits</TableCell>
                        </>
                      )}
                      {selectedEntity === 'classrooms' && (
                        <>
                          <TableCell>Building</TableCell>
                          <TableCell>Room Number</TableCell>
                          <TableCell>Capacity</TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow key={index}>
                        {selectedEntity === 'students' && (
                          <>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.deptName}</TableCell>
                            <TableCell>{item.totCred}</TableCell>
                          </>
                        )}
                        {selectedEntity === 'courses' && (
                          <>
                            <TableCell>{item.courseId}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.deptName}</TableCell>
                            <TableCell>{item.credits}</TableCell>
                          </>
                        )}
                        {selectedEntity === 'classrooms' && (
                          <>
                            <TableCell>{item.building}</TableCell>
                            <TableCell>{item.roomNumber}</TableCell>
                            <TableCell>{item.capacity}</TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
