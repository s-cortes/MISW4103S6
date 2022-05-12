import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Post, Page } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";

const { faker } = require('@faker-js/faker');

import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('f005');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const post = new Post(screenshotManager);
const page = new Page(screenshotManager);
const settingsPage = new SettingsPage();

/**
 * Agrupación de Escenarios prof Funcionalidad
 * F005: Preview de Posts o Pages
 */
describe('Funcionalidad: Preview de Posts o Pages', () => {

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10005);
        login.login(adminEmail, adminPassword);
    });

    after(() => {
        settingsPage.navigateToLabs();
        settingsPage.deleteAllContent();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
        dashboard.navigate();
    });

    it('E001: Previsualizar y publicar una Post', () => {
        screenshotManager.setScenario('E01');
        // GIVEN (additional to the login)

        // WHEN the admin goes to create a Page, writes a title
        // and writes text content
        dashboard.createPost();

        let title = post.writeTitle();
        let article = post.writeArticle();

        // THEN the post should appear as the first item in the
        // list, and the article's context should be the same as
        // the one written before
        post.getPreview();
        post.getPreviewContent(article, (pItem) => {
            pItem.click();
            cy.wait(300);
            post.readArticle((txt) => expect(txt).to.equal(article));
        });

        post.exitPriview();

        post.publishNow();

        post.clickEditorSettingsToggle();

        post.clickEditorSettingsView();

        post.readArticle((txt) => expect(txt).to.equal(article));

    });

    it('E002: Previsualizar y publicar un Post', () => {
        screenshotManager.setScenario('E02');
        // GIVEN (additional to the login)

        // WHEN the admin goes to create a Page, writes a title
        // and writes text content
        dashboard.getPages();
        page.createNewPage();

        let title = page.writeTitle();
        let article = page.writeArticle();

        // THEN the page should appear as the first item in the
        // list, and the article's context should be the same as
        // the one written before
        page.getPreview();
        page.getPreviewContent(article, (pItem) => {
            expect(pItem).to.exist;
            pItem.click();
            cy.wait(300);
            page.readArticle((txt) => expect(txt).to.equal(article));
        });

        page.exitPriview();

        page.publishNow();

        page.clickEditorSettingsToggle();

        page.clickEditorSettingsView();

        page.readArticle((txt) => expect(txt).to.equal(article));

    });
});