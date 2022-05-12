const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Page } from "./pages/admin/editor";
import { Tag } from "./pages/admin/tag";
import { SettingsPage } from "./pages/admin/settings";

import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('f004');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const page = new Page(screenshotManager);
const tag = new Tag(screenshotManager);
const settingsPage = new SettingsPage();

/**
 * Agrupación de Escenarios prof Funcionalidad
 * F004: Creación de Tags
 */
describe('Funcionalidad: Creación de Tags', () => {
    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10004);
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

    it('E001: Asignar un nuevo Tag a una nueva Pagina y filtrar por dicho Tag', () => {
        screenshotManager.setScenario('E01');
        // GIVEN (additional to the login)

        //Creat a Tag
        dashboard.getTags();
        tag.createNewTag();

        let name = tag.WriteTagName();
        let description = tag.WriteTagDesc();

        //Save the tag
        tag.saveTag();
        //Create a Page
        dashboard.getPages();
        page.createNewPage();
        let title = page.writeTitle();
        let article = page.writeArticle();

        //Assign a Tag to a page
        page.clickEditorSettingsToggle();
        page.setTagPage(name);
        page.clickEditorSettingsToggle();
        page.publishNow();

        dashboard.getPages();

        page.getFirstFromListByTitle(title, (pItem) => {
            pItem.click();
            cy.wait(300);
            page.readArticle((txt) => expect(txt).to.equal(article));
        });
    });
});
