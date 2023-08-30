/// <reference types="cypress" />
const api = 'https://norma.nomoreparties.space/api';
describe('Тестирование конструктора', () => {

  beforeEach(() => {
    cy.intercept("GET", `${api}/ingredients`, { fixture: "ingredients.json" });

    cy.visit('http://localhost:3000');
    cy.viewport('macbook-15');
  });

  it('Проверка кол-ва элементов в конструкторе', () => { 
    cy.get("[data-test='Булки'] > div").should("have.length", 2);
    cy.get("[data-test='Соусы'] > div").should("have.length", 4);
    cy.get("[data-test='Начинки'] > div").should("have.length", 9);
  });

  it('Перемещение ингредиентов в конструктор', () => {
    cy.get('[data-test=ingredient]').contains('Краторная булка N-200i').trigger('dragstart').then(() => {
      cy.get('[data-test=constructor_area]').trigger('drop');

      cy.get('[data-test=constructor_top]').contains('Краторная булка N-200i (верх)').should('exist');
      cy.get('[data-test=constructor_bottom]').contains('Краторная булка N-200i (низ)').should('exist');
    });
    
    cy.get('[data-test=ingredient]').contains('Соус Spicy-X').trigger('dragstart').then(() => {
      cy.get('[data-test=constructor_area]').trigger('drop');
      cy.get('[data-test=constructor_main]').contains('Соус Spicy-X').should('exist');
    });  
  });
});

describe('Тестирование модального окна', () => {
  beforeEach(() => {
    cy.intercept("GET", `${api}/ingredients`, { fixture: "ingredients.json" });
  
    cy.visit('http://localhost:3000');
    cy.viewport('macbook-15');
  });

  it('Открытие модального окна', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-test=ingredient]').contains('Соус традиционный галактический').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#react-modals').contains('Соус традиционный галактический').should('exist');
  });

  it('Закрытие модального окна', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-test=ingredient]').contains('Соус традиционный галактический').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-test=modal-close]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
})

describe('Тестирование заказа', () => {
  beforeEach(() => {
    cy.intercept("GET", `${api}/auth/user`, { fixture: "user.json" });
    cy.intercept("GET", `${api}/ingredients`, { fixture: "ingredients.json" });
    cy.intercept("POST", `${api}/orders`, { fixture: "order.json" }).as("postOrder");
  
    cy.setCookie('refreshToken', 'test-refreshToken')
    cy.setCookie('accessToken', 'test-accessToken')

    cy.visit('http://localhost:3000');
    cy.viewport('macbook-15');
  });

  it('Проверка оформления заказа', () => {
    cy.get('[data-test=ingredient]').contains('Соус фирменный Space Sauce').trigger('dragstart').then(() => {
      cy.get('[data-test=constructor_area]').trigger('drop');

      cy.get('[data-test="make-order"]').contains('Оформить заказ').click();
      cy.contains('идентификатор заказа').should('exist');
    });
  });
})