import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const UniversityOverviewChart = ({ data }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null); // State to track hovered segment

  // Sample detailed data for each category
  const detailedData = {
    students: [
      { id: 'S001', name: 'Alice', deptName: 'CS' },
      { id: 'S002', name: 'Bob', deptName: 'Math' },
      { id: 'S003', name: 'Charlie', deptName: 'CS' },
      { id: 'S004', name: 'Daisy', deptName: 'Math' },
      { id: 'S005', name: 'Eva', deptName: 'Physics' },
      { id: 'S006', name: 'Frank', deptName: 'CS' },
      { id: 'S007', name: 'Grace', deptName: 'Math' },
      { id: 'S008', name: 'Hank', deptName: 'Physics' },
    ],
    classrooms: [
      { building: 'Engineering', roomNumber: '101', capacity: 50 },
      { building: 'Engineering', roomNumber: '102', capacity: 30 },
      { building: 'Science', roomNumber: '201', capacity: 40 },
      { building: 'Science', roomNumber: '202', capacity: 20 },
      { building: 'Arts', roomNumber: '301', capacity: 60 },
    ],
    instructors: [
      { id: 'I001', name: 'Dr. Smith', deptName: 'CS' },
      { id: 'I002', name: 'Prof. Johnson', deptName: 'Math' },
      { id: 'I003', name: 'Dr. Brown', deptName: 'Physics' },
      { id: 'I004', name: 'Ms. Green', deptName: 'Arts' },
    ],
    departments: [
      { deptName: 'CS', building: 'Engineering', budget: 150000 },
      { deptName: 'Math', building: 'Science', budget: 120000 },
      { deptName: 'Physics', building: 'Science', budget: 130000 },
      { deptName: 'Arts', building: 'Arts', budget: 80000 },
    ],
    courses: [
      { courseId: 'CS101', title: 'Intro to CS', deptName: 'CS' },
      { courseId: 'CS102', title: 'Data Structures', deptName: 'CS' },
      { courseId: 'MATH201', title: 'Calculus II', deptName: 'Math' },
      { courseId: 'MATH202', title: 'Linear Algebra', deptName: 'Math' },
      { courseId: 'PHY101', title: 'Physics I', deptName: 'Physics' },
      { courseId: 'PHY102', title: 'Physics II', deptName: 'Physics' },
    ],
  };

  // Overall information to show when hovering
  const overallData = {
    students: {
      total: detailedData.students.length,
      deptCounts: detailedData.students.reduce((acc, student) => {
        acc[student.deptName] = (acc[student.deptName] || 0) + 1;
        return acc;
      }, {}),
    },
    instructors: {
      names: detailedData.instructors.map(instructor => `${instructor.name} (${instructor.deptName})`),
    },
    courses: {
      titles: detailedData.courses.map(course => `${course.title} (${course.deptName})`),
    },
    classrooms: {
      total: detailedData.classrooms.length,
      capacity: detailedData.classrooms.reduce((acc, classroom) => acc + classroom.capacity, 0),
    },
    departments: {
      total: detailedData.departments.length,
      budget: detailedData.departments.reduce((acc, dept) => acc + dept.budget, 0), // Total budget
    },

  };

  const handleMouseEnter = (dataItem) => {
    setHoveredSegment(dataItem.name); // Set hovered segment's name
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null); // Reset on leave
  };

  return (
    <Grid container spacing={3}>
      {/* Pie Chart Section */}
      <Grid item xs={12} md={6}>
        <Paper elevation={6} style={{ padding: '1.5rem', borderRadius: '15px' }}>
          <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>
            University Overview
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={160}
                innerRadius={80}
                fill="#8884d8"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animationDuration={400}
                isAnimationActive={true}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    style={{ cursor: 'pointer', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Detailed Information Section */}
      <Grid item xs={12} md={6}>
        <Paper elevation={6} style={{ padding: '1.5rem', borderRadius: '15px', transition: 'all 0.3s ease-in-out' }}>
          <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>
             Information
          </Typography>

          {hoveredSegment ? (
            <Fade in={!!hoveredSegment} timeout={500}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 700 }}>Description</TableCell>
                      <TableCell style={{ fontWeight: 700 }}>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hoveredSegment === 'Students' && (
                      <>
                        <TableRow>
                          <TableCell>Total Students</TableCell>
                          <TableCell>{overallData.students.total}</TableCell>
                        </TableRow>
                        {Object.entries(overallData.students.deptCounts).map(([dept, count]) => (
                          <TableRow key={dept}>
                            <TableCell>{dept}</TableCell>
                            <TableCell>{count}</TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                    {hoveredSegment === 'Instructors' && (
                      <TableRow>
                        <TableCell>Instructors</TableCell>
                        <TableCell>{overallData.instructors.names.join(', ')}</TableCell>
                      </TableRow>
                    )}
                    {hoveredSegment === 'Courses' && (
                      <TableRow>
                        <TableCell>Courses</TableCell>
                        <TableCell>{overallData.courses.titles.join(', ')}</TableCell>
                      </TableRow>
                    )}
                    {hoveredSegment === 'Classrooms' && (
                      <>
                        <TableRow>
                          <TableCell>Total Classrooms</TableCell>
                          <TableCell>{overallData.classrooms.total}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total Capacity</TableCell>
                          <TableCell>{overallData.classrooms.capacity}</TableCell>
                        </TableRow>
                      </>
                    )}
                    {hoveredSegment === 'Departments' && (
                      <>
                        <TableRow>
                          <TableCell>Total Departments</TableCell>
                          <TableCell>{overallData.departments.total}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total Budget</TableCell>
                          <TableCell>{overallData.departments.budget}</TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fade>
          ) : (
            <Fade in={true} timeout={500}>
              <Typography variant="body1" style={{ fontSize: '18px', textAlign: 'center', marginTop: '2rem' }}>
              <h2>                Hover over a Chart to view detailed information.
              </h2>
              </Typography>
            </Fade>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UniversityOverviewChart;
