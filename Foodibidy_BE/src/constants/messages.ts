export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name must be between 1 and 100 characters',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  PASSWORD_IS_REQUIRED: 'Password is required',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password must be between 6 and 50 characters',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password must be between 6 and 50 characters',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 6 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  dateOfBirth_IS_REQUIRED: 'Date of birth is required',
  dateOfBirth_MUST_BE_ISO8601: 'Date of birth must be in ISO8601 format',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Register success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  REFRESH_TOKEN_SUCCESS: 'Refresh token success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  FORGOT_PASSWORD_TOKEN_INVALID: 'Forgot password token invalid',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_PROFILE_SUCCESS: 'Get my profile success',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_FROM_1_TO_200: 'Bio must be between 1 and 200 characters',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_FROM_1_TO_200: 'Location must be between 1 and 200 characters',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_FROM_1_TO_200: 'Website must be between 1 and 200 characters',
  USER_NAME_MUST_BE_A_STRING: 'User name must be a string',
  USERNAME_INVALID:
    'User name must be 4 to 15 characters long, contain only letters, numbers, underscores, not only numbers',
  IMAGE_URL_MUST_BE_A_STRING: 'Image url must be a string',
  IMAGE_URL_LENGTH_MUST_BE_FROM_1_TO_400: 'Image url must be between 1 and 400 characters',
  UPDATE_ME_SUCCESS: 'Update my profile success',
  DELETE_ME_FAIL: 'Delte my profile fail',
  GET_ALL_PROFILE_SUCCESS: 'Get all profiles success',
  FOLLOW_SUCCESS: 'Follow success',
  FOLLOWED: 'Followed',
  INVALID_USER_ID: 'Invalid user id',
  ALREADY_UNFOLLOWED: 'Already unfollowed',
  UNFOLLOW_SUCCESS: 'Unfollow success',
  USERNAME_EXISTED: 'Username existed',
  OLD_PASSWORD_NOT_MATCH: 'Old password not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  UPLOAD_SUCCESS: 'Upload success',
  GET_VIDEO_STATUS_SUCCESS: 'Get video status success',
  GMAIL_NOT_VERIFIED: 'Gmail not verified'
} as const

export const CATEGORY_MESSAGES = {
  CREATE_SUCCESS: 'Category created successfully',
  GET_SUCCESS: 'Get category successfully',
  GET_ALL_SUCCESS: 'Get all categories successfully',
  UPDATE_SUCCESS: 'Category updated successfully',
  DELETE_SUCCESS: 'Category deleted successfully',
  NOT_FOUND: 'Category not found',
  SERVER_FAIL: 'Server get an error'
}

export const ADDRESS_MESSAGES = {
  CREATE_SUCCESS: 'Address created successfully',
  GET_SUCCESS: 'Get address successfully',
  GET_ALL_SUCCESS: 'Get all addresses successfully',
  UPDATE_SUCCESS: 'Address updated successfully',
  DELETE_SUCCESS: 'Address deleted successfully',
  ADDRESS_NOT_FOUND: 'Address not found',
  SERVER_FAIL: 'Server get an error'
}

export const CART_MESSAGES = {
  CREATE_SUCCESS: 'Cart created successfully',
  ADD_SUCCESS: 'Add dish to cart successfully',
  GET_SUCCESS: 'Get cart successfully',
  GET_ALL_SUCCESS: 'Get all carts successfully',
  UPDATE_SUCCESS: 'Cart updated successfully',
  DELETE_SUCCESS: 'Cart deleted successfully',
  CART_NOT_FOUND: 'Cart not found',
  SERVER_FAIL: 'Server get an error'
}
export const DISH_MESSAGES = {
  CREATE_SUCCESS: 'Dish created successfully',
  GET_SUCCESS: 'Get dish successfully',
  GET_ALL_SUCCESS: 'Get all dishes successfully',
  UPDATE_SUCCESS: 'Dish updated successfully',
  DELETE_SUCCESS: 'Dish deleted successfully',
  DISH_NOT_FOUND: 'Dish not found',
  SERVER_FAIL: 'Server get an error'
}

export const NOTIFICATION_MESSAGES = {
  CREATE_SUCCESS: 'Notification created successfully',
  GET_SUCCESS: 'Get notification successfully',
  GET_ALL_SUCCESS: 'Get all notifications successfully',
  UPDATE_SUCCESS: 'Notification updated successfully',
  DELETE_SUCCESS: 'Notification deleted successfully',
  NOTIFICATION_NOT_FOUND: 'Notification not found',
  SERVER_FAIL: 'Server get an error'
}
export const ORDER_MESSAGES = {
  CREATE_SUCCESS: 'Order placed successfully',
  GET_SUCCESS: 'Get order successfully',
  GET_ALL_SUCCESS: 'Get all orders successfully',
  UPDATE_SUCCESS: 'Order updated successfully',
  DELETE_SUCCESS: 'Order deleted successfully',
  ORDER_NOT_FOUND: 'Order not found',
  SERVER_FAIL: 'Server get an error'
}
export const REVIEW_MESSAGES = {
  CREATE_SUCCESS: 'Review submitted successfully',
  GET_SUCCESS: 'Get review successfully',
  GET_ALL_SUCCESS: 'Get all reviews successfully',
  UPDATE_SUCCESS: 'Review updated successfully',
  DELETE_SUCCESS: 'Review deleted successfully',
  REVIEW_NOT_FOUND: 'Review not found',
  SERVER_FAIL: 'Server get an error'
}
export const RESTAURANT_MESSAGES = {
  CREATE_SUCCESS: 'Restaurant created successfully',
  GET_SUCCESS: 'Get restaurant successfully',
  GET_ALL_SUCCESS: 'Get all restaurants successfully',
  UPDATE_SUCCESS: 'Restaurant updated successfully',
  DELETE_SUCCESS: 'Restaurant deleted successfully',
  NOT_FOUND: 'Restaurant not found',
  SERVER_FAIL: 'Server get an error'
}

export const USER_DISH_MESSAGES = {
  CREATE_SUCCESS: 'User_dish created successfully',
  GET_SUCCESS: 'Get user_dish successfully',
  GET_ALL_SUCCESS: 'Get all user_dish successfully',
  UPDATE_SUCCESS: 'User_dish updated successfully',
  DELETE_SUCCESS: 'User_dish deleted successfully',
  NOT_FOUND: 'User_dish not found',
  SERVER_FAIL: 'Server get an error',
  DISH_EXIST: 'Dish exists'
}

export const FILE_MESSAGES = {
  FILE_EMPTY: 'FILE_EMPTY',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  INVALID_FILE_NAME: 'INVALID_FILE_NAME',
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',
  UNKNOWN: 'UNKNOWN'
}
