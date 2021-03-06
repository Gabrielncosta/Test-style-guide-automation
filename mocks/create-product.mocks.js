module.exports = {
  request: {
    queryString: {
      store_id: '599',
    },
    body: {
      product: {
        condition: 'new',
        currency: 'BRL',
        brand: 'Loft',
        composition: '',
        model: 'IPHONE 4-4S',
        category_id: 7257,
        store_id: 599,
        title: 'Case mr iphone 4 chocolate',
        price: '29.9',
        available_quantity: 0,
        external_code: 'LCI134',
        sku: 'LCI134',
        gtin: '7908075306092',
        short_description: '',
        description: 'Case mr iphone 4 chocolate',
        height: 10,
        lenght: 10,
        width: 10,
        weight: 0,
        provider: 'LINK_API',
      },
    },
    url: 'https://warehouse.deliverycenter.io/api/products',
    method: 'post',
    params: {
      store_id: '599',
    },
    data: '{"product":{"condition":"new","currency":"BRL","brand":"Loft","composition":"","model":"IPHONE 4-4S","category_id":7257,"store_id":599,"title":"Case mr iphone 4 chocolate","price":"29.9","available_quantity":0,"external_code":"LCI134","sku":"LCI134","gtin":"7908075306092","short_description":"","description":"Case mr iphone 4 chocolate","height":10,"lenght":10,"width":10,"weight":0,"provider":"LINK_API"}}',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      application_id: 'C407B44F57B93A82FAABBF622FD99D01A5B19589F67A5A787616810736AB1CBC',
      application_secret: '5DAABC30DB3F376E5F06AB4606392E581C5DF9BA1EF9A0B2B81FEC892E1FC3E2',
      'User-Agent': 'axios/0.19.2',
      'Content-Length': 408,
    },
    transformRequest: [
      null,
    ],
    transformResponse: [
      null,
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
  },
  response: {
    body: {
      id: 909927,
      store_id: 599,
      category_id: 7257,
      title: 'Case mr iphone 4 chocolate',
      price: '29.9',
      promotional_price: null,
      available_quantity: 0,
      sku: 'LCI134',
      currency: 'BRL',
      gtin: '7908075306092',
      short_description: null,
      description: 'Case mr iphone 4 chocolate',
      height: 10,
      length: null,
      width: 10,
      weight: 0,
      condition: 'new',
      model: 'IPHONE 4-4S',
      composition: null,
      external_code: 'LCI134',
      active: true,
      dc_code: 'DC599-10909927',
      cover_image: {
        cover: true,
        link: 'https://warehouse.deliverycenter.io/image/loft.png',
        url: 'loft.png',
      },
      brand: 'Loft',
      inserted_at: '2020-11-16T19:04:13',
      updated_at: '2020-11-16T19:04:13',
      sync_status: 'idle',
      version: 2,
      status_updated_at: null,
      images: [
        {
          cover: true,
          link: 'https://warehouse.deliverycenter.io/image/loft.png',
          url: 'loft.png',
        },
      ],
      videos: [
      ],
      listings: [
      ],
      category: {
        id: 7257,
        name: 'Outros',
        code: 'TEMP_CODE',
        parent_id: 71,
      },
      variants: [
      ],
    },
    statusCode: 201,
    headers: {
      date: 'Tue, 01 Dec 2020 16:57:17 GMT',
      'content-type': 'application/json; charset=utf-8',
      'content-length': '909',
      connection: 'close',
      'set-cookie': [
        '__cfduid=dcf18518baedd22e0db3e27eb2e43ce501606841837; expires=Thu, 31-Dec-20 16:57:17 GMT; path=/; domain=.deliverycenter.io; HttpOnly; SameSite=Lax; Secure',
      ],
      'access-control-allow-credentials': 'true',
      'access-control-allow-origin': '*',
      'access-control-expose-headers': '',
      'cache-control': 'max-age=0, private, must-revalidate',
      location: '/api/products/909927',
      'x-request-id': 'FkymI0NIEz0fqK4AAQZS',
      'cf-cache-status': 'DYNAMIC',
      'cf-request-id': '06c0d5bf63000024eaa20fa000000001',
      'expect-ct': 'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
      'report-to': '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report?s=KFYzPqDCeoeAU%2BcFYiJ7N8N4LLJUQ2JWT1JedRxjZTGAheeuZnPHNnmxyNSJVf9ypIEqjBQASkWAY5zy0uzpYMRY9P1kIrnkQyeVDR0KiX0v%2Bgr%2F%2FKw4wZoifII%3D"}],"group":"cf-nel","max_age":604800}',
      nel: '{"report_to":"cf-nel","max_age":604800}',
      server: 'cloudflare',
      'cf-ray': '5fae58abdb9524ea-IAD',
    },
  },
};
