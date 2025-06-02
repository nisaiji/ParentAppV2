/**
 * All API EndPoints
 */

export const EndPoints = {
  LOGIN: 'v2/parent/login',
  GET_STATUS: 'v2/parent/status',
  OTP_SEND: 'v2/parent/phoneVerify',
  OTP_VERIFY: 'v2/parent/phoneVerify',
  OTP_SEND_UPDATE: 'v2/parent/update/phone-verify',
  OTP_VERIFY_UPDATE: 'v2/parent/update/phone-verify',
  EMAIL_OTP_SEND: 'v2/parent/emailVerify',
  EMAIL_OTP_VERIFY: 'v2/parent/emailVerify',
  EMAIL_OTP_SEND_UPDATE: 'v2/parent/update/email-verify',
  EMAIL_OTP_VERIFY_UPDATE: 'v2/parent/update/email-verify',
  PASSWORD_UPDATE: 'v2/parent/password',
  UPDATE_PARENT_FULLNAME: 'v2/parent/fullname',
  UPDATE_PARENT: 'v2/parent',
  UPDATE_STUDENT: 'v2/student/parent',
  CHECK_VALID_STUDENT: 'v2/parent/check-valid-student',
  ADD_STUDENT: 'v2/parent/add',
  GET_INFO: 'v2/parent',
  EDIT_PASSWORD: 'v2/parent/password/edit',
  PARENT_PHOTO_UPLOAD: 'v2/parent/photo-upload',
  STUDENT_PHOTO_UPLOAD: 'v2/student/parent/photo-upload',
  GET_ATTENDANCE: 'v2/student/parent/get-attendance',
  GET_EVENTS: 'v2/parent/holiday-workday',
};
