Feature: MyGhostF004_E05

@user3 @web
Scenario: F004-E05 Como administrador de ghost inicio sesion, creo una nuevo tag, creo una nueva pagina, le asigno el nuevo tag, luego la publíco y en la página principal de páginas, filtro por el nuevo tag creado para validar que aparezca solo la nueva página
   Given I navigate to page "<URL>"
   And I wait for 2 seconds
   And I enter email "<USERNAME1>"
   And I wait for 2 seconds
   And I enter password "<PASSWORD1>"
   And I wait for 2 seconds
   And I click sing in
   And I wait for 2 seconds
   And I click on Tags
   And I wait for 2 seconds
   And I click on New Tag option
   And I wait for 2 seconds
   And I click on Tag Name
   And I wait for 2 seconds
   And I enter text "$name_3"
   And I wait for 2 seconds
   And I click on Tag description
   And I wait for 2 seconds
   And I enter text "$string_3"
   And I wait for 2 seconds
   And I click on Save
   And I wait for 2 seconds
   And I click on Page
   And I wait for 2 seconds
   And I click on New Page option
   And I wait for 2 seconds
   And I click on page title
   And I wait for 2 seconds
   And I enter text "$name_4"
   And I wait for 2 seconds
   And I click on the begin writing your ... section
   And I wait for 2 seconds
   And I enter text "$string_4"
   And I wait for 2 seconds  
   And I Open the post settings
   And I wait for 2 seconds  
   And I click on Tag option
   And I select the Tag "$$name_3"
   And I wait for 7 seconds  
   And I click on the publish option
   And I wait for 2 seconds   
   And I click on publish button
   And I wait for 3 seconds
   And I click on Page
   And I wait for 3 seconds
   And I click on Tag Filter
   And I wait for 7 seconds
   When I select Tag Filter val "$$name_3"
   And I wait for 7 seconds
   Then I should see the created page "$$name_4"
   And I wait for 7 seconds