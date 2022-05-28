import { AdminDashboard } from "../pages/admin/dashboard";
import { Login } from "../pages/admin/login";
import { Post } from "../pages/admin/editor";

import { UserHomePage } from "../pages/user/home";
import { Article } from "../pages/user/article";

const dashboard = new AdminDashboard();
const login = new Login();
const post = new Post();

const homePage = new UserHomePage();
const article = new Article();

/**
 * Agrupación de Escenarios prof Funcionalidad
 * F003: Publicación de Posts/Pages
 */
describe("Funcionalidad: Publicación de Post", () => {
  before(() => {
    // GIVEN that the admin user logs-in to ghost
    login.login("admin.user@test.com", "Admin@Test$MISW4103");
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce("ghost-admin-api-session");
    // GIVEN that the admin navigates to the posts
    post.navigateToPosts();
  });

  it("E001: Publicación instantanea de un Post y revisón", () => {
    // GIVEN the admin user logs in to ghost, WHEN he goes to a created Post, and select Publish and select "Set it live now" and press"Publish", THEN he should see the Post published on Main Page
    dashboard.createPost();
    let title = post.writeTitle();
    post.writeArticle();

    post.clickPublishButton();
    post.clickSetItLiveButton();
    post.clickPublish();

    homePage.navigate();
    cy.wait(300);
    post.getPostByTitleFromHome(title, (pItem) => {
      expect(pItem).to.exist;
    });
  });

  it("E002: Publicación programada de un Post y revisión", () => {
    // GIVEN the admin user logs in to ghost, WHEN he goes to a created Post, and select Publish and select "Set it live now" and press"Publish", THEN he should see the Post published on Main Page
    dashboard.createPost();
    let title = post.writeTitle();
    post.writeArticle();

    post.clickPublishButton();
    post.clickScheduleForLateButton();
    post.clickPublish();

    homePage.navigate();
  });

  it("E003: Publicación programada de un Post y error en programacion", () => {
    // GIVEN the admin user logs in to ghost, WHEN he goes to a created Post, and select Publish and select "Set it live now" and press"Publish", THEN he should see the Post published on Main Page
    dashboard.createPost();
    let title = post.writeTitle();
    post.writeArticle();

    post.clickPublishButton();
    post.clickScheduleForLateButtonError();
    post.getTimeErrorPost((item) => {
      expect(item).to.exist;
    });
  });

  it("E005: Despublicar un post ya publicado", () => {
    // GIVEN the admin user logs in to ghost, WHEN he goes to a created Post, and select Publish and select "Set it live now" and press"Publish", THEN he should see the Post published on Main Page
    dashboard.createPost();
    let title = post.writeTitle();
    post.writeArticle();

    post.clickPublishButton();
    post.clickSetItLiveButton();
    post.clickPublish();

    homePage.navigate();
    cy.wait(300);
    homePage.getFirstPostByTitle(title, (pItem) => {
      expect(pItem).to.exist;
    });
    cy.wait(300);

    post.navigateToPosts();

    post.goPostFromListByTitle(title);
    post.clickUpdateButton();
    post.clickSetItLiveButton();
    post.clickUnpublish();
    cy.wait(300);

    homePage.navigate();
    cy.wait(300);
    let hasPosts = homePage.hasPostsInList();
    if (hasPosts) {
      homePage.getPostListItems(($p, index, $list) => {
        homePage.findTitleOnPostItem($p, (txt) => {
          expect(txt).to.not.equal(title);
        });
      });
    } else {
      expect(hasPosts).to.equal(false);
    }
  });
});
