// // Login

// login: axiosClient.post('/parent/login', {user, password});

// updatePassword: axiosClient.put('parent/auth-update', values);

// // Profile

// ChildPhoto: axiosClient.put(`/student/photo-upload/${studentId}`, {
//   photo: base64Image,
// });

// updateChildInfo: axiosClient.put(`/student/parent-update/${studentId}`, {
//   bloodGroup,
//   dob,
//   address,
// });

// // Events

// getEvent: axiosClient.post('/parent/holiday-events', {month, year});

// // Dashboard

// checkParentMarkAttendance: axiosClient.get(
//   `attendance/check-parent-attendance-marked/${studentId}`,
// );

// monthlyAttendanceOfChild: axiosClient.get(
//   `/attendance/parent-monthly-attendance-status/${studentId}/${month}`,
// );

// monthlyAttendanceCount: axiosClient.post(
//   `/attendance/parent-monthly-attendance-count`,
//   {studentId, month, year},
// );

// yearlyAttendanceCount: axiosClient.post(
//   `/attendance/parent-yearly-attendance-count`,
//   {studentId, year},
// );

// markAttendance: axiosClient.post('/attendance/parent-mark-attendance', {
//   studentId: currentChild._id,
//   attendance: selectedAttendance,
// });

// // dashboard screens

// getParent: axiosClient.get('/parent/get-info');

// updateParent: axiosClient.put('/parent/profile-info-update', {values});

// updateEmailAndPhone: axiosClient.put('/parent/profile-update', {email, phone});

// updatePassword:axiosClient.put('/parent/password-change', {oldPassword,password});

export const EndPoints = {
  LOGIN: 'v2/parent/login',
  GET_STATUS: 'v2/parent/status',
  OTP_SEND: 'v2/parent/phoneVerify',
};
