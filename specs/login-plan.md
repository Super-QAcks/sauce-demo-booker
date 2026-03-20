# Login Feature Test Plan

## Application Overview

Login feature test plan for Sauce Demo Booker with positive, negative, and edge-case scenarios.

## Test Scenarios

### 1. Login Feature

**Seed:** `ui/tests/seed.spec.ts`

#### 1.1. Happy Path: Successful login with valid credentials

**File:** `specs/login-plan.md`

**Steps:**

1. Navigate to the login page URL (https://automationexercise.com/login).
   - expect: Login form is visible.

2. Enter a valid email in the email field.
   - expect: Email field contains typed valid email.

3. Enter a valid password in the password field.
   - expect: Password field contains typed password.

4. Click the login button.
   - expect: User is redirected to account dashboard or homepage.
   - expect: A visible success message or logout link appears.

#### 1.2. Negative Path: Missing email and password

**File:** `specs/login-plan.md`

**Steps:**

1. Navigate to the login page.
   - expect: Login form is visible.

2. Leave email and password blank and click login.
   - expect: A validation error message appears for missing credentials.

#### 1.3. Negative Path: Invalid email format

**File:** `specs/login-plan.md`

**Steps:**

1. Open login page.
   - expect: Login form is visible.

2. Type invalid email format (e.g., 'invalidemail') and valid password.
   - expect: Form validation error appears for invalid email format or login fails.

#### 1.4. Negative Path: Wrong password

**File:** `specs/login-plan.md`

**Steps:**

1. Open login page.
   - expect: Login form is visible.

2. Enter valid email and incorrect password.
   - expect: Login fails and invalid credentials error appears.

#### 1.5. Edge Case: SQL injection or script-like input

**File:** `specs/login-plan.md`

**Steps:**

1. Open login page.
   - expect: Login form is visible.

2. Enter `' OR '1'='1` as email and any password.
   - expect: Application rejects input and shows invalid credentials, no server error.
