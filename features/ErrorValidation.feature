Feature: ErrorValidation
  @Validation
  @Regression
  Scenario: Placing the order
    Given  a login to ecommerce2 platform with "sanky7ss@gmail.com" and "Iamking@000"
    Then error message should be visible
  