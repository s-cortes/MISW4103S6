Feature: Configuración de Posts y Pages

@user1 @web
Scenario: E001 Modificar URL de un Post con Admin
   Given I navigate to page "<URL>"
   And I wait for 3 seconds
   And I enter email "<USERNAME1>"
   And I enter password "<PASSWORD1>"
   And I click sing in
   And I wait for 3 seconds
   And I click on new post
   And I wait for 2 seconds
   And I write a title on the Editor "$name_1"
   And I write the text content on the Editor "$string_1"
   When I click the Editor Settings menu
   And I modify the current URL slug "$name_2"
   And I wait for 5 seconds
   And I click the Editor Settings menu
   Then I click on the publish option
   And I wait for 2 seconds
   And I click on publish button
   And I wait for 2 seconds   
   And I publish it
   And I wait for 2 seconds
   And I send a signal to user 2 containing "F002E01 Published"
   Given I wait for a signal containing "F002E01 Reviewed" for 180 seconds

@user2 @web
Scenario: E001 Revisar URL de un Post  con Usuario
   Given I wait for a signal containing "F002E01 Published" for 180 seconds
   When I visit a particular post "<HOMEPAGE>" "$$name_2"
   And I wait for 2 seconds
   Then I should see the tittle "$$name_1"
   And I wait for 2 seconds
   And I should see the body text "$$string_1"
   And I send a signal to user 1 containing "F002E01 Reviewed"
