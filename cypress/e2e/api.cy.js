describe('gumtree api tests', () => {
  const apiurlSearch = 'https://ecg-api.gumtree.com.au/api/papi/ads/search?categoryId=0&categoryRedirected=1&includeTopAds=1&keyword=Table&locationId=3003435&page=1&size=20&sortType=DATE_DESCENDING'

  it('Search API Tests', () => {

    cy.request(apiurlSearch).then((response) => {
      //Assert Status Code
      expect(response.status).to.eq(200)

      //Assert Response Header
      expect(response.headers).to.have.property('server').contains('rhino-core-shield')
      expect(response.headers).to.have.property('content-type').contains('application/json')

      //Assert Response Body
      expect(response.body.ads).to.have.length(22) //asserting that Ads array has 22 items

      let expectedKeys = ['ads', 'paging', 'adSearchOptions']
      for(let i=0; i<expectedKeys.length; i=i+1){
        expect(response.body).to.have.property(expectedKeys[i])
      }

      let expectedKeysAds = ['id', 'title', 'description', 'categoryId', 'locationId', 'price', 'adType', 'posterType', 'creationDate', 'startDate', 'endDate', 'adListingType', 'pictures', 'attributes', 'searchOrchestrationAttributes', 'similarItemsLink', 'featureList']
      for(let i=0; i<expectedKeysAds.length; i=i+1){
        expect(response.body.ads[0]).to.have.property(expectedKeysAds[i])
      }
    })
  })
})

