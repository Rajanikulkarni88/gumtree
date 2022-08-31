describe('Gumtree UI Tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://gumtree.com.au')
  })

  it('Search for a product with specified filters and assert result', () => {
    cy.get('#categoryId-wrp').click()
    cy.contains('Electronics & Computer').click({force:true})
    cy.get('#search-query').type('Sennheiser Headphones')
    cy.get('#search-area').type('Sydney Region, NSW')
    cy.get('#srch-radius-input').click().get('#srch-radius-wrpwrapper > ul > li:nth-child(5)').click({force:true})
    cy.get('#search-form-form > ul > li.header__search-bar-item.header__search-bar-item > button').click()

    //click and open an Ad result
    cy.get('div.search-results-page__content > main > section > div > div > a:nth-child(1)').click()

    //verify ad details page opens
    cy.url().should('include', 'https://www.gumtree.com.au/s-ad/')
            .should('include', '/headphones-earphones')

    //verify numeric ad id is displayed in breadcrumb
    cy.get('div.breadcrumbs__desktop > span.breadcrumbs__summary').invoke('text').should('match', /Ad ID [0-9]{10}$/)

    //verify similar ad present
    cy.contains('Similar Ads').parent().find('div.vip-similar-ads__slider-container').contains('Sennheiser')
  })
})
