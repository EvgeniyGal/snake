# Spec: Authentication

## ADDED Requirements

### Requirement: User Registration
Users can create an account.

#### Scenario: Valid Registration
- **Given** a user provides a unique username and valid password
- **When** they submit the sign-up form
- **Then** a new user record is created in the database
- **And** they are automatically logged in

### Requirement: User Login
Users can access their profile.

#### Scenario: Login
- **Given** a registered user
- **When** they enter correct credentials
- **Then** a session is established

### Requirement: User Roles
System supports multiple roles.

#### Scenario: Default Role
- **Given** a new user is created
- **Then** they are assigned the 'Player' role by default
