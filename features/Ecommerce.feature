Feature: Ecoomerce validation
  @Regression
  @Validation
  Scenario Outline: Placing the order
    Given  a login to ecommerce platform with "<username>" and "<password>"
    When Add "<productname>"
    Then verify "<productname>" is present in the cart
    When enter valid detials "<cardnum>" , "<country>"," India" to place order
    Then verify order is present in the order history with " Thankyou for the order. "
 Examples:
    | username           | password    | productname     | cardnum        | country | selectcountry | successmsg                            |
    | sanky7ss@gmail.com | Iamking@000 | ADIDAS ORIGINAL | 12345678901234 | ind     | " India" | " Thankyou for the order. " |
  @Validation
  @Regression
  Scenario: Placing the order
    Given  a login to ecommerce2 platform with "sanky7ss@gmail.com" and "Iamking@000"
    Then error message should be visible

 
