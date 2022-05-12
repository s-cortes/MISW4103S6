const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Post } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";

import { UserHomePage } from "./pages/user/home";

import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('f003');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const post = new Post(screenshotManager);
const settingsPage = new SettingsPage();

const homePage = new UserHomePage(screenshotManager);

/**
 * Agrupación de Escenarios prof Funcionalidad
 * F003: Publicación de Posts/Pages
 */
describe("Funcionalidad: Publicación de Post/Pages", () => {
    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10003);
        login.login(adminEmail, adminPassword);
    });

    after(() => {
        settingsPage.navigateToLabs();
        settingsPage.deleteAllContent();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce("ghost-admin-api-session");
        // GIVEN that the admin navigates to the posts
        post.navigateToPosts();
    });

    it("E001: Publicación instantanea de un Post y revisón", () => {
        screenshotManager.setScenario('E01');
        // GIVEN the admin user logs in to ghost, 

        // WHEN he goes to a created Post, and select Publish
        // and select "Set it live now" and press"Publish",
        dashboard.createPost();
        let title = post.writeTitle();
        post.writeArticle();

        // THEN he should see the Post published on Main Page
        post.publishNow();

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

    it("E002: Publicación programada de un Post y revisión", () => {
        screenshotManager.setScenario('E02');
        // GIVEN the admin user logs in to ghost, 

        // WHEN he goes to a created Post, and select Publish
        // and select "Set it live now" and press"Publish",
        dashboard.createPost();
        let title = post.writeTitle();
        post.writeArticle();

        // THEN he should see the Post published on Main Page
        post.publishScheduleForLater();

        homePage.navigate();
    });

    it("E003: Publicación programada de un Post y error en programacion", () => {
        // GIVEN the admin user logs in to ghost,

        // WHEN he goes to a created Post, and select Publish
        // and select "Set it live now" and press"Publish", 
        dashboard.createPost();
        let title = post.writeTitle();
        post.writeArticle();

        // THEN he should see the Post published on Main Page
        post.publishScheduleForLater(true);
        post.getTimeErrorPost((item) => {
            expect(item).to.exist;
        });
    });

    it("E004: Publicación programada de un Post y error en programacion", () => {
        screenshotManager.setScenario('E03');
        // GIVEN the admin user logs in to ghost, 

        // WHEN he goes to a created Post, and select Publish
        // and select "Set it live now" and press"Publish",
        dashboard.createPost();
        let title = post.writeTitle();
        post.writeArticle();

        // THEN he should see the Post published on Main Page
        post.publishNow()

        homePage.navigate();
        cy.wait(300);
        homePage.getFirstPostByTitle(title, (pItem) => {
            expect(pItem).to.exist;
        });
        cy.wait(300);

        post.navigateToPosts();

        post.goPostFromListByTitle(title);
        post.unPublish();
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
})